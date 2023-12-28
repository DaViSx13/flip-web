Ext.define('FPAgent.controller.OrdsCont', {
    extend: 'Ext.app.Controller',
    views: [
        'orders.OrdGrid',
        'orders.OrdClientGrid',
        'orders.OrdWin',
        'orders.WbNoWin',
        'orders.WbNoForm',
        'orders.OrdsPanel',
        'orders.OrdsClientPanel',
        'orders.UseTemplWin',
        'orders.UseTemplForm',
        'orders.ViewWbWin',
        'wbs.WbsGrid',
        'orders.LoadOrdersWin',
        'mainform.WbGrid',
        'orders.OrdExWin',
        'orders.OrdExGrid',
        'orders.OrdExForm'],
    models: [
        'OrdsMod',
        'OrderMod',
        'CityMod',
        'AgentsMod',
        'OrdExMod'
    ],
    stores: [
        'OrdsSt',
        'OrdsClientSt',
        'aMonths',
        'OrderClientSt',
        'OrderSt',
        'CityStOrg',
        'CityStDes',
        'TypeSt',
        'AgentsSt',
        'TemplSt',
        'ViewWbSt',
        'OrdExStore',
        'SortTypeSt',
        'SortSubTypeSt'],
    refs: [{
        ref: 'OrdForm',
        selector: 'ordform'
    }, {
        ref: 'OrdTool',
        selector: 'ordtool'
    }, {
        ref: 'OrdClientTool',
        selector: 'ordclienttool'
    }, {
        ref: 'OrdsClientPanel',
        selector: 'ordsclientpanel'
    }, {
        ref: 'OrdTotal',
        selector: 'ordtotal'
    }, {
        ref: 'OrdClientTotal',
        selector: 'ordclienttotal'
    }, {
        ref: 'ComboCity',
        selector: 'combocity[name=org]'
    }, {
        ref: 'ComboCity',
        selector: 'combocity[name=dest]'
    }, {
        ref: 'OrdWin',
        selector: 'ordwin'
    }, {
        ref: 'AdmTool',
        selector: 'admtool'
    }, {
        ref: 'LoadFileForm',
        selector: 'loadfileform'
    }, {
        ref: 'ViewWbWin',
        selector: 'viewwbwin'
    }, {
        ref: 'WbNoWin',
        selector: 'wbnowin'
    }, {
        ref: 'WbNoForm',
        selector: 'wbnoform'
    }, {
        ref: 'MainPanel',
        selector: 'mainpanel'
    }, {
        ref: 'WbsGrid',
        selector: 'wbsgrid'
    }, {
        ref: 'WbGrid',
        selector: 'wbgrid'
    }, {
        ref: 'OrdGrid',
        selector: 'ordgrid'
    }, {
        ref: 'OrdClientGrid',
        selector: 'ordclientgrid'
    }, {
        ref: 'TemplGrid',
        selector: 'templgrid'
    }, {
        ref: 'OrdsPanel',
        selector: 'ordspanel'
    }, {
        ref: 'UseTemplForm',
        selector: 'usetemplform'
    }, {
        ref: 'LoadOrdersWin',
        selector: 'loadorderswin'
    }, {
        ref: 'ViewWbForm',
        selector: 'viewwbform'
    }, {
        ref: 'OrdExGrid',
        selector: 'ordexgrid'
    }
    ],
    init: function () {

        //////////////////////
        //на onload каждого store вешаем проверку сессии
        //кажется вешается только на созданные store, поэтому в другом контроллере тоже сделаем
        //console.log('ЗАКАЗЫ');
        Ext.data.StoreManager.each(
            function (item) {
                //console.log(item.storeId);
                //item.on('focus', this.myfunc, this);
                item.on('load',
                    function (store, records, success) {
                        //console.log(store.storeId + ' loaded');
                        //console.log(success);
                        if (!success) {
                            FPAgent.lib.Miscutils.checkSession();
                        }
                    },
                    this);
            });

        ///////////////
        this.control({
            'ordspanel': {
                activate: this.loadOrdGr
            },
            'ordsclientpanel': {
                activate: this.loadOrdclientGr
            },
            'ordgrid button[action=new]': {
                click: this.openOrdWin
            },
            'ordgrid button[action=newtpl]': {
                click: this.openTpl
            },
            'ordgrid button[action=edit]': {
                click: this.editOrdWin
            },
            'ordgrid button[action=view]': {
                click: this.editOrdWin
            },
            'ordwin button[action=save]': {
                click: this.saveOrder
            },
            'ordwin combobox[name=sortType]': {
                change: this.changeOrdType
            },
            'viewwbwin button[action=printWB]': {
                click: this.printWB
            },
            'ordtool combomonth button[name=periodRefresh]': {
                click: this.periodChange
            },
            'ordclienttool combomonth button[name=periodRefresh]': {
                click: this.periodClientChange
            },
            'loadfileform button[action=delete]': {
                click: this.fileDel
            },
            'wbsgrid > tableview': {
                itemdblclick: this.dblclickWbsGr
            },
            'wbgrid > tableview': {
                itemdblclick: this.dblclickWbsGr
            },
            'ordgrid > tableview': {
                itemdblclick: this.dblclickOrdGr
            },
            'ordclientgrid > tableview': {
                itemdblclick: this.dblclickOrdClientGr
            },
            'admtool comboagent': {
                select: this.changeAgent
            },
            'admtool button[action=list]': {
                click: this.clkList
            },
            'admtool button[action=templ]': {
                click: this.clkTempl
            },
            'ordtool button[action=excel]': {
                click: this.exportExcel
            },
            'ordtool button[action=wbno]': {
                click: this.editWbno
            },
            'ordclienttool button[action=wbno]': {
                click: this.editWbnoClient
            },
            'ordclienttool button[action=wbview]': {
                click: this.viewClientWb
            },
            'ordtool button[action=wbview]': {
                click: this.viewWb
            },
            'wbnowin button[action=save]': {
                click: this.saveWbno
            },
            'wbnoform textfield': {
                keypress: this.pressEnter
            },
            'usetemplwin button[action=set]': {
                click: this.setTpl
            },
            'usetemplform combobox': {
                keypress: this.pressTpl
            },
            'ordtool button[action=import]': {
                click: this.loadOrdersWin
            },
            'ordgrid actioncolumn': {
                itemclick: this.viewEx
            },
            'loadorderswin button[action=imp]': {
                click: this.importOrders
            },
            'ordtool button[action=printWB]': {
                click: this.firePrintWB
            },
            'ordclienttool button[action=printWB]': {
                click: this.firePrintWB
            },
        });
        this.getOrderStStore().on({
            scope: this,
            load: this.loadOrdStore
        });
        this.getOrderClientStStore().on({
            scope: this,
            load: this.loadOrdClientStore
        });
        this.getViewWbStStore().on({
            scope: this,
            load: this.loadViewWbSt
        });
        this.getOrdsStStore().on({
            scope: this,
            load: this.loadOrdersSt
        });
        this.getOrdsClientStStore().on({
            scope: this,
            load: this.loadClientOrdersSt
        });
        this.getOrdExStoreStore().on({
            scope: this,
            load: this.loadViewExStore
        });
    },


    /**
     * Печать накладной
     * @param button Кнопка "Печать накладной"
     */
    firePrintWB: function (button) {
        var grid = button.up('ordgrid, ordclientgrid');
        var selected = grid.getSelectionModel();
        if(selected.getCount() === 0) {
            Ext.Msg.alert("Не выбран заказ из таблицы", "Выберите заказ в таблице для печати накладной");
            return;
        }

        var model = selected.getSelection()[0];
        var wb = model.get('wb_no');
        var order = model.get('rordnum');
        var cabinetType = model.get('cabinet_type');

        cabinetType = cabinetType === undefined ? 'agent' : cabinetType;

        if(!wb)
            this.setWbNoFromPrint(order, cabinetType, grid);
        else
            this.printWbByNumber(wb);
    },

    /**
     * Печать накладной по номеру
     * @param wb Номер накладной
     */
    printWbByNumber:function (wb) {
        if(!wb)
            Ext.Msg.alert("Номер накладной", "Не удалось получить номер накладной");

        window.open('srv/report.php?se=' + window.location.hash.replace("#", "") + '&wbno=' + wb);
    },

    /**
     * Печать накладной по номеру заказа
     * @param order Номер заказа
     * @param cabinet_type Тип кабинета
     */
    printWbEmpty: function (order, cabinet_type) {
        if(!order)
            Ext.Msg.alert("Пустой номер заказа", "В выбранной записи отсутсвует заказ");

        if(!cabinet_type)
            Ext.Msg.alert("Определение кабинета", "Не удалось определить кабинет");

        window.open('srv/report.php?se=' + window.location.hash.replace("#", "") + '&order=' + order + '&cabinet_type=' + cabinet_type);
    },

    /**
     * Присвоение номера накладной при печати
     * @param order {number} Номер заказа
     * @param cabinet_type {string} Тип кабинета
     * @param grid {Ext.grid.Panel}  Хранилище таблицы
     */
    setWbNoFromPrint: function (order, cabinet_type, grid) {
        if(!cabinet_type)
            Ext.Msg.alert("Определение кабинета", "Не удалось определить кабинет");

        var self = this;
        var wbNo = (cabinet_type === 'agent' ? 'AZ' : 'KZ') + '-' + order;
        Ext.Ajax.request ({
            url: 'srv/data.php',
            async: false,
            waitMsg: 'Формирование номера накладной...',
            params: {
                se: self.getSession(),
                dbAct: 'SetWbNoClient',
                rordnum: order,
                wbno: wbNo,
                cabinet_type: cabinet_type
            },
            success: function (response) {
                if(!self.wbNoResponseCheck(response, order))
                    return;

                self.printWbEmpty(order, cabinet_type);
                Ext.Msg.alert("Присвоен номер накладной", "Заказу '" + order + "' присвоен номер накладной '" + wbNo + "'");
                if(grid.getXType() === 'ordclientgrid')
                    self.loadOrdclientGr();
                else
                    self.loadOrdGr();
            },
            failure: function(response) {
                var json = Ext.JSON.decode(response.responseText);
                var msg = json.msg
                Ext.Msg.alert("Ошибка!", "Заказу '" + order + "' не удалось присвоить номер накладной<br> Причина:<br>" + msg);
            }
        })

    },

    /**
     * Проверка присвоения номера накладной заказу
     * @param response Ответ от сервера
     * @param order {number} Номер заказа
     * @returns {boolean} Результат проверки
     */
    wbNoResponseCheck: function (response, order) {
        var json = Ext.JSON.decode(response.responseText);
        if(!json) {
            Ext.Msg.alert("Ошибка!", "Заказу '" + order + "' не удалось присвоить номер накладной<br> Причина:<br>Не удалось получить ответ от сервера");
            return false;
        }

        if(!json.success) {
            var msg = json.msg
            Ext.Msg.alert("Ошибка!", "Заказу '" + order + "' не удалось присвоить номер накладной<br> Причина:<br>" + msg);
            return false;
        }

        return  true;
    },

    /**
     * Получает номер сессии пользователя
     * @returns {string} Номер сессии
     */
    getSession: function () {
        return window.location.hash.replace("#", "");
    },

    /**
     * Изменяет состояние поля "Подкатегория".
     * Если будет выбран пункт "Спец. Груз" - поле включается,
     * Если удалить из выбранных вышеописанный пункт - поле очищается и выключается.
     * @param sortType Поле категория
     */
    changeOrdType: function (sortType) {
        if (Ext.Array.contains(sortType.getValue(), 1))
            this.enableSubTypeField(sortType);
        else
            this.disableSubTypeField(sortType);
    },

    /**
     * Выключает подкатегорию.
     * @param sortType Поле категория
     */
    disableSubTypeField: function (sortType) {
        var field = sortType.next('combobox[name=subtype]');
        field.clearValue();
        field.setDisabled(true);
    },

    /**
     * Включает подкатегорию.
     * @param sortType Поле категория
     */
    enableSubTypeField: function (sortType) {
        var field = sortType.next('combobox[name=subtype]');
        field.setDisabled(false);
    },

    /**
     * Получает введенный период.
     * @returns {[*, *]} Период от и до
     */
    getDateFromPeriodFilter: function (isClient) {
        if (isClient)
            var panel = this.getOrdClientTool();
        else
            var panel = this.getOrdTool();

        var fromDate = panel.down('datefield[name=fromDate]').getValue();
        var toDate = panel.down('datefield[name=toDate]').getValue();
        return [
            Ext.Date.format(fromDate, 'Ymd'),
            Ext.Date.format(toDate, 'Ymd')];
    },

    /**
     * Выполняет запрос на клиентские заказы.
     */
    periodClientChange: function () {
        var period = this.getDateFromPeriodFilter(true);
        this.loadClientOrdersByPeriod(period[0], period[1]);
    },

    /**
     * Выполняет запрос на заказы.
     * @param button Кнопка "Обновить"
     */
    periodChange: function (button) {
        var period = this.getDateFromPeriodFilter(false);
        this.loadOrdersByPeriod(period[0], period[1]);
    },

    test: function () {
        console.log("work");
    },

    loadViewExStore: function () {
        this.getOrdExGrid().getSelectionModel().select(0);
    },
    importOrders: function (btn) {
        var me = this;
        var win = btn.up('loadorderswin');
        var form_imp = win.down('loadordersform');
        if (form_imp.getForm().isValid() && form_imp.down('filefield[name=uploadFile]').getValue()) {
            form_imp.submit({
                url: 'srv/import/import.php',
                params: {
                    act: 'importOrders',
                    se: window.location.hash.replace("#", "")
                },
                success: function (form, action) {

                    me.loadOrdGr();
                    win.close();
                    Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.ImportOk") /*'Импортирование завершено успешно!'*/, action.result.msg);
                },
                failure: function (form, action) {
                    Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.ImportError") /*'Ошибка импорта!'*/, action.result.msg);
                }
            });
        }
    },
    loadOrdersWin: function (btn) {
        Ext.widget('loadorderswin').show();
    },
    viewEx: function (column, action, grid, rowIndex, colIndex, record, node) {
        this.viewExGrid(record.data['rordnum']);
    },
    viewExGrid: function (ex_rordnum) {
        if (ex_rordnum) {
            Ext.widget('ordexwin').show();
            this.getOrdExStoreStore().load({
                params: {
                    rordnum: ex_rordnum,
                    se: window.location.hash.replace("#", "")
                }
            });
        } else {
            Ext.Msg.alert(FPAgent.lib.Translate.tr("DenyAccess") /*'Запрещено!'*/, FPAgent.lib.Translate.tr("UsersCont.SelectRecord") /*'Выберите накладную'*/);
        }
    },
    clkList: function (btn) {
        btn.toggle(true);
        var aTol = btn.up('admtool');
        aTol.down('button[action=templ]').toggle(false);
        this.getOrdsPanel().down('templgrid').setVisible(false);
        this.getOrdsPanel().down('ordgrid').setVisible(true);
    },
    clkTempl: function (btn) {
        btn.toggle(true);
        var aTol = btn.up('admtool');
        aTol.down('button[action=list]').toggle(false);
        this.getOrdsPanel().down('ordgrid').setVisible(false);
        this.getOrdsPanel().down('templgrid').setVisible(true);
    },
    pressEnter: function (fild, e) {
        var keyCode = e.getKey();
        if (keyCode == 13) {
            this.saveWbno(fild.up('wbnoform').up('wbnowin').down('button[action=save]'));
        }
    },
    pressTpl: function (fild, e) {
        var keyCode = e.getKey();
        if (keyCode == 13) {
            this.setTpl();
        }
    },

    saveWbno: function (btn) {
        var me = this;
        var win = btn.up('wbnowin');
        var activetab = me.getOrdsPanel().hidden;
        var form_wbno = win.down('wbnoform');
        if (!activetab) {
            var Action = 'SetWbno';
        } else {
            var Action = 'SetWbNoClient';
        }
        if (form_wbno.getForm().isValid()) {
            form_wbno.submit({
                url: 'srv/data.php',
                params: {
                    dbAct: Action,
                    se: window.location.hash.replace("#", "")
                },
                submitEmptyText: false,
                success: function (form, action) {
                    form.reset();
                    win.close();
                    if (!activetab) {
                        me.loadOrdGr();
                    } else {
                        me.loadOrdclientGr();
                    }
                },
                failure: function (form, action) {
                    Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.WbSaveError") /*'Номер накладной не сохранен!'*/, action.result.msg);
                }
            });
        } else {
            Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.WbNumEmptyHead") /*'Нет номера накладной!'*/, FPAgent.lib.Translate.tr("OrdsCont.WbNumEmptyBody") /*'Откорректируйте информацию'*/)
        }
    },
    editWbno: function (btn) {
        var sm = btn.up('ordgrid').getSelectionModel();
        this.editWbnoBase(sm);
    },

    editWbnoClient: function (btn) {
        var sm = btn.up('ordclientgrid').getSelectionModel();
        var cabinet_type = sm.getSelection()[0].get('cabinet_type');
        this.editWbnoBase(sm, cabinet_type);
    },

    editWbnoBase: function (sm, cabinet_type) {
        if (sm.getCount() > 0) {
            var win = Ext.widget('wbnowin');
            win.show();
            var form = win.down('wbnoform');
            form.down('textfield[name=wbno]').setValue(sm.getSelection()[0].get('wb_no'));
            form.down('textfield[name=rordnum]').setValue(sm.getSelection()[0].get('rordnum'));
            form.down('textfield[name=wbno]').focus(false, true);
            if(cabinet_type !== undefined)
                form.down('textfield[name=cabinet_type]').setValue(sm.getSelection()[0].get('cabinet_type'));
        } else {
            Ext.Msg.alert('Внимание!', 'Выберите заказ');
        }
    },
    viewWb: function (btn) {
        var sm = btn.up('ordgrid').getSelectionModel();
        this.viewWBase(sm);
    },

    viewClientWb: function (btn) {
        var sm = btn.up('ordclientgrid').getSelectionModel();
        this.viewWBase(sm);
    },

    viewWBase: function (sm) {
        if (sm.selected.length > 0)
            if (sm.getSelection()[0].get('wb_no')) {
                this.getViewWbStStore().load({
                    params: {
                        wb_no: sm.getSelection()[0].get('wb_no'),
                        se: window.location.hash.replace("#", "")
                    }
                });
            } else {
                Ext.Msg.alert(FPAgent.lib.Translate.tr("Alert") /*'Внимание!'*/, FPAgent.lib.Translate.tr("OrdsCont.OrderAlertBody") /*'Выберите заказ с введенным номером накладной!'*/);
            }
    },
    dblclickWbsGr: function (gr, rec) {
        var sm = gr.getSelectionModel();
        if (sm.getSelection()[0].get('wb_no')) {
            this.getViewWbStStore().load({
                params: {
                    wb_no: sm.getSelection()[0].get('wb_no'),
                    se: window.location.hash.replace("#", "")
                }
            });
        } else {
            Ext.Msg.alert(FPAgent.lib.Translate.tr("Alert") /*'Внимание!'*/, FPAgent.lib.Translate.tr("OrdsCont.OrderAlertBody") /*'Выберите заказ с введенным номером накладной!'*/);
        }
    },
    loadViewWbSt: function (st, rec, suc) {
        if (suc) {
            if (rec[0].data.wbstatus == 0) {
                Ext.Msg.alert(FPAgent.lib.Translate.tr("Alert") /*'Внимание!'*/, FPAgent.lib.Translate.tr("OrdsCont.WbEmpty") /*'Накладная не введена в систему!'*/);
            } else {
                var win = Ext.widget('viewwbwin');
                var form = win.down('viewwbform');
                rec[0].data.d_acc = Ext.Date.format(rec[0].data.d_acc, "d / m / y");
                rec[0].data.dod = Ext.Date.format(rec[0].data.dod, "d / m / y");
                rec[0].data.tdd = Ext.Date.format(rec[0].data.tdd, "H : i");
                if (rec[0].data.timing) {
                    form.down('displayfield[name=timing_check]').setVisible(true);
                    rec[0].data.timing = Ext.Date.format(rec[0].data.timing, "H:i");
                }
                switch (rec[0].data.t_srv) {
                    case 'EX': {
                        form.down('displayfield[name=t_srv_ex]').setVisible(true);
                        break;
                    }
                    case 'ST': {
                        form.down('displayfield[name=t_srv_st]').setVisible(true);
                        break;
                    }
                    case 'AF': {
                        form.down('displayfield[name=t_srv_af]').setVisible(true);
                        break;
                    }
                }
                switch (rec[0].data.payr) {
                    case 1: {
                        form.down('displayfield[name=payr_1]').setVisible(true);
                        break;
                    }
                    case 2: {
                        form.down('displayfield[name=payr_2]').setVisible(true);
                        break;
                    }
                    case 3: {
                        form.down('displayfield[name=payr_3]').setVisible(true);
                        break;
                    }
                }
                switch (rec[0].data.t_pak) {
                    case 'LE': {
                        form.down('displayfield[name=t_pak_le]').setVisible(true);
                        break;
                    }
                    case 'PL': {
                        form.down('displayfield[name=t_pak_pl]').setVisible(true);
                        break;
                    }
                }
                switch (rec[0].data.metpaym) {
                    case 'CSH': {
                        form.down('displayfield[name=metpaym_csh]').setVisible(true);
                        break;
                    }
                    case 'INV': {
                        form.down('displayfield[name=metpaym_inv]').setVisible(true);
                        break;
                    }
                }
                switch (rec[0].data.t_del) {
                    case 'AD': {
                        form.down('displayfield[name=t_del_ad]').setVisible(true);
                        break;
                    }
                    case 'HO': {
                        form.down('displayfield[name=t_del_ho]').setVisible(true);
                        break;
                    }
                    case 'TA': {
                        form.down('displayfield[name=t_del_ta]').setVisible(true);
                        break;
                    }
                }
                switch (rec[0].data.ins) {
                    case 0: {
                        form.down('displayfield[name=ins_0]').setVisible(true);
                        break;
                    }
                    default: {
                        form.down('displayfield[name=ins_1]').setVisible(true);
                    }
                }
                form.loadRecord(rec[0]);
                win.show();
            }
        } else {
            Ext.Msg.alert(
                FPAgent.lib.Translate.tr("Error") /*'Ошибка!'*/,
                FPAgent.lib.Translate.tr("ServerdDown") /*'Ошибка связи с сервером!'*/);
        }
    },
    exportExcel: function (btn) {
        var sm = btn.up('ordgrid').getSelectionModel();
        if (sm.getCount() > 0) {
            window.location.href = 'srv/getOrderXLS.php?ordnum=' + sm.getSelection()[0].get('rordnum');
        } else {
            Ext.Msg.alert(FPAgent.lib.Translate.tr("Alert") /*'Внимание!'*/, FPAgent.lib.Translate.tr("OrdsCont.AlertExportBody") /*'Выберите заказ для экспорта'*/);
        }
    },

    /**
     * Нажатие на вкладку.
     * @param comp Вкладка
     * @param newValue Значение
     */
    changeAgent: function (comp, newValue) {
        if (comp.up('mainpanel').activeTab.title == 'Заказы') {
            Ext.Ajax.request({
                url: 'srv/change.php',
                params: {
                    agent: newValue[0].data['partcode'],
                    se: window.location.hash.replace("#", "")
                },
                success: function () {
                    var period = this.getDateFromPeriodFilter(false);
                    this.loadOrdersByPeriod(period[0], period[1]);
                },
                failure: function (response) {
                    Ext.Msg.alert(
                        FPAgent.lib.Translate.tr("ServerdDown") /*'Сервер недоступен!'*/,
                        response.statusText);
                }
            });
        }
    },

    loadOrdersByPeriod: function (startDate, endDate) {
        this.getOrdsStStore().load({
            params: {
                startDate: startDate,
                endDate: endDate,
                se: window.location.hash.replace("#", "")
            }
        });
    },

    loadOrds: function (y, m) {
        this.getOrdsStStore().load({
            params: {
                newPeriod: y + m,
                se: window.location.hash.replace("#", "")
            }
        });
    },

    loadClientOrdersByPeriod: function (startDate, endDate) {
        this.getOrdsClientStStore().load({
            params: {
                startDate: startDate,
                endDate: endDate,
                se: window.location.hash.replace("#", "")
            }
        });
    },


    loadOrdGr: function (Pan) {
        var adTol = this.getAdmTool();
        if (adTol.down('label').text == 'WEB Администратор') {
            adTol.down('buttongroup[itemId=admgroup]').setVisible(true);
        }
        var btnList = adTol.down('button[action=list]');
        var btnTempl = adTol.down('button[action=templ]');
        btnList.setVisible(true);
        btnTempl.setVisible(true);

        this.clkList(btnList);
        var period = this.getDateFromPeriodFilter(false);
        this.loadOrdersByPeriod(period[0], period[1]);
        this.getTemplStStore().load();
    },

    loadOrdclientGr: function (Pan) {
        var adTol = this.getAdmTool();
        if (adTol.down('label').text == 'WEB Администратор') {
            adTol.down('buttongroup[itemId=admgroup]').setVisible(true);
        }

        var btnList = adTol.down('button[action=list]');
        var btnTempl = adTol.down('button[action=templ]');
        btnList.setVisible(false);
        btnTempl.setVisible(false);

        this.clkList(btnList);

        var period = this.getDateFromPeriodFilter(true);
        this.loadClientOrdersByPeriod(period[0], period[1]);
    },

    openOrdWin: function (btn) {
        var edit = Ext.widget('ordwin');
        edit.show();
        var form_lf = edit.down('loadfileform');
        form_lf.down('filefield[name=uploadFile]').setVisible(true);
        edit.down('ordform').down('combocity[name=org]').focus(false, true);

        var timeEdit = edit.down('ordform').down('textfield[name=courtimef]');
        timeEdit.setReadOnly(true);
        timeEdit.setValue('10:00');

        var timeEdit = edit.down('ordform').down('textfield[name=courtimet]');
        timeEdit.setReadOnly(true);
        timeEdit.setValue('19:00');
    },
    openTpl: function (btn) {
        if (this.getTemplStStore().getCount() > 0) {
            var win = Ext.widget('usetemplwin');
            win.show();
            var cb = win.down('usetemplform').down('combobox[name=tplname]')
            cb.focus(false, true);
            cb.select(this.getTemplStStore().first());
        } else {
            Ext.Msg.alert(FPAgent.lib.Translate.tr("DenyAccess") /*'Запрещено!'*/, FPAgent.lib.Translate.tr("OrdsCont.TemplateEmpty") /*'У Вас нет шаблонов!'*/);
        }
    },

    /**
     * Создает заказ из шаблона.
     */
    setTpl: function () {
        var tplform = this.getUseTemplForm();
        if (tplform.getForm().isValid()) {
            var record = this.getTemplStStore().findRecord('id', tplform.down('combobox[name=tplname]').getValue());
            tplform.getForm().reset();
            tplform.up('usetemplwin').close();
            var win = Ext.widget('ordwin');

            var timeEdit = win.down('ordform').down('textfield[name=courtimef]');
            timeEdit.setValue('10:00');

            var timeEdit = win.down('ordform').down('textfield[name=courtimet]');
            timeEdit.setValue('19:00');

            var form = win.down('ordform');
            form.loadRecord(record);
            var cb_org = form.down('combocity[name=org]');
            cb_org.store.load({
                params: {
                    query: cb_org.getValue()
                }
            });
            if (record.data['orgcode'] != 0)
                cb_org.select(record.data['orgcode']);
            var cb_des = form.down('combocity[name=dest]');
            cb_des.store.load({
                params: {
                    query: cb_des.getValue()
                }
            });
            if (record.data['destcode'] != 0)
                cb_des.select(record.data['destcode']);
            this.getLoadFileForm().down('filefield[name=uploadFile]').setVisible(true);
        }
    },
    dblclickOrdGr: function (gr, rec) {
        var tt = this.getOrdTool();
        if (rec.data['status'] == 'заявлен') {
            var vbut = tt.down('button[action=edit]');
        } else {
            var vbut = tt.down('button[action=view]');
        }
        this.editOrdWin(vbut);
    },

    /**
     * Показывает информацию о заказе во вкладке "Заказы Флиппост"
     * @param gr Таблица
     */
    dblclickOrdClientGr: function (gr) {
        this.showClientOrdWin(gr);
    },

    /**
     * Конвертирует бинарную маску в значения поля 'Категория'
     * @param orderStore - Хранилище заказа
     * @param ordWindow - Окно формы заказа
     */
    convertOrderCategory: function (orderStore, ordWindow) {
        if (orderStore.first() !== undefined && orderStore.first().get("cat") !== null) {
            var values = orderStore.first().get("cat").toString(2);

            while (values.length < 3)
                values = '0' + values;
            var result = [];
            var j = 0;
            for (var i = 0; i < values.length; i++) {
                if (values[i] === '1') {
                    result[j] = i;
                    j++;
                }
            }
            ordWindow.down("combobox[name='sortType']").setValue(result);
        }
    },

    /**
     * Загрузка формы заказа.
     * @param selectedModel Выбранная строка таблицы заказа
     * @param button Кнопка
     * @param me Текущий элемент
     */
    loadOrderForm: function (selectedModel, button, me) {
        if (selectedModel.getCount() > 0) {
            if ((selectedModel.getSelection()[0].get('status') == 'заявлен' && button.action == 'edit') || (button.action == 'view')) {
                var win = Ext.widget('ordwin');
                var store_ord = this.getOrderStStore().load({
                    params: {
                        id: selectedModel.getSelection()[0].get('rordnum'),
                        se: window.location.hash.replace("#", "")
                    },
                    callback: function () {
                        me.convertOrderCategory(store_ord, win);
                    }
                });
                win.show();
                if (button.action == 'view') {
                    win.down('button[action=save]').setText("Повторить заказ")
                } else {
                    win.down('button[action=save]').setVisible(true);
                }
            } else {
                Ext.Msg.alert(FPAgent.lib.Translate.tr("DenyAccess") /*'Запрещено!'*/, FPAgent.lib.Translate.tr("OrdsCont.ErrorOrderEdit") /*'Редактировать можно только заявленные заказы'*/);
            }
        } else {
            if (button.action == 'edit') {
                Ext.Msg.alert(FPAgent.lib.Translate.tr("Alert") /*'Внимание!'*/, FPAgent.lib.Translate.tr("OrdsCont.GetOrderEdit") /*'Выберите заказ для редактирования'*/);
            } else {
                Ext.Msg.alert(FPAgent.lib.Translate.tr("Alert") /*'Внимание!'*/, FPAgent.lib.Translate.tr("OrdsCont.GetOrderView") /*'Выберите заказ для просмотра'*/);
            }
        }
    },

    /**
     * Редактирование заказа.
     * @param btn - Кнопка
     */
    editOrdWin: function (btn) {
        var sm = btn.up('ordgrid').getSelectionModel();
        this.loadOrderForm(sm, btn, this);

    },

    showClientOrdWin: function (grid) {
        var sm = grid.getSelectionModel();
        var me = this;
        if (sm.getCount() > 0) {
            var win = Ext.widget('ordwin');
            win.down('button[action=save]').hide();
            win.show();
            var store = this.getStoreByCabinetType(sm).load({
                params: {
                    id: sm.getSelection()[0].get('rordnum'),
                    se: window.location.hash.replace("#", "")
                },
                callback: function () {
                    me.convertOrderCategory(store, win);
                }
            });

            var formWin = win.items.items[0];
            var fields = formWin.items;
        } else {
            if (btn.action == 'edit') {
                Ext.Msg.alert(FPAgent.lib.Translate.tr("Alert") /*'Внимание!'*/, FPAgent.lib.Translate.tr("OrdsCont.GetOrderEdit") /*'Выберите заказ для редактирования'*/);
            } else {
                Ext.Msg.alert(FPAgent.lib.Translate.tr("Alert") /*'Внимание!'*/, FPAgent.lib.Translate.tr("OrdsCont.GetOrderView") /*'Выберите заказ для просмотра'*/);
            }
        }
    },

    /**
     * Получает хранилище заказов по типу кабинета
     * @param selectedModel Выбранная запись
     * @returns {array} Хранилище
     */
    getStoreByCabinetType: function (selectedModel) {
        if (selectedModel.getSelection()[0].get('cabinet_type') === 'client') {
            return this.getOrderClientStStore();
        } else {
            return this.getOrderStStore();
        }
    },

    printWB: function (btn) {
        var record = this.getViewWbStStore().findRecord('wb_no', this.getViewWbForm().down('displayfield[name=wb_no]').value);
        window.open('srv/report.php?se=' + window.location.hash.replace("#", "") + '&wbno=' + this.getViewWbForm().down('displayfield[name=wb_no]').value);
    },

    /**
     * Проверка пункта отправления.
     * @param orgField Поле пункта отправления
     */
    checkOrg: function (orgField) {
        if (orgField.value == null) {
            var store = orgField.getStore();
            if (store.find('fname', orgField.getValue(), 0, true, true) == -1) {
                Ext.Msg.alert(
                    FPAgent.lib.Translate.tr("OrdsCont.CityError") /*'Ошибка ввода города'*/,
                    FPAgent.lib.Translate.tr("OrdsCont.CitySenderError") /*'Неверно введен город Отправителя! Выберите город из выпадающего списка.'*/
                );
                return -1;
            }
            ;

            var record = store.findRecord('fname', orgField.getValue(), 0, true, true);
            if (record !== null)
                orgField.setValue(record);

            if (orgField.value == null) {
                Ext.Msg.alert(
                    FPAgent.lib.Translate.tr("OrdsCont.CityError") /*'Ошибка ввода города'*/,
                    FPAgent.lib.Translate.tr("OrdsCont.CitySenderError") /*'Неверно введен город Отправителя! Выберите город из выпадающего списка.'*/
                );
                return -1;
            }
            ;
        }

        return 0;
    },

    /**
     * Проверка пункта назначения.
     * @param destField Поле пукта назначения
     */
    checkDest: function (destField) {
        if (destField.value == null) {
            var store = destField.getStore();
            if (store.find('fname', destField.getValue(), 0, true, true) === -1) {
                Ext.Msg.alert(
                    FPAgent.lib.Translate.tr("OrdsCont.CityError") /*'Ошибка ввода города'*/,
                    FPAgent.lib.Translate.tr("OrdsCont.CityRecipientError") /*'Неверно введен город Отправителя! Выберите город из выпадающего списка.'*/
                );
                return -1;
            }

            var record = store.findRecord('fname', destField.getValue(), 0, true, true);
            if (record !== null)
                destField.setValue(record);

            if (destField.value == null) {
                Ext.Msg.alert(
                    FPAgent.lib.Translate.tr("OrdsCont.CityError") /*'Ошибка ввода города'*/,
                    FPAgent.lib.Translate.tr("OrdsCont.CityRecipientError") /*'Неверно введен город Отправителя! Выберите город из выпадающего списка.'*/
                );
                return -1;
            }
        }

        return 0;

    },

    /**
     * Получает маску выбранных категорий
     * @param orderForm - Форма заказа
     */
    getOrderCategory: function (orderForm) {
        var values = orderForm.down('combobox[name=sortType]').getValue();
        var result = ['0', '0', '0'];
        Ext.Array.forEach(values, function (value) {
            result[value] = '1'
        });

        return result.join('');

    },

    /**
     * Проверка формы перед отправкой.
     * @param form Форма сохранени/редактирования заказа
     * @returns {boolean} Результат проверки
     */
    checkFormBeforeRequest: function (form) {
        if (!this.checkOrderSubType(form))
            return false;
        return this.checkOrderCourierTime(form);
    },

    /**
     * Проверка заполнения поля "Подкатегория"
     * @param form Форма создания заказа
     * @returns {boolean} Результат проверки
     */
    checkOrderSubType: function (form) {
        var subCategory = form.down('combobox[name=subtype]');
        if (subCategory.disabled === false) {
            if (subCategory.value === null || subCategory.value.length === 0) {
                Ext.Msg.alert('Заказ не сохранен!', 'Заполните поле "Подкатегория"');
                return false;
            }
        }

        return true;
    },

    /**
     * Проверка полей "Время прибытия с" и "Время прибытия по".
     * @param form Форма создания заказа
     * @returns {boolean} Результат проверки
     */
    checkOrderCourierTime: function (form) {
        var date = form.down("textfield[name=courdate]").getValue();

        var timeFromVal = form.down("textfield[name=courtimef]").getValue();
        var timeToVal = form.down("textfield[name=courtimet]").getValue();

        if (timeFromVal.indexOf(":") === -1) {
            Ext.Msg.alert('Заказ не сохранен!', 'Поле "Время с" не содержит разделитель минут и секунд (":")');
            return false;
        }

        if (timeFromVal.length !== 5) {
            Ext.Msg.alert('Заказ не сохранен!', 'Поле "Время с" содержит неправильное количество символов. Ожидается - 5, количество - ' + timeFromVal.length);
            return false;
        }

        if (timeToVal.indexOf(":") === -1) {
            Ext.Msg.alert('Заказ не сохранен!', 'Поле "Время с" не содержит разделитель минут и секунд (":")');
            return false;
        }

        if (timeToVal.length !== 5) {
            Ext.Msg.alert('Заказ не сохранен!', 'Поле "Время с" содержит неправильное количество символов. Ожидается - 5, количество - ' + timeFromVal.length);
            return false;
        }

        var timeFrom = timeFromVal.split(":");
        var timeTo = timeToVal.split(":");

        var dateFrom = date.setHours(timeFrom[0], timeFrom[1], 0, 0);
        var dateTo = date.setHours(timeTo[0], timeTo[1], 0, 0);
        var result = dateTo > dateFrom;

        if (!result)
            Ext.Msg.alert('Заказ не сохранен!', 'Поле "Время с" должно быть меньше "Время до"');

        return result;
    },


    /**
     * Сохранения заказа.
     * @param btn Кнопка 'Сохранить'
     */
    saveOrder: function (btn) {
        var me = this;
        var win = btn.up('ordwin');
        var form_ord = win.down('ordform');

        if (win.down('button[action=save]').getText() === 'Повторить заказ') {
            form_ord.down('textfield[name=rordnum]').setValue(null);
        }

        if (!me.checkFormBeforeRequest(form_ord)) {
            return;
        }

        var form_lf = win.down('loadfileform');
        var org = form_ord.down('combocity[name=org]');
        var dest = form_ord.down('combocity[name=dest]');
        if (this.checkOrg(org) === -1)
            return;
        if (this.checkDest(dest) === -1)
            return;

        if (form_ord.getForm().isValid()) {
            btn.disable();
            form_ord.submit({
                url: 'srv/data.php',
                params: {
                    dbAct: 'saveagorder',
                    se: window.location.hash.replace("#", ""),
                    cat: parseInt(me.getOrderCategory(form_ord), 2)
                },
                submitEmptyText: false,
                success: function (form, action) {
                    if (action.result.data[0].rordnum && form_lf.down('filefield[name=uploadFile]').getValue()) {
                        if (form_lf.getForm().isValid()) {
                            form_lf.submit({
                                url: 'srv/upload.php',
                                params: {
                                    act: 'ins',
                                    orderNum: action.result.data[0].rordnum,
                                    se: window.location.hash.replace("#", "")
                                },
                                success: function (form, action) {
                                    form.reset();
                                    me.getOrdForm().up('ordwin').close();
                                    me.loadOrdGr();
                                    Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.OrderSave") /*'Заказ сохранен!'*/, action.result.msg);
                                },
                                failure: function (form, action) {
                                    form.reset();
                                    me.getOrdForm().up('ordwin').close();
                                    me.loadOrdGr();
                                    Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.FileNotSave") /*'Файл не сохранен!'*/, action.result.msg);
                                }
                            });
                        }
                    } else {
                        form.reset();
                        me.getOrdForm().up('ordwin').close();
                        me.loadOrdGr();
                        Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.OrderSave") /*'Заказ сохранен!'*/, action.result.msg);
                    }
                },
                failure: function (form, action) {
                    Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.OrderNotSave") /*'Заказ не сохранен!'*/, action.result.msg);
                    btn.enable();
                }
            });
        } else {
            Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.FieldIsEmptyHead") /*'Не все поля заполнены'*/, FPAgent.lib.Translate.tr("OrdsCont.FieldIsEmptyBody") /*'Откорректируйте информацию'*/)
        }
    },

    fileDel: function (but) {
        var form_lf = but.up('loadfileform');
        var form_ord = this.getOrdForm();
        Ext.Ajax.request({
            url: 'srv/upload.php',
            params: {
                orderNum: form_ord.down('textfield[name=rordnum]').getValue(),
                act: 'del',
                se: window.location.hash.replace("#", "")
            },
            success: function (fp) {
                jData = Ext.decode(fp.responseText);
                form_lf.down('label[name=urlf]').setText('', false);
                form_lf.down('button[action=delete]').hide();
                form_lf.down('filefield[name=uploadFile]').show();
            },
            failure: function (response) {
                Ext.Msg.alert('error!');
            }
        });
    },
    loadOrdClientStore: function (st, rec) {
        var edi = this.getOrdWin();
        var form_ord = edi.down('ordform');
        var form_lf = edi.down('loadfileform');
        form_lf.down('label[name=urlf]').setVisible(false);
        form_lf.down('button[action=delete]').hide();

        form_ord.loadRecord(rec[0]);
        edi.setTitle('Заказ № ' + rec[0].data['rordnum']);

        var cb_org = form_ord.down('combocity[name=org]');
        cb_org.store.load({
            params: {
                query: cb_org.getValue(),
                se: window.location.hash.replace("#", "")
            }
        });
        cb_org.select(rec[0].data['orgcode']);

        var cb_des = form_ord.down('combocity[name=dest]');
        cb_des.store.load({
            params: {
                query: cb_des.getValue()
            }
        });
        cb_des.select(rec[0].data['destcode']);

        form_ord.down('combocity[name=org]').focus(false, true);
    },
    loadOrdStore: function (st, rec) {
        var edi = this.getOrdWin();
        var form_ord = edi.down('ordform');
        var form_lf = edi.down('loadfileform');
        if (rec[0].data.autorfilename) {
            form_lf.down('filefield[name=uploadFile]').setVisible(false);
            form_lf.down('label[name=urlf]').setVisible(true);
            if (rec[0].data.fileowner == 1 && rec[0].data.status == 'заявлен') {
                form_lf.down('button[action=delete]').show();
            }
            form_lf.down('label[name=urlf]').setText('<a href="srv/downloadfile.php?fn=' + rec[0].data.realfilename + '"   target="_blank">Скачать прикрепленный файл: ' + rec[0].data.autorfilename + '</a>', false);
        } else {
            if (rec[0].data.fileowner == 1 && rec[0].data.status == 'заявлен') {
                form_lf.down('filefield[name=uploadFile]').setVisible(true);
            }
            form_lf.down('label[name=urlf]').setVisible(false);
            form_lf.down('button[action=delete]').hide();
        }
        form_ord.loadRecord(rec[0]);
        edi.setTitle('Заказ № ' + rec[0].data['rordnum']);

        var cb_org = form_ord.down('combocity[name=org]');
        cb_org.store.load({
            params: {
                query: cb_org.getValue(),
                se: window.location.hash.replace("#", "")
            }
        });
        cb_org.select(rec[0].data['orgcode']);

        var cb_des = form_ord.down('combocity[name=dest]');
        cb_des.store.load({
            params: {
                query: cb_des.getValue(),
                se: window.location.hash.replace("#", "")
            }
        });
        cb_des.select(rec[0].data['destcode']);

        form_ord.down('combocity[name=org]').focus(false, true);
    },
    loadOrdersSt: function (st) {
        var tt = this.getOrdTotal();
        tt.down('label').setText(FPAgent.lib.Translate.tr("OrdsCont.OrdersCount") /*'Количество заказов: '*/ + st.getCount());
    },

    loadClientOrdersSt: function (st, rec) {
        var tt = this.getOrdClientTotal();
        var label = tt.down('label');
        label.setText(FPAgent.lib.Translate.tr("OrdsCont.OrdersCount") /*'Количество заказов: '*/ + st.getCount());
    }
});
