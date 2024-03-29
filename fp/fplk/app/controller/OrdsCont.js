Ext.define('fplk.controller.OrdsCont', {
    extend: 'Ext.app.Controller',
    views: [
        'orders.OrdGrid',
        'orders.OrdWin',
        'orders.OrdWinSber',
        'orders.WbNoWin',
        'orders.WbNoForm',
        'orders.OrdsPanel',
        'orders.UseTemplWin',
        'orders.UseTemplForm',
        'orders.ViewWbWin',
        'wbs.WbsGrid',
        'orders.imports.orders.LoadOrdersWin',
        'orders.imports.webwbs.LoadWebWbsWin',
        'orders.OrdExWin',
        'orders.OrdExGrid',
        'orders.OrdExForm'],
    models: [
        'OrdsMod',
        'OrderMod',
        'CityMod',
        'AgentsMod',
        'OrdExMod',
        'LocalQueries'],
    stores: [
        'OrdsSt',
        'aMonths',
        'OrderSt',
        'CityStOrg',
        'CityStDes',
        'TypeSt',
        'TypeStSber',
        'AgentsSt',
        'TemplSt',
        'ViewWbSt',
        'ClientSt',
        'OrdExStore',
        'LocalQueries',
        'SortTypeSt',
        'SortSubTypeSt'],
    refs: [/*{
			ref : 'WbForm',
			selector : 'wbform'
		},*/ {
        ref: 'OrdForm',
        selector: 'ordform'
    }, {
        ref: 'OrdFormSber',
        selector: 'ordformsber'
    }, {
        ref: 'OrdTool',
        selector: 'ordtool'
    }, {
        ref: 'OrdTotal',
        selector: 'ordtotal'
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
        ref: 'OrdWinSber',
        selector: 'ordwinsber'
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
    }, /*{
			ref : 'WbWin',
			selector : 'wbwin'
		},*/{
        ref: 'WbNoForm',
        selector: 'wbnoform'
    }, {
        ref: 'MainPanel',
        selector: 'mainpanel'
    }, {
        ref: 'WbsGrid',
        selector: 'wbsgrid'
    }, {
        ref: 'OrdGrid',
        selector: 'ordgrid'
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
        ref: 'OrdExGrid',
        selector: 'ordexgrid'
    }
    ],
    init: function () {
        this.control({
            'ordspanel': {
                activate: this.loadOrdGr
            },
            'ordform textfield[name=destIndex]': {
                change: this.setCityByKLADR
            },
            'ordform textfield[name=orgIndex]': {
                change: this.setCityByKLADR
            },
            'ordformsber textfield[name=destIndex]': {
                change: this.setCityByKLADR
            },
            'ordformsber textfield[name=orgIndex]': {
                change: this.setCityByKLADR
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
            'ordwinsber button[action=save]': {
                click: this.saveOrder
            },
            'ordtool > combomonth > button[name=periodRefresh]': {
                click: this.periodChange
            },
            'loadfileform button[action=delete]': {
                click: this.fileDel
            },
            'wbsgrid > tableview': {
                itemdblclick: this.dblclickWbsGr
            },
            'ordgrid > tableview': {
                itemdblclick: this.dblclickOrdGr
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
                keypress: this.pressTpl,
                beforequery: this.templateQuery,
                afterquery: this.afterTemplateQuery
            },
            'viewwbwin button[action=printWB]': {
                click: this.printWB
            },
            'ordtool button[action=import]': {
                click: this.loadWebWbsWin
            },
            'ordtool button[action=importOrders]': {
                click: this.loadOrdersWin
            },
            'loadorderswin button[action=imp]': {
                click: this.importOrders
            },
            'loadwebwbswin button[action=imp]': {
                click: this.importWebWbs
            },
            'ordgrid actioncolumn': {
                itemclick: this.viewEx
            },
            'ordwin combobox[name=sortType]': {
                change: this.changeOrdType
            }

        });
        this.getOrderStStore().on({
            scope: this,
            load: this.loadOrdStore
        });
        this.getViewWbStStore().on({
            scope: this,
            load: this.loadViewWbSt
        });
        this.getOrdsStStore().on({
            scope: this,
            load: this.loadOrdersSt
        });
        this.getOrdExStoreStore().on({
            scope: this,
            load: this.loadOrdExStore
        });
        this.getClientStStore().load();
    },

    loadOrdExStore: function () {
        this.getOrdExGrid().getSelectionModel().select(0);
    },

    afterTemplateQuery: function (query) {

    },

    /**
     * Импортирует данные.
     * @param target Вид импорта
     * @param form Форма импорта
     * @param win Окно импорта
     */
    importData: function (target, form, win) {
        var me = this;
        if (form.getForm().isValid() && form.down('filefield[name=uploadFile]').getValue()) {
            form.submit({
                url: 'srv/import/import.php',
                params: {
                    act: target
                },
                success: function (form, action) {

                    me.loadOrdGr();
                    win.close();
                    Ext.Msg.alert('Импортирование завершено успешно!', action.result.msg);
                },
                failure: function (form, action) {
                    Ext.Msg.alert('Ошибка импорта!', action.result.msg);
                }
            });
        }
    },

    /**
     * Открытие окна 'Импорт web накладных'
     */
    loadWebWbsWin: function () {
        Ext.widget('loadwebwbswin').show();
    },

    /**
     * Загрузка веб накладных
     * @param btn Кнопка 'Импортировать'
     */
    importWebWbs: function (btn) {
        var win = btn.up('loadwebwbswin');
        var form = win.down('loadwebwbsform');

        this.importData("importWebWB", form, win);
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
        var field = sortType.next('combobox[name=subcategory]');
        field.clearValue();
        field.setDisabled(true);
    },

    /**
     * Включает подкатегорию.
     * @param sortType Поле категория
     */
    enableSubTypeField: function (sortType) {
        var field = sortType.next('combobox[name=subcategory]');
        field.setDisabled(false);
        field.allowBlank = true;
    },

    /**
     * Запрос с помощью регулярного выражения.
     * @param record Запрос
     */
    templateQuery: function (query) {

        query.combo.getStore().each(function (record) {
            if (record.get('templatename').indexOf(']* ') > -1)
                record.set('templatename', record.get('templatename').split(']* ')[1])
        })
        query.combo.getStore().each(function (record) {
            for (var i in record.getData()) {
                var found = false;
                if (record.get(i) != null)
                    found = record.get(i).toString().toLowerCase().includes(query.combo.getRawValue().toLowerCase());
                if (found) {
                    record.set('templatename', '*[' + record.get(i) + ']* ' + record.get('templatename'));
                    break;
                }
            }
        })
        query.query = new RegExp(query.query, 'i');
        query.forceAll = true;
    },

    /**
     * Показываются проблемы заказа.
     * @param column Текущая колонка таблицы
     * @param action Действие над таблицей
     * @param grid Текущая таблица
     * @param rowIndex Индекс строки
     * @param colIndex Индекс колонки
     * @param record Выбранная запись
     */
    viewEx: function (column, action, grid, rowIndex, colIndex, record) {
        this.viewExGrid(record.data['rordnum']);
    },

    /**
     * Выводит окно проблемм заказа
     * @param ex_rordnum ID заказа
     */
    viewExGrid: function (ex_rordnum) {
        if (ex_rordnum) {
            Ext.widget('ordexwin').show();
            this.getOrdExStoreStore().load({
                params: {
                    rordnum: ex_rordnum
                }
            });
        } else {
            Ext.Msg.alert('Запрещено!', 'Выберите заказ');
        }
    },

    /**
     * Получает введенный период.
     * @returns {[*, *]} Период от и до
     */
    getDateFromPeriodFilter: function () {
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
    periodChange: function () {
        var period = this.getDateFromPeriodFilter();
        this.loadOrdersByPeriod(period[0], period[1]);
    },

    /**
     * Получает гоод по его индексу.
     * Сайт - https://kladr-api.ru
     * Логин - aleksiev_vova@mail.ru
     * Пароль - 1234098sam
     * @param rawValue Индекс города
     */
    getKladr: function (rawValue) {
        var result = null;

        Ext.Ajax.request({
            url: 'srv/KladrApi.php',
            async: false,
            params: {
                searchingIndex: rawValue
            },
            success: function (response) {
                var text = Ext.decode(response.responseText);
                if (text.result.length === 0) {
                    Ext.Msg.alert(
                        'Неверный индекс!',
                        "Не найден введенный индекс");
                } else {
                    result = text.result[0].parents;
                }
            },
            failure: function () {
                Ext.Msg.alert(
                    'Сервер КЛАДР не доступен!',
                    "Возможны проблемы с удаленным сервером КЛАДР." +
                    " Повторите позже");
            }
        });
        return result;
    },

    /**
     * Задает поле города по индексу.
     * Если поле содержит 6 символов и
     * все символы числовые, то идет запрос к
     * КЛАДР и после ищет совпадения в базе.
     * @param component Активное поле "Индекс"
     */
    setCityByKLADR: function (component) {
        var input = component.rawValue;
        var kladr = null;
        var targetComponent = (component.name === "orgIndex")
            ? component.up("window").down("combocity[name=org]")
            : component.up("window").down("combocity[name=dest]");

        if (input.length === 6) {
            if (input.match(/\d\d\d\d\d\d/) != null) {
                kladr = this.getKladr(input);
                if (kladr == null) {
                    Ext.Msg.alert(
                        'Не найден индекс!',
                        "Не найден индекс в базе КЛАДР. " +
                        "Проверьте данные и повторите запрос");
                    component.reset();
                } else {
                    this.setCityValueAndEvents(targetComponent, kladr);
                }
            } else {
                Ext.Msg.alert(
                    'Неверный индекс!',
                    "Введен не верный формат индекса");
            }
        } else {
            targetComponent.clearValue();
            targetComponent.setReadOnly(false);
        }

    },

    /**
     * Выбирает значения в Combocity
     * @param component Активное поле Combocity
     * @param value Искомое значение
     */
    setCityValueAndEvents: function (component, value) {
        var city = '';
        var region = '';
        Ext.Array.each(value, function (record) {
            if (record.contentType === "region")
                region = record.name;
            if (record.contentType === "city")
                city = record.name;
        });
        var store = component.store;
        component.clearValue();
        store.load({
            params: {
                dbAct: "GetCityByKLADR",
                city: city,
                region: region
            },
            scope: this,
            callback: function (record, operation, success) {
                if (!success) {
                    Ext.Msg.alert(
                        'Не найден адресс!',
                        "Ошибка запроса к базе данных");
                } else {
                    if (record.length === 0) {
                        var isSber = (this.getMainPanel().up('viewport').down('mainpanel').down('label').text.indexOf("СБЕРБАНК-СЕРВИС") > -1)
                        var win = (isSber) ? component.up('ordwinsber') : component.up('ordwin');
                        var index = (component.name === "org")
                            ? win.down("textfield[name=orgIndex]")
                            : win.down("textfield[name=destIndex]");
                        index.setRawValue("");
                        Ext.Msg.alert(
                            'Не найден адресс!',
                            "Не найден подходящий адрес в базе данных");
                    } else {
                        component.select(record);
                        component.setReadOnly(true);
                    }
                }
            }
        });
    },

    printWB: function (but) {
        var frm = but.up('window').down('form');
        window.open('srv/report.php?wbno=' + frm.down('displayfield[name=wb_no]').value + '&iswb=1');
    },

    loadOrdersWin: function () {
        Ext.widget('loadorderswin').show();
    },

    /**
     * Импорт заказов
     * @param btn Кнопка 'Импортировать'
     */
    importOrders: function (btn) {
        var win = btn.up('loadorderswin');
        var form = win.down('loadordersform');

        this.importData("importOrders", form, win);
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
        this.getTemplStStore().load();
    },
    pressEnter: function (fild, e) {
        var keyCode = e.getKey();
        if (keyCode === 13) {
            this.saveWbno(fild.up('wbnoform').up('wbnowin').down('button[action=save]'));
        }
    },

    pressTpl: function (fild, e) {
        var keyCode = e.getKey();
        if (keyCode === 13)
            this.setTpl();
    },

    saveWbno: function (btn) {
        var me = this;
        var win = btn.up('wbnowin');
        var form_wbno = win.down('wbnoform');
        if (form_wbno.getForm().isValid()) {
            form_wbno.submit({
                url: 'srv/data.php',
                params: {
                    dbAct: 'SetWbno'
                },
                submitEmptyText: false,
                success: function (form) {
                    form.reset();
                    win.close();
                    me.loadOrdGr();
                },
                failure: function (form, action) {
                    Ext.Msg.alert('Номер накладной не сохранен!', action.result.msg);
                }
            });
        } else {
            Ext.Msg.alert('Нет номера накладной!', 'Откорректируйте информацию')
        }
    },
    editWbno: function (btn) {
        var sm = btn.up('ordgrid').getSelectionModel();
        if (sm.getCount() > 0) {
            var win = Ext.widget('wbnowin');
            win.show();
            var form = win.down('wbnoform');
            form.down('textfield[name=wbno]').setValue(sm.getSelection()[0].get('wb_no'));
            form.down('textfield[name=rordnum]').setValue(sm.getSelection()[0].get('rordnum'));
            form.down('textfield[name=wbno]').focus(false, true);
        } else {
            Ext.Msg.alert('Внимание!', 'Выберите заказ');
        }
    },
    viewWb: function (btn) {
        var sm = btn.up('ordgrid').getSelectionModel();
        if (sm.getSelection()[0].get('wb_no')) {
            this.getViewWbStStore().load({
                params: {
                    wb_no: sm.getSelection()[0].get('wb_no')
                }
            });
        } else {
            Ext.Msg.alert('Внимание!', 'Выберите заказ с введенным номером накладной!');
        }
    },
    dblclickWbsGr: function (gr) {
        var sm = gr.getSelectionModel();
        if (sm.getSelection()[0].get('wb_no')) {
            this.getViewWbStStore().load({
                params: {
                    wb_no: sm.getSelection()[0].get('wb_no')
                }
            });
        } else {
            Ext.Msg.alert('Внимание!', 'Выберите заказ с введенным номером накладной!');
        }
    },
    loadViewWbSt: function (st, rec, suc) {
        if (suc) {
            if (rec[0].data.wbstatus === 0) {
                Ext.Msg.alert(FPAgent.lib.Translate.tr("Alert")/*'Внимание!'*/, FPAgent.lib.Translate.tr("OrdsCont.WbEmpty")/*'Накладная не введена в систему!'*/);
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
            Ext.Msg.alert(FPAgent.lib.Translate.tr("Error")/*'Ошибка!'*/, FPAgent.lib.Translate.tr("ServerdDown")/*'Ошибка связи с сервером!'*/);
        }
    },
    exportExcel: function (btn) {
        var sm = btn.up('ordgrid').getSelectionModel();
        if (sm.getCount() > 0) {
            window.location.href = 'srv/getOrderXLS.php?ordnum=' + sm.getSelection()[0].get('rordnum');
        } else {
            Ext.Msg.alert('Внимание!', 'Выберите заказ для экспорта');
        }
    },
    changeAgent: function (comp, newValue) {
        if (comp.up('mainpanel').activeTab.title === 'Заказы') {
            Ext.Ajax.request({
                url: 'srv/change.php',
                params: {
                    agent: newValue[0].data['partcode']
                },
                success: function () {
                    var period = this.getDateFromPeriodFilter();
                    this.loadOrdersByPeriod(period[0], period[1]);
                },
                failure: function (response) {
                    Ext.Msg.alert('Сервер недоступен!', response.statusText);
                }
            });
        }
    },
    loadOrds: function (y, m) {
        this.getOrdsStStore().load({
            params: {
                newPeriod: y + m
            }
        });
    },

    /**
     * Загрузка заказов по периоду
     * @param startDate Начальная дата
     * @param endDate Конечная дата
     */
    loadOrdersByPeriod: function (startDate, endDate) {
        this.getOrdsStStore().load({
            params: {
                from: startDate,
                to: endDate
            }
        });
    },

    loadOrdGr: function () {
        var adTol = this.getAdmTool();
        if (adTol.down('label').text === 'WEB Администратор') {
            adTol.down('buttongroup[itemId=admgroup]').setVisible(true);
        }
        var btnList = adTol.down('button[action=list]');
        var btnTempl = adTol.down('button[action=templ]');
        btnList.setVisible(true);
        btnTempl.setVisible(true);
        this.clkList(btnList);
        var period = this.getDateFromPeriodFilter();
        this.loadOrdersByPeriod(period[0], period[1]);
        this.getTemplStStore().load();
    },
    openOrdWin: function (btn) {
        var isSber = (btn.up('viewport').down('mainpanel').down('label').text.indexOf("СБЕРБАНК-СЕРВИС") > -1)
        var edit = (isSber) ? Ext.widget('ordwinsber') : Ext.widget('ordwin');
        edit.show();
        var form = (isSber) ? edit.down('ordformsber') : edit.down('ordform');
        //var form_lf = edit.down('loadfileform');
        //form_lf.down('filefield[name=uploadFile]').setVisible(true);
        form.down('combocity[name=dest]').focus(false, true);

        var timeEdit = form.down('textfield[name=courtimef]');
        //timeEdit.setReadOnly(true);
        timeEdit.setValue('10:00');

        var timeEdit = form.down('textfield[name=courtimet]');
        //timeEdit.setReadOnly(true);
        timeEdit.setValue('19:00');
        if (this.getClientStStore().getCount() > 0) {
            //auto sender begin
            client = this.getClientStStore().first();
            //мухлеж
            client.set('org', client.get('city'));
            client.set('orgcode', client.get('cityid'));

            form_ord = edit.down('ordform');
            //form_ord.loadRecord(client);

            var cb_org = form_ord.down('combocity[name=org]');
            cb_org.store.load({
                params: {
                    query: client.get('org')
                }
            });
            cb_org.select(client.get('orgcode'));
            //auto sender end
        }
    },
    openTpl: function (btn) {

        if (this.getTemplStStore().getCount() > 0) {
            var win = Ext.widget('usetemplwin');
            win.show();
            win.down('usetemplform').down('combobox[name=tplname]').focus(false, true);
        } else {
            Ext.Msg.alert('Запрещено!', 'У Вас нет шаблонов!');
        }
    },
    setTpl: function (btn) {
        var tplform = this.getUseTemplForm();
        if (tplform.getForm().isValid()) {
            var record = this.getTemplStStore().findRecord('id', tplform.down('combobox[name=tplname]').getValue());
            tplform.getForm().reset();
            tplform.up('usetemplwin').close();
            var isSber = this.getMainPanel().up('viewport').down('mainpanel').down('label').text.indexOf("СБЕРБАНК-СЕРВИС") > -1
            var win = (isSber) ? Ext.widget('ordwinsber') : Ext.widget('ordwin');
            var form = (isSber) ? win.down('ordformsber') : win.down('ordform');

            var timeEdit = form.down('textfield[name=courtimef]');

            timeEdit.setValue('10:00');

            var timeEdit = form.down('textfield[name=courtimet]');

            timeEdit.setValue('19:00');

            form.loadRecord(record);
            var cb_org = form.down('combocity[name=org]');
            cb_org.store.load({
                params: {
                    query: cb_org.getValue()
                }
            });
            if (record.data['orgcode'] > 0) {
                cb_org.select(record.data['orgcode']);
            }
            var cb_des = form.down('combocity[name=dest]');
            cb_des.store.load({
                params: {
                    query: cb_des.getValue()
                }
            });
            if (record.data['destcode'] > 0) {
                cb_des.select(record.data['destcode']);
            }
            //this.getLoadFileForm().down('filefield[name=uploadFile]').setVisible(true);
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

    editOrdWin: function (btn) {
        var me = this;
        var sm = btn.up('ordgrid').getSelectionModel();
        if (sm.getCount() > 0) {
            if ((sm.getSelection()[0].get('status') == 'заявлен' && btn.action == 'edit') || (btn.action == 'view')) {
                var isSber = this.getMainPanel().down('label').text.indexOf("СБЕРБАНК-СЕРВИС") > -1;
                var win = (isSber) ? Ext.create('fplk.view.orders.OrdWinSber').show() : Ext.create('fplk.view.orders.OrdWin').show();
                var store_ord = this.getOrderStStore().load({
                    params: {
                        id: sm.getSelection()[0].get('rordnum')
                    },
                    callback: function () {
                        me.convertOrderCategory(store_ord, win);
                    }
                });
                if (btn.action == 'view') {
                    win.down('button[action=save]').setText('Повторить заказ');
                } else {
                    win.down('button[action=save]').setVisible(true);
                }
            } else {
                Ext.Msg.alert('Запрещено!', 'Редактировать можно только заявленные заказы');
            }
        } else {
            if (btn.action == 'edit') {
                Ext.Msg.alert('Внимание!', 'Выберите заказ для редактирования');
            } else {
                Ext.Msg.alert('Внимание!', 'Выберите заказ для просмотра');
            }
        }
    },

    /**
     * Конвертирует бинарную маску в значения поля 'Категория'
     * @param orderStore - Хранилище заказа
     * @param ordWindow - Окно формы заказа
     */
    convertOrderCategory: function (orderStore, ordWindow) {
        if (orderStore.first() !== undefined && orderStore.first().get("category") !== null) {
            var values = orderStore.first().get("category").toString(2);

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
     * Сохраняет заказ.
     * Если введен индекс,
     * обращается к API КАДР,
     * далее выбирает город и ищет
     * совпадения во внутренней базе
     * и выставляет код города из внутренней базы.
     * Если город введен вручную проверяет правильност
     * ввода и выставляет код из внутренней базы.
     * @param btn Кнопка сохранить.
     */
    saveOrder: function (btn) {
        var isSber = this.getMainPanel().down('label').text.indexOf("СБЕРБАНК-СЕРВИС") > -1;
        if (isSber)
            this.saveSberOrder(btn)
        else
            this.saveOrdinalOrder(btn)

    },

    /**
     * Сохраняет заказ от СБЕР-СЕРВИС(SBS)
     * @param btn Кнопка "Сохранить"
     */
    saveSberOrder: function (btn) {
        var me = this;
        var win = btn.up('ordwinsber');
        var indexOrg = win.down("textfield[name=orgIndex]");
        var indexDest = win.down("textfield[name=destIndex]");
        var form_ord = win.down('ordformsber');
        var org = form_ord.down('combocity[name=org]');
        var dest = form_ord.down('combocity[name=dest]');
        if (indexDest.rawValue.length != 0) {
            if (indexDest.rawValue.match(/\d\d\d\d\d\d/) == null) {
                Ext.Msg.alert('Ошибка индекса', 'Не верный формат индекса в поле "Индекс получателя"');
                return;
            }
        }

        if (indexOrg.rawValue.length != 0) {
            if (indexOrg.rawValue.match(/\d\d\d\d\d\d/) == null) {
                Ext.Msg.alert('Ошибка индекса', 'Не верный формат индекса в поле "Индекс отправителя"');
                return;
            }
        }
        if (win.down('button[action=save]').getText() == 'Повторить заказ') {
            form_ord.down('textfield[name=rordnum]').setValue(null);
            form_ord.down('datefield[name=courdate]').setValue(new Date());
        }

        if (dest.value == null) {
            var jsonArrayDes = this.getCityStDesStore().data.items;
            if (jsonArrayDes.length == 0) {
                Ext.Msg.alert('Ошибка ввода города', 'Неверно введен город Получателя! Выберите город из выпадающего списка.');
                return;
            }
            for (var i = 0; i < jsonArrayDes.length; i++) {
                if (jsonArrayDitemclickes[i].get('fname') == Ext.util.Format.trim(dest.getValue())) {
                    dest.setValue(jsonArrayDes[i].data.code);
                    break;
                }
            }
            if (dest.value == null) {
                Ext.Msg.alert('Ошибка ввода города', 'Неверно введен город Получателя! Выберите город из выпадающего списка.');
                return;
            }
        }

        if (org.value == null) {
            var jsonArrayOrg = this.getCityStOrgStore().data.items;
            if (jsonArrayOrg.length == 0) {
                Ext.Msg.alert('Ошибка ввода города', 'Неверно введен город Отправителя! Выберите город из выпадающего списка.');
                return;
            }
            for (var i = 0; i < jsonArrayOrg.length; i++) {
                if (jsonArrayOrg[i].get('fname') == Ext.util.Format.trim(org.getValue())) {
                    org.setValue(jsonArrayOrg[i].data.code);
                    break;
                }
            }
            if (org.value == null) {
                Ext.Msg.alert('Ошибка ввода города', 'Неверно введен город Отправителя! Выберите город из выпадающего списка.');
                return;
            }
        }
        this.checkOrderPayer(form_ord, me)

    },

    /**
     * Проверяет и выводит сообщение о проверки платильщика
     * @param form Текущая форма
     * @param object Объект
     */
    checkOrderPayer: function (form, object) {
        if (form.getValues()['fpayr'] !== undefined && form.getValues()['fpayr'] !== 3) {
            Ext.Msg.confirm(
                'Подтверждение',
                'Заказ оплачивает Ваша компания?',
                function (btn) {
                    if (btn === 'yes') {
                        var model = form.getValues();
                        model['fpayr'] = 3;
                        form.getForm().setValues(model)
                        object.saveOrderRequest(form, object);
                    } else {
                        object.saveOrderRequest(form, object);
                    }
                });
        } else {
            object.saveOrderRequest(form, object);
            return;
        }
    },

    /**
     * Проверка формы перед отправкой.
     * @param form Форма сохранени/редактирования заказа
     * @returns {boolean} Результат проверки
     */
    checkFormBeforeRequest: function (form) {
        if(!this.checkOrderSubType(form))
            return false;
        return this.checkOrderCourierTime(form);
    },

    /**
     * Проверка заполнения поля "Подкатегория"
     * @param form Форма создания заказа
     * @returns {boolean} Результат проверки
     */
    checkOrderSubType: function (form) {
        var subCategory = form.down('combobox[name=subcategory]');
        if(subCategory.disabled === false) {
            if(subCategory.value === null || subCategory.value.length === 0) {
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

        if(timeFromVal.indexOf(":") === -1) {
            Ext.Msg.alert('Заказ не сохранен!', 'Поле "Время с" не содержит разделитель минут и секунд (":")');
            return false;
        }

        if(timeFromVal.length !== 5 ) {
            Ext.Msg.alert('Заказ не сохранен!', 'Поле "Время с" содержит неправильное количество символов. Ожидается - 5, количество - ' + timeFromVal.length);
            return false;
        }

        if(timeToVal.indexOf(":") === -1) {
            Ext.Msg.alert('Заказ не сохранен!', 'Поле "Время с" не содержит разделитель минут и секунд (":")');
            return false;
        }

        if(timeToVal.length !== 5 ) {
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
     * Отправляет запрос на сохранение формы.
     * @param form Текущая форма
     * @param object Текущий объект
     */
    saveOrderRequest: function (form, object) {
        var me = this;
        if(!me.checkFormBeforeRequest(form))
            return;

        if (form.getForm().isValid()) {
            form.submit({
                url: 'srv/data.php',
                async: false,
                params: {
                    dbAct: 'saveagorder',
                    cat: parseInt(me.getOrderCategory(form), 2)
                },
                submitEmptyText: false,
                success: function (form, action) {
                    form.reset();
                    form.owner.up('window').close()
                    object.loadOrdGr();

                    Ext.Msg.alert('Сохранение заказа', 'Заказ успешно сохранен: ' + action.result.msg);
                },
                failure: function (form, action) {
                    Ext.Msg.alert('Заказ не сохранен!', action.result.msg);
                }
            });
        } else Ext.Msg.alert(
            'Не все поля заполнены',
            'Откорректируйте информацию')
    },

    /**
     * Сохраняет заказы
     * @param btn Кнопка "Сохранить"
     */
    saveOrdinalOrder: function (btn) {
        var me = this;
        var win = btn.up('ordwin');
        var indexOrg = win.down("textfield[name=orgIndex]");
        var indexDest = win.down("textfield[name=destIndex]");
        var form_ord = win.down('ordform');
        var org = form_ord.down('combocity[name=org]');
        var dest = form_ord.down('combocity[name=dest]');
        if (indexDest.rawValue.length != 0) {
            if (indexDest.rawValue.match(/\d\d\d\d\d\d/) == null) {
                Ext.Msg.alert('Ошибка индекса', 'Не верный формат индекса в поле "Индекс получателя"');
                return;
            }
        }

        if (indexOrg.rawValue.length != 0) {
            if (indexOrg.rawValue.match(/\d\d\d\d\d\d/) == null) {
                Ext.Msg.alert('Ошибка индекса', 'Не верный формат индекса в поле "Индекс отправителя"');
                return;
            }
        }
        if (win.down('button[action=save]').getText() == 'Повторить заказ') {
            form_ord.down('textfield[name=rordnum]').setValue(null);
            form_ord.down('datefield[name=courdate]').setValue(new Date());
        }

        if (dest.value == null) {
            var jsonArrayDes = this.getCityStDesStore().data.items;
            if (jsonArrayDes.length == 0) {
                Ext.Msg.alert('Ошибка ввода города', 'Неверно введен город Получателя! Выберите город из выпадающего списка.');
                return;
            }
            for (var i = 0; i < jsonArrayDes.length; i++) {
                if (jsonArrayDitemclickes[i].get('fname') == Ext.util.Format.trim(dest.getValue())) {
                    dest.setValue(jsonArrayDes[i].data.code);
                    break;
                }
            }
            if (dest.value == null) {
                Ext.Msg.alert('Ошибка ввода города', 'Неверно введен город Получателя! Выберите город из выпадающего списка.');
                return;
            }
        }

        if (org.value == null) {
            var jsonArrayOrg = this.getCityStOrgStore().data.items;
            if (jsonArrayOrg.length == 0) {
                Ext.Msg.alert('Ошибка ввода города', 'Неверно введен город Отправителя! Выберите город из выпадающего списка.');
                return;
            }
            for (var i = 0; i < jsonArrayOrg.length; i++) {
                if (jsonArrayOrg[i].get('fname') == Ext.util.Format.trim(org.getValue())) {
                    org.setValue(jsonArrayOrg[i].data.code);
                    break;
                }
            }
            if (org.value == null) {
                Ext.Msg.alert('Ошибка ввода города', 'Неверно введен город Отправителя! Выберите город из выпадающего списка.');
                return;
            }
        }
        this.checkOrderPayer(form_ord, me);
    },

    monthChange: function (comp, newz) {
        var aTol = comp.up('ordtool');
        var ye = aTol.down('numyear').value;
        this.loadOrds(ye, newz);
    },
    yearChange: function (comp, newz) {
        var aTol = comp.up('ordtool');
        var mo = aTol.down('combomonth').value;
        this.loadOrds(newz, mo);
    },
    fileDel: function (but) {
        var form_lf = but.up('loadfileform');
        var form_ord = this.getOrdForm();
        Ext.Ajax.request({
            url: 'srv/upload.php',
            params: {
                orderNum: form_ord.down('textfield[name=rordnum]').getValue(),
                act: 'del'
            },
            success: function (fp) {
                jData = Ext.decode(fp.responseText);
                form_lf.down('label[name=urlf]').setText('', false);
                form_lf.down('button[action=delete]').hide();
                form_lf.down('filefield[name=uploadFile]').show();
            },
            failure: function () {
                Ext.Msg.alert('error!');
            }
        });
    },
    loadOrdStore: function (st, rec) {
        var isSber = this.getMainPanel().down('label').text.indexOf("СБЕРБАНК-СЕРВИС") > -1;
        if (isSber)
            this.loadOrdStoreSber(st, rec)
        else
            this.loadOrdStoreOrdinal(st, rec)
    },

    loadOrdStoreSber: function (st, rec) {
        var edi = this.getOrdWinSber();
        var form_ord = edi.down('ordformsber');
        form_ord.loadRecord(rec[0]);

        form_ord.down("textfield[name = destIndex]").setRawValue(rec[0].raw['destzip']);
        form_ord.down("textfield[name = orgIndex]").setRawValue(rec[0].raw['orgzip']);
        edi.setTitle('Заказ № ' + rec[0].data['rordnum']);
        var cb_org = form_ord.down('combocity[name=org]');
        cb_org.store.load({
            params: {
                query: cb_org.getValue()
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

    loadOrdStoreOrdinal: function (st, rec) {
        var edi = this.getOrdWin();
        var form_ord = edi.down('ordform');
        form_ord.loadRecord(rec[0]);

        form_ord.down("textfield[name = destIndex]").setRawValue(rec[0].raw['destzip']);
        form_ord.down("textfield[name = orgIndex]").setRawValue(rec[0].raw['orgzip']);
        edi.setTitle('Заказ № ' + rec[0].data['rordnum']);
        var cb_org = form_ord.down('combocity[name=org]');
        cb_org.store.load({
            params: {
                query: cb_org.getValue()
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

    /**
     * Загрузка хранилица заказа
     * @param st Текущее хранилище
     */
    loadOrdersSt: function (st) {
        var tt = this.getOrdTotal();
        tt.down('label').setText('Количество заказов: ' + st.getCount());
    }
});
