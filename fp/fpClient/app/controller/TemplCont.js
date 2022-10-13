Ext.define('FPClient.controller.TemplCont', {
    extend: 'Ext.app.Controller',
    views: [
            'orders.TemplForm',
            'orders.TemplWin',
            'orders.TemplGrid',
            'orders.TemplFormImport',
            'orders.TemplWinImport'],
    models: ['TemplMod'],
    stores: [
            'TemplSt',
            'ClientSt'],
    refs: [{
        ref: 'TemplForm',
        selector: 'templform'
    }, {
        ref: 'TemplTool',
        selector: 'templtool'
    }, {
        ref: 'TemplWinImport',
        selector: 'templwinimport'
    }],
    init: function () {
        this.control({
            'templtool button[action=newtpl]': {
                click: this.clkNew
            },
            'templtool button[action=edittpl]': {
                click: this.clkEdit
            },
            'templwin button[action=save]': {
                click: this.saveTempl
            },
            'templtool button[action=deltpl]': {
                click: this.delTempl
            },
            'templgrid > tableview': {
                itemdblclick: this.dblclickTpl
            },
            'templwinimport button[action=excelTmlExcel]': {
                click: this.getTemplateImportExcel
            },
            'templtool button[action = importFromExcel]': {
                click: this.importTemplates
            },
            'templtool button[action=export]' : {
                click : this.exportTemplates
            },
            'templwinimport button[action=import]' : {
                click: this.importTemplate
            },
            'textfield[name=filterByName]': {
                "change" : this.searchByNameEvent
            }
        });
    },


    /**
     * Фильтрация по наименованию шаблонов.
     * @param component Поле наименование
     * @param newValue Новое значение
     */
    searchByNameEvent : function(component, newValue) {
        var grid = component.up("tabpanel").down("grid");
        if(newValue.length === 0)
            grid.getStore().clearFilter();
        else
            grid.getStore().filterBy(function (record) {
                var found = false;
                for(var i in record.getData()) {
                    if(record.get(i) != null)
                        found = record.get(i).toString().toLowerCase().includes(newValue.toLowerCase());
                    if(found)
                        break;
                }
                return found;
            })
    },

    /**
     * Экспорт шаблонов.
     */
    exportTemplates: function() {
        window.open('srv/export/exportTemplates.php', '_blank');
    },

    /**
     * Импорт шаблонов из файлов.
     */
    importTemplates: function() {
        var win = Ext.widget('templwinimport');
        win.show();
    },

    /**
     * Импорт шаблонов.
     */
    importTemplate: function (button) {
        var win = button.up('templwinimport');
        var form_imp = win.down('templformimport');
        if (form_imp.getForm().isValid() && form_imp.down('filefield[name=uploadFile]').getValue()) {
            form_imp.submit({
                url: 'srv/import_2/import.php',
                waitMsg: 'Обработка файла...',
                params: {
                    act: 'importTemplate'
                },
                success: function (result, answer) {
                    if(answer.result.success) {
                        window.open(window.location.href + '/srv/import_2/file_get.php?file=' + answer.result.message, '_blank');
                        Ext.Msg.alert(
                            'Результат импорта',
                            'Данные успешно обработаны. Подробный результат импорта находятся в загружаемом файле!',
                            function () {
                                win.close();
                            });
                    } else {
                        Ext.Msg.alert(
                            'Ошибка!',
                            'Не удалось импортировать данные. Сообщение - ' + answer.result.message);
                    }
                },
                failure: function (result, answer) {
                    Ext.Msg.alert('Ошибка!', 'Не удалось импортировать данные. Сообщение - ' + answer.result.message);
                }
            });
        }
    },

    /**
     * Получение примера айла для заполнения импорта шаблонов.
     */
    getTemplateImportExcel: function () {
        window.open('srv/import_2/templates/Example_import_Template.xlsx', '_blank');
    },

    dblclickTpl: function (gr, rec) {
        this.clkEdit(this.getTemplTool().down('button[action=edittpl]'));
    }
    ,
    clkNew: function (btn) {
        var win = Ext.widget('templwin');
        win.show();
        win.down('templform').down('textfield[name=templatename]').focus(false, true);

        //auto sender begin
        client = this.getClientStStore().first();
        //мухлеж
        client.set('org', client.get('city'));
        client.set('orgcode', client.get('cityid'));

        //console.log(client);

        formt = win.down('templform');
        formt.loadRecord(client);

        var cb_org = formt.down('combocity[name=org]');
        cb_org.store.load({
            params: {
                query: client.get('org')
            }
        });
        cb_org.select(client.get('orgcode'));
        //auto sender end

    }
    ,
    delTempl: function (btn) {
        var me = this;
        var sm = btn.up('templgrid').getSelectionModel();
        if (sm.getCount() > 0) {
            Ext.Ajax.request({
                url: 'srv/data.php',
                params: {
                    dbAct: 'DelAgTemplates',
                    id: sm.getSelection()[0].get('id')
                },
                success: function (response) {
                    jData = Ext.decode(response.responseText);
                    Ext.Msg.alert('Успешное удаление!', 'Шаблон удален: ' + jData.msg);
                    me.getTemplStStore().reload();
                },
                failure: function (response) {
                    jData = Ext.decode(response.responseText);
                    Ext.Msg.alert('Ошибка!', 'Не удалось удалить шаблон: ' + jData.msg);
                }
            });
        } else {
            Ext.Msg.alert('Внимание!', 'Выберите шаблон для удаления');
        }
    }
    ,
    clkEdit: function (btn) {
        var sm = btn.up('templgrid').getSelectionModel();
        if (sm.getCount() > 0) {
            var win = Ext.widget('templwin');
            var form = win.down('templform');
            var record = sm.getSelection()[0];
            form.loadRecord(record);

            var cb_org = form.down('combocity[name=org]');
            cb_org.store.load({
                params: {
                    query: cb_org.getValue()
                }
            });
            cb_org.select(record.data['orgcode']);

            var cb_des = form.down('combocity[name=dest]');
            cb_des.store.load({
                params: {
                    query: cb_des.getValue()
                }
            });
            cb_des.select(record.data['destcode']);
            form.down('textfield[name=templatename]').focus(false, true);
        } else {
            Ext.Msg.alert('Внимание!', 'Выберите шаблон для редактирования');
        }
    }
    ,
    saveTempl: function (btn) {
        var me = this;
        var win = btn.up('templwin');
        var form_ord = win.down('templform');
        //var org = form_ord.down('combocity[name=org]');
        var dest = form_ord.down('combocity[name=dest]');
        /*if (org.value == null) {
            var jsonArrayOrg = this.getCityStOrgStore().data.items;
            if (jsonArrayOrg.length == 0) {
                Ext.Msg.alert('Ошибка ввода города', 'Неверно введен город Отправителя! Выберите город из выпадающего списка.');
                return;
            };
            for (var i = 0; i < jsonArrayOrg.length; i++) {
                if (jsonArrayOrg[i].get('fname') == Ext.util.Format.trim(org.getValue())) {
                    org.setValue(jsonArrayOrg[i].data.code);
                    break;
                };
            };
            if (org.value == null) {
                Ext.Msg.alert('Ошибка ввода города', 'Неверно введен город Отправителя! Выберите город из выпадающего списка.');
                return;
            };
        }*/
        if (dest.value == null) {
            var jsonArrayDes = this.getCityStDesStore().data.items;
            if (jsonArrayDes.length == 0) {
                Ext.Msg.alert('Ошибка ввода города', 'Неверно введен город Получателя! Выберите город из выпадающего списка.');
                return;
            }
            ;
            for (var i = 0; i < jsonArrayDes.length; i++) {
                if (jsonArrayDes[i].get('fname') == Ext.util.Format.trim(dest.getValue())) {
                    dest.setValue(jsonArrayDes[i].data.code);
                    break;
                }
                ;
            }
            ;
            if (dest.value == null) {
                Ext.Msg.alert('Ошибка ввода города', 'Неверно введен город Получателя! Выберите город из выпадающего списка.');
                return;
            }
            ;
        }
        if (form_ord.getForm().isValid()) {
            form_ord.submit({
                url: 'srv/data.php',
                params: {
                    dbAct: 'SetAgTemplates'
                },
                submitEmptyText: false,
                success: function (form, action) {
                    form.reset();
                    me.getTemplForm().up('templwin').close();
                    me.getTemplStStore().reload();
                    Ext.Msg.alert('Шаблон сохранен!', 'Сохранение шаблона заказа прошло успешно ' + action.result.msg);
                },
                failure: function (form, action) {
                    Ext.Msg.alert('Ошибка сохранения', 'Шаблон заказа не сохранен! ' + action.result.msg);
                }
            });
        } else {
            Ext.Msg.alert('Не все поля заполнены', 'Откорректируйте информацию')
        }
    }
})
;
