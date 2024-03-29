Ext.define('FPAgent.controller.WbsCont', {
    extend: 'Ext.app.Controller',
    views: [
        'wbs.WbsGrid',
        'wbs.NewPodWin',
        'wbs.NewExWin',
        'wbs.ViewExWin',
        'wbs.NewDopWin',
        'wbs.LoadWBWin',
        'wbs.ExportWbWin',
        'wbs.TrackWin'],
    models: [
        'WbsMod',
        'ExCodeMod',
        'ViewExMod'],
    stores: [
        'WbsStore',
        'aMonths',
        'ExCodeStore',
        'ViewExStore',
        'TrackSt'],
    refs: [{
        ref: 'WbsTool',
        selector: 'wbstool'
    }, {
        ref: 'NewDopWin',
        selector: 'newdopwin'
    }, {
        ref: 'LoadWBWin',
        selector: 'loadwbwin'
    }, {
        ref: 'NewExWin',
        selector: 'newexwin'
    }, {
        ref: 'NewPodWin',
        selector: 'newpodwin'
    }, {
        ref: 'WbsTotal',
        selector: 'wbstotal'
    }, {
        ref: 'WbFilter',
        selector: 'wbstool > textfield[name=filteredit]'
    }, {
        ref: 'AdmTool',
        selector: 'admtool'
    }, {
        ref: 'ViewExGrid',
        selector: 'viewexgrid'
    }, {
        ref: 'ExportWbWin',
        selector: 'exportwbwin'
    }
    ],
    init: function () {
        this.control({
            'wbsgrid': {
                activate: this.loadWbsGrid
            },
            'wbsgrid button[action=all]': {
                click: this.allWbs
            },
            'wbsgrid button[action=out]': {
                click: this.outWbs
            },
            'wbsgrid button[action=in]': {
                click: this.inWbs
            },
            'wbsgrid button[action=overdue]': {
                click: this.overdueWbs
            },
            'wbsgrid button[action=pod]': {
                click: this.newPod
            },
            'wbsgrid button[action=ex]': {
                click: this.newEx
            },
            'wbstool button[action=excel]': {
                click: this.showExpWin
            },
            'exportwbwin button[action=exp]': {
                click: this.exportExcel
            },
            'newdopwin button[action=save]': {
                click: this.saveDop
            },
            'wbstool button[action=import]': {
                click: this.loadWBsWin
            },
            'newexwin button[action=save]': {
                click: this.saveEx
            },
            'newpodwin button[action=save]': {
                click: this.savePod
            },
            'wbstool combomonth button[name=periodRefresh]': {
                click: this.periodChange
            },
            'wbsgrid actioncolumn': {
                itemclick: this.viewEx
            },
            'wbsgrid numbercolumn[itemId=dop]': {
                click: this.showDop
            },
            'wbstool button[action=filter]': {
                click: this.filterGrid
            },
            'admtool comboagent': {
                select: this.changeAgent
            },
            'loadwbwin button[action=imp]': {
                click: this.importWBs
            },
            'wbstool button[action=track]': {
                click: this.trackWb
            }
        });
        this.getWbsStoreStore().on({
            scope: this,
            load: this.loadWbsStore
        });
        this.getWbsStoreStore().on({
            scope: this,
            beforeload: this.beforeloadWbsStore
        });
        this.getViewExStoreStore().on({
            scope: this,
            load: this.loadViewExStore
        });
    },

    /**
     * Показывает трек заказа
     * @param button Кнопка "Трек"
     */
    trackWb: function (button) {
        var selected = button.up('wbsgrid').getSelectionModel();
        if (selected.getCount() > 0) {
            var viewEx = Ext.widget('trackwin').show();
            var wbNo = selected.getSelection()[0].get('wb_no');
            viewEx.setTitle('Трек накладной: ' + wbNo);
            this.getTrackStStore().load({
                params : {
                    dbAct : 'getTrackInfo',
                    wbno : wbNo
                }
            });
        } else {
            Ext.Msg.alert('Запрещено!', 'Выберите накладную');
        }
    },

    periodChange: function () {
        var fromDate = this.getWbsTool().down('datefield[name=fromDate]').getValue();
        var toDate = this.getWbsTool().down('datefield[name=toDate]').getValue();

        if ((toDate - fromDate) > 7776000000) {
            Ext.Msg.alert('Слишком большой период!', 'Выберите период не более 90 дней!');
            return;
        }
        this.viewTotal();
        this.loadWbs();
    },

    loadWbsStore: function () {
        this.getWbsTool().down('button[action=all]').setDisabled(false);
        this.getWbsTool().down('button[action=in]').setDisabled(false);
        this.getWbsTool().down('button[action=out]').setDisabled(false);
        this.getWbsTool().down('button[action=overdue]').setDisabled(false);
    },
    loadViewExStore: function () {
        this.getViewExGrid().getSelectionModel().select(0);
    },
    changeAgent: function (comp, newValue) {
        var me = this;
        if (comp.up('mainpanel').activeTab.title == FPAgent.lib.Translate.tr("MainPanel.wbsgrid")/*'Накладные'*/) {
            Ext.Ajax.request({
                url: 'srv/change.php',
                params: {
                    agent: newValue[0].data['partcode'],
                    se: window.location.hash.replace("#", "")
                },
                success: function (response) {
                    //var text = Ext.decode(response.responseText);
                    me.viewTotal();
                    me.loadWbs();
                },
                failure: function (response) {
                    Ext.Msg.alert(FPAgent.lib.Translate.tr("ServerdDown")/*'Сервер недоступен!'*/, response.statusText);
                }
            });
        }
    },
    filterGrid: function () {
        if (this.getWbFilter().getValue()) {
            this.getWbsStoreStore().clearFilter(true);
            this.getWbsStoreStore().filter('wb_no', this.getWbFilter().getValue());
            this.viewTotal();
        } else {
            this.getWbsStoreStore().clearFilter();
            this.viewTotal();
        }
    },
    editDop: function (d_wb_no, d_dtd_txt, d_tar_ag_id, d_req_tar_a, d_req_rem) {
        if (d_wb_no && d_dtd_txt && d_tar_ag_id && d_req_tar_a) {
            var newdop = Ext.widget('newdopwin').show();
            var formdop = newdop.down('newdopform');
            formdop.down('textfield[name=wb_no]').setValue(d_wb_no);
            formdop.down('textfield[name=dtd_txt]').setValue(d_dtd_txt);
            formdop.down('textfield[name=interid]').setValue(d_tar_ag_id);
            formdop.down('textfield[name=tar_a_ag]').setValue(d_req_tar_a);
            formdop.down('textfield[name=rem_ag]').setValue(d_req_rem);
        } else {
            Ext.Msg.alert(FPAgent.lib.Translate.tr("DenyAccess") /*'Запрещено!'*/, FPAgent.lib.Translate.tr("WbsCont.NotEditTarif")/*'Для этой накладной нельзя редактировать Доп. тариф'*/);
        }
    },
    showDop: function (gridview, el, rowIndex, colIndex, e, rec, rowEl) {
        if (!rec.data['req_tar_a']) {
            this.insertNewDop(rec.data['wb_no'], rec.data['dtd_txt'], rec.data['tar_ag_id'], rec.data['req_tar_a']);
        } else {
            this.editDop(rec.data['wb_no'], rec.data['dtd_txt'], rec.data['tar_ag_id'], rec.data['req_tar_a'], rec.data['req_rem'])
        }
    },

    /**
     * Получает введенный период.
     * @param button Кнопка "Обновить"
     * @returns {[*, *]} Период от и до
     */
    getPeriod: function () {
        var fromDate = this.getWbsTool().down('datefield[name=fromDate]').getValue();
        var toDate = this.getWbsTool().down('datefield[name=toDate]').getValue();
        return [Ext.Date.format(fromDate, 'Ymd'), Ext.Date.format(toDate, 'Ymd')];
    },
    viewTotal: function () {
        var tc = this;
        var twt = tc.getWbsTotal();
        if (this.getWbsStoreStore().filters.length == 0) {
            switch (true) {
                case this.getWbsTool().down('button[action=all]').pressed:
                    var t_dir = 'all';
                    break;
                case this.getWbsTool().down('button[action=in]').pressed:
                    var t_dir = 'in';
                    break;
                case this.getWbsTool().down('button[action=out]').pressed:
                    var t_dir = 'out';
                    break;
                case this.getWbsTool().down('button[action=overdue]').pressed:
                    var t_dir = 'ove';
                    break;
            }
            Ext.Ajax.request({
                url: 'srv/data.php',
                params: {
                    dbAct: 'GetWbsTotal',
                    dir: t_dir,
                    from: tc.getPeriod()[0],
                    to: tc.getPeriod()[1],
                    se: window.location.hash.replace("#", "")
                },
                success: function (response) {
                    var text = Ext.decode(response.responseText);
                    if (text.success === true) {
                        twt.down('label[itemId=lab1]').setText(FPAgent.lib.Translate.tr("WbsCont.Sum")/*'Всего: '*/ + text.data[0].s_wb);
                        twt.down('label[itemId=lab2]').setText(FPAgent.lib.Translate.tr("WbsCont.Wt")/*'Вес: '*/ + Ext.util.Format.round(text.data[0].s_wt, 2));
                        twt.down('label[itemId=lab3]').setText(FPAgent.lib.Translate.tr("WbsCont.VolWt")/*'V вес: '*/ + Ext.util.Format.round(text.data[0].s_vol_wt, 2));
                        twt.down('label[itemId=lab4]').setText(FPAgent.lib.Translate.tr("WbsCont.s_flip_b")/*'тар флип баз: '*/ + Ext.util.Format.round(text.data[0].s_flip_b, 2));
                        twt.down('label[itemId=lab5]').setText(FPAgent.lib.Translate.tr("WbsCont.s_flip_a")/*'тар флип доп: '*/ + Ext.util.Format.round(text.data[0].s_flip_a, 2));
                        twt.down('label[itemId=lab6]').setText(FPAgent.lib.Translate.tr("WbsCont.s_flip_tr")/*'тар флип ТР: '*/ + Ext.util.Format.round(text.data[0].s_flip_tr, 2));
                        twt.down('label[itemId=lab7]').setText(FPAgent.lib.Translate.tr("WbsCont.s_flip_t")/*'тар флип всего: '*/ + Ext.util.Format.round(text.data[0].s_flip_t, 2));
                        twt.down('label[itemId=lab8]').setText(FPAgent.lib.Translate.tr("WbsCont.s_flip_cash")/*'тар флип оплата: '*/ + Ext.util.Format.round(text.data[0].s_flip_cash, 2));
                        twt.down('label[itemId=lab9]').setText(FPAgent.lib.Translate.tr("WbsCont.s_ag_b")/*'тар аг баз: '*/ + Ext.util.Format.round(text.data[0].s_ag_b, 2));
                        twt.down('label[itemId=lab10]').setText(FPAgent.lib.Translate.tr("WbsCont.s_ag_a")/*'тар аг доп: '*/ + Ext.util.Format.round(text.data[0].s_ag_a, 2));
                        twt.down('label[itemId=lab11]').setText(FPAgent.lib.Translate.tr("WbsCont.s_ag_tr")/*'тар аг ТР: '*/ + Ext.util.Format.round(text.data[0].s_ag_tr, 2));
                        twt.down('label[itemId=lab12]').setText(FPAgent.lib.Translate.tr("WbsCont.s_ag_t")/*'тар аг всего: '*/ + Ext.util.Format.round(text.data[0].s_ag_t, 2));
                        twt.down('label[itemId=lab13]').setText(FPAgent.lib.Translate.tr("WbsCont.s_ag_cash")/*'тар аг оплата: '*/ + Ext.util.Format.round(text.data[0].s_ag_cash, 2));
                    }
                }
            });
        } else {
            twt.down('label[itemId=lab1]').setText('');
            twt.down('label[itemId=lab2]').setText('');
            twt.down('label[itemId=lab3]').setText('');
            twt.down('label[itemId=lab4]').setText('');
            twt.down('label[itemId=lab5]').setText('');
            twt.down('label[itemId=lab6]').setText('');
            twt.down('label[itemId=lab7]').setText('');
            twt.down('label[itemId=lab8]').setText('');
            twt.down('label[itemId=lab9]').setText('');
            twt.down('label[itemId=lab10]').setText('');
            twt.down('label[itemId=lab11]').setText('');
            twt.down('label[itemId=lab12]').setText('');
            twt.down('label[itemId=lab13]').setText('');
        }
    },
    savePod: function (btn) {
        var me = this;
        var win = btn.up('newpodwin');
        var form_pod = win.down('newpodform');
        if (form_pod.getForm().isValid()) {
            form_pod.submit({
                url: 'srv/data.php',
                params: {
                    dbAct: 'SetPOD',
                    se: window.location.hash.replace("#", "")
                },
                submitEmptyText: false,
                success: function (form, action) {
                    if (action.result.success == true) {
                        Ext.Msg.alert(FPAgent.lib.Translate.tr("WbsCont.SavePod")/*'ПОД сохранено!'*/, action.result.msg);
                        var rec_pod = me.getWbsStoreStore().findRecord('wb_no', form_pod.getValues()['wb_no']);
                        rec_pod.set('dod_txt', form_pod.getValues()['p_d_in'] + ' ' + form_pod.getValues()['tdd']);
                        rec_pod.set('rcpn', form_pod.getValues()['rcpn']);
                        var dtd = new Date();
                        rec_pod.set('p_d_in', dtd);
                        form.reset();
                        me.getNewPodWin().close();
                    }
                },
                failure: function (form, action) {
                    Ext.Msg.alert(FPAgent.lib.Translate.tr("WbsCont.NotSavePod")/*'ПОД не сохранено!'*/, action.result.msg);
                }
            });
        } else {
            Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.FieldIsEmptyHead")/*'Не все поля заполнены'*/, FPAgent.lib.Translate.tr("OrdsCont.FieldIsEmptyBody")/*'Откорректируйте информацию'*/)
        }
    },
    saveEx: function (btn) {
        var me = this;
        var win = btn.up('newexwin');
        var form_ex = win.down('newexform');
        if (form_ex.getForm().isValid()) {
            form_ex.submit({
                url: 'srv/data.php',
                params: {
                    dbAct: 'NewEx',
                    se: window.location.hash.replace("#", "")
                },
                submitEmptyText: false,
                success: function (form, action) {
                    if (action.result.success == true) {
                        Ext.Msg.alert(FPAgent.lib.Translate.tr("WbsCont.SaveEx")/*'Происшествие сохранено!'*/, action.result.msg);
                        var rec_ex = me.getWbsStoreStore().findRecord('wb_no', form_ex.getValues()['wb_no']);
                        rec_ex.set('is_ex', 1);
                        form.reset();
                        me.getNewExWin().close();
                    }
                },
                failure: function (form, action) {
                    Ext.Msg.alert(FPAgent.lib.Translate.tr("WbsCont.NotSaveEx")/*'Происшествие не сохранено!'*/, action.result.msg);
                }
            });
        } else {
            Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.FieldIsEmptyHead")/*'Не все поля заполнены'*/, FPAgent.lib.Translate.tr("OrdsCont.FieldIsEmptyBody")/*'Откорректируйте информацию'*/)
        }
    },
    saveDop: function (btn) {
        var me = this;
        var win = btn.up('newdopwin');
        var form_dop = win.down('newdopform');
        if (form_dop.getForm().isValid()) {
            form_dop.submit({
                url: 'srv/data.php',
                params: {
                    dbAct: 'SetTar_a_ag',
                    se: window.location.hash.replace("#", "")
                },
                submitEmptyText: false,
                success: function (form, action) {
                    if (action.result.success == true) {
                        Ext.Msg.alert(FPAgent.lib.Translate.tr("WbsCont.SaveTarif")/*'Доп. тариф сохранен!'*/, action.result.msg);
                        var rec_dop = me.getWbsStoreStore().findRecord('wb_no', form_dop.getValues()['wb_no']);
                        rec_dop.set('req_tar_a', form_dop.getValues()['tar_a_ag']);
                        rec_dop.set('req_rem', form_dop.getValues()['rem_ag']);
                        form.reset();
                        me.getNewDopWin().close();
                    }
                },
                failure: function (form, action) {
                    Ext.Msg.alert(FPAgent.lib.Translate.tr("WbsCont.NotSaveTarif")/*'Доп. тариф не сохранен!'*/, action.result.msg);
                }
            });
        } else {
            Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.FieldIsEmptyHead")/*'Не все поля заполнены'*/, FPAgent.lib.Translate.tr("OrdsCont.FieldIsEmptyBody")/*'Откорректируйте информацию'*/)
        }
    },
    insertNewDop: function (d_wb_no, d_dtd_txt, d_tar_ag_id, d_req_tar_a) {
        if (d_wb_no && d_dtd_txt && d_tar_ag_id && !d_req_tar_a) {
            var newdop = Ext.widget('newdopwin').show();
            var formdop = newdop.down('newdopform');
            formdop.down('textfield[name=wb_no]').setValue(d_wb_no);
            formdop.down('textfield[name=dtd_txt]').setValue(d_dtd_txt);
            formdop.down('textfield[name=interid]').setValue(d_tar_ag_id);
        } else {
        }

    },
    showExpWin: function (btn) {
        var win = Ext.widget('exportwbwin').show();
    },
    exportExcel: function (btn) {
        var me = this;
        switch (true) {
            case this.getWbsTool().down('button[action=all]').pressed:
                var t_dir = 'all';
                break;
            case this.getWbsTool().down('button[action=in]').pressed:
                var t_dir = 'in';
                break;
            case this.getWbsTool().down('button[action=out]').pressed:
                var t_dir = 'out';
                break;
            case this.getWbsTool().down('button[action=overdue]').pressed:
                var t_dir = 'ove';
                break;
        }
        var winexp = me.getExportWbWin();
        var formexp = winexp.down('exportwbform');
        var expfrom = formexp.down('datefield[name=from_date]');
        var expto = formexp.down('datefield[name=to_date]');

        if (expfrom.isValid() && expto.isValid()) {

            expfrom = FPAgent.lib.Miscutils.GetFormattedDate(expfrom.getRawValue()) + ' 00:00:00.000';
            expto = FPAgent.lib.Miscutils.GetFormattedDate(expto.getRawValue()) + ' 23:59:59.000';

            window.location.href = 'srv/getAgentWbsXLS.php?se=' + window.location.hash.replace("#", "") + '&bdate=' + expfrom + '&edate=' + expto + '&filter=' + t_dir;

            winexp.close();
        }
    },
    loadWBsWin: function (btn) {
        var newloadwin = Ext.widget('loadwbwin').show();
    },
    importWBs: function (btn) {
        var me = this;
        var win = btn.up('loadwbwin');
        var form_imp = win.down('loadwbform');
        if (form_imp.getForm().isValid() && form_imp.down('filefield[name=uploadFile]').getValue()) {
            form_imp.submit({
                url: 'srv/import/import.php',
                params: {
                    act: 'importPod',
                    se: window.location.hash.replace("#", "")
                },
                success: function (form, action) {
                    me.viewTotal();
                    me.loadWbs();
                    win.close();
                    Ext.Msg.alert(FPAgent.lib.Translate.tr("WbsCont.ImportOk")/*'Импортирование завершено успешно!'*/, action.result.msg);
                },
                failure: function (form, action) {
                    Ext.Msg.alert(FPAgent.lib.Translate.tr("WbsCont.ImportError")/*'Ошибка импорта!'*/, action.result.msg);
                }
            });
        }
    },
    viewExGrid: function (ex_wb_no) {
        if (ex_wb_no) {
            var viewex = Ext.widget('viewexwin').show();
            this.getViewExStoreStore().load({
                params: {
                    wb_no: ex_wb_no,
                    se: window.location.hash.replace("#", "")
                }
            });
        } else {
            Ext.Msg.alert(FPAgent.lib.Translate.tr("DenyAccess")/*'Запрещено!'*/, FPAgent.lib.Translate.tr("WbsCont.GetWb")/*'Выберите накладную'*/);
        }
    },
    viewEx: function (column, action, grid, rowIndex, colIndex, record) {
        this.viewExGrid(record.data['wb_no']);
    },
    loadWbs: function () {
        this.getWbsStoreStore().load();
    },
    insertNewPod: function (p_wb_no, p_dtd_txt, p_dir, p_d_in_txt) {
        if (p_wb_no && p_dtd_txt && (p_dir == 'out' || p_dir == 'ove') && !p_d_in_txt) {
            var newpod = Ext.widget('newpodwin').show();
            var formpod = newpod.down('newpodform');
            formpod.down('textfield[name=wb_no]').setValue(p_wb_no);
            formpod.down('textfield[name=dtd_txt]').setValue(p_dtd_txt);
        } else {
            Ext.Msg.alert(FPAgent.lib.Translate.tr("DenyAccess")/*'Запрещено!'*/, FPAgent.lib.Translate.tr("WbsCont.NotWbPod")/*'Для этой накладной нельзя внести ПОД'*/);
        }
    },
    insertNewEx: function (e_wb_no) {
        if (e_wb_no) {
            var newex = Ext.widget('newexwin').show();
            var formex = newex.down('newexform');
            formex.down('textfield[name=wb_no]').setValue(e_wb_no);
        } else {
            Ext.Msg.alert(FPAgent.lib.Translate.tr("DenyAccess")/*'Запрещено!'*/, FPAgent.lib.Translate.tr("WbsCont.GetWb")/*'Выберите накладную'*/);
        }
    },
    beforeloadWbsStore: function (store, operation) {
        var proxy = store.getProxy();
        proxy.setExtraParam('from', this.getPeriod()[0]);
        proxy.setExtraParam('to', this.getPeriod()[1]);
        switch (true) {
            case this.getWbsTool().down('button[action=all]').pressed:
                proxy.setExtraParam('dir', 'all');
                break;
            case this.getWbsTool().down('button[action=in]').pressed:
                proxy.setExtraParam('dir', 'in');
                break;
            case this.getWbsTool().down('button[action=out]').pressed:
                proxy.setExtraParam('dir', 'out');
                break;
            case this.getWbsTool().down('button[action=overdue]').pressed:
                proxy.setExtraParam('dir', 'ove');
                break;
        }
    },
    loadWbsGrid: function (comp) {
        var aTol = this.getWbsTool();
        this.allWbs(aTol.down('button[action=all]'));
        if (this.getAdmTool().down('label').text == 'WEB Администратор') {
            this.getAdmTool().down('buttongroup[itemId=admgroup]').setVisible(true);
        }
        this.getAdmTool().down('button[action=list]').setVisible(false);
        this.getAdmTool().down('button[action=templ]').setVisible(false);
    },
    allWbs: function (btn) {
        btn.toggle(true);
        var aTol = btn.up('wbstool');
        aTol.down('button[action=out]').toggle(false);
        aTol.down('button[action=in]').toggle(false);
        aTol.down('button[action=overdue]').toggle(false);
        aTol.down('button[action=out]').setDisabled(true);
        aTol.down('button[action=in]').setDisabled(true);
        aTol.down('button[action=overdue]').setDisabled(true);
        btn.setDisabled(true);
        this.viewTotal();
        this.loadWbs();
    },
    outWbs: function (btn) {
        btn.toggle(true);
        var aTol = btn.up('wbstool');
        aTol.down('button[action=all]').toggle(false);
        aTol.down('button[action=in]').toggle(false);
        aTol.down('button[action=overdue]').toggle(false);
        aTol.down('button[action=all]').setDisabled(true);
        aTol.down('button[action=in]').setDisabled(true);
        aTol.down('button[action=overdue]').setDisabled(true);
        btn.setDisabled(true);
        this.viewTotal();
        this.loadWbs();
    },
    inWbs: function (btn) {
        btn.toggle(true);
        var aTol = btn.up('wbstool');
        aTol.down('button[action=all]').toggle(false);
        aTol.down('button[action=out]').toggle(false);
        aTol.down('button[action=overdue]').toggle(false);
        aTol.down('button[action=all]').setDisabled(true);
        aTol.down('button[action=out]').setDisabled(true);
        aTol.down('button[action=overdue]').setDisabled(true);
        btn.setDisabled(true);
        this.viewTotal();
        this.loadWbs();
    },
    overdueWbs: function (btn) {
        btn.toggle(true);
        var aTol = btn.up('wbstool');
        aTol.down('button[action=all]').toggle(false);
        aTol.down('button[action=out]').toggle(false);
        aTol.down('button[action=in]').toggle(false);
        aTol.down('button[action=all]').setDisabled(true);
        aTol.down('button[action=out]').setDisabled(true);
        aTol.down('button[action=in]').setDisabled(true);
        btn.setDisabled(true);
        this.viewTotal();
        this.loadWbs();
    },
    newPod: function (btn) {
        var sm = btn.up('wbsgrid').getSelectionModel();
        if (sm.getCount() > 0) {
            this.insertNewPod(sm.getSelection()[0].get('wb_no'), sm.getSelection()[0].get('dtd_txt'), sm.getSelection()[0].get('dir'), sm.getSelection()[0].get('p_d_in'));
        }
    },
    newEx: function (btn) {
        var sm = btn.up('wbsgrid').getSelectionModel();
        if (sm.getCount() > 0) {
            this.insertNewEx(sm.getSelection()[0].get('wb_no'));
        }
    },
    monthChange: function (comp, newz, oldz) {
        this.viewTotal();
        this.loadWbs();
    },
    yearChange: function (comp, newz, oldz) {
        this.viewTotal();
        this.loadWbs();
    }
});
