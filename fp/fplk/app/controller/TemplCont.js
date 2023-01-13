Ext.define('fplk.controller.TemplCont', {
    extend: 'Ext.app.Controller',
    views: ['orders.TemplForm', 'orders.TemplFormImport', 'orders.TemplWin', 'orders.TemplGrid', 'orders.TemplWinImport'],
    models: ['TemplMod'],
    stores: ['TemplSt', 'ClientSt'],
    refs: [{
        ref: 'TemplForm',
        selector: 'templform'
    }, {
        ref: 'TemplTool',
        selector: 'templtool'
    }, {
        ref: 'TemplWinImport',
        selector: 'templwinimport'
    }, {
        ref: 'TemplFormImport',
        selector: 'templformimport'
    }
    ],
    init: function () {
        this.control({
            'templwinimport button[action=excelTmlExcel]': {
                click: this.getTemplateImportExcel
            },
            'templwinimport button[action=import]': {
                click: this.importTemplate
            },
            'templtool button[action=newtpl]': {
                click: this.clkNew
            },
            'templtool button[action=importFromExcel]': {
                click: this.importTemplates
            },
            'templtool button[action=export]': {
                click: this.exportTemplates
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
            'textfield[name=filterByName]': {
                "change": this.searchByNameEvent
            },
            'templwin button[action=swap]': {
                click: this.swapFields
            }
        });
    },


    /**
     * Меняет информацию о получателе/отправителе местами.
     * @param swapButton Кнопка "Поменять"
     */
    swapFields: function (swapButton) {
        var templateWindow = swapButton.up('templwin');
        var templateForm = templateWindow.down('templform');

        templateForm.down('textfield[name=templatename]').reset();
        templateForm.down('textfield[name=id]').reset();
        var senderInfo = this.getSenderInfo(templateForm);
        var receiverInfo = this.getReceiverInfo(templateForm);
        this.setSenderInfo(templateForm, receiverInfo);
        this.setReceiverInfo(templateForm, senderInfo)
    },

    /**
     * Заполняет информацию о получатиле.
     *
     * @param templateForm Форма шаблона
     * @param info Массив с информацией
     */
    setReceiverInfo: function (templateForm, info) {
        templateForm.down('textfield[name = dest]').reset();
        templateForm.down('textfield[name = dest]').getStore().load({
            params: {
                query: info[7]
            }
        });

        templateForm.down('textfield[name = dest]').setValue(info[0]);
        templateForm.down('textfield[name = dname]').setValue(info[1]);
        templateForm.down('textfield[name = dadr]').setValue(info[2]);
        templateForm.down('textfield[name = dcontname]').setValue(info[3]);
        templateForm.down('textfield[name = dcontmail]').setValue(info[4]);
        templateForm.down('textfield[name = dcontphone]').setValue(info[5]);
        templateForm.down('textfield[name = destrems]').setValue(info[6]);
    },

    /**
     * Заполняет информацию об отправителе.
     *
     * @param templateForm Форма шаблона
     * @param info Массив с информацией
     */
    setSenderInfo: function (templateForm, info) {
        templateForm.down('textfield[name = org]').reset();
        templateForm.down('textfield[name = org]').getStore().load({
            params: {
                query: info[7]
            }
        });

        templateForm.down('textfield[name = org]').setValue(info[0]);
        templateForm.down('textfield[name = cname]').setValue(info[1]);
        templateForm.down('textfield[name = address]').setValue(info[2]);
        templateForm.down('textfield[name = contname]').setValue(info[3]);
        templateForm.down('textfield[name = contmail]').setValue(info[4]);
        templateForm.down('textfield[name = contphone]').setValue(info[5]);
        templateForm.down('textfield[name = orgrems]').setValue(info[6]);
    },

    /**
     * Получает иформацию об отправителе в шаблоне.
     *
     * Информация предоставляется в виде массива:
     * [
     *        ORG,
     *        Имя,
     *        Адресс,
     *        Контактное лицо,
     *        EMAIL,
     *        Телефон,
     *        Примечание
     * ]
     *
     * @param templateForm Форма заполнения шаблона
     * @returns {*[]} Массив с информацией.
     */
    getSenderInfo: function (templateForm) {
        return [
            templateForm.down('textfield[name = org]').getValue(),
            templateForm.down('textfield[name = cname]').getValue(),
            templateForm.down('textfield[name = address]').getValue(),
            templateForm.down('textfield[name = contname]').getValue(),
            templateForm.down('textfield[name = contmail]').getValue(),
            templateForm.down('textfield[name = contphone]').getValue(),
            templateForm.down('textfield[name = orgrems]').getValue(),
            templateForm.down('textfield[name = org]').getRawValue()
        ];
    },

    /**
     * Получает иформацию о получателе в шаблоне.
     *
     * Информация предоставляется в виде массива:
     * [
     *        ORG,
     *        Имя,
     *        Адресс,
     *        Контактное лицо,
     *        EMAIL,
     *        Телефон,
     *        Примечание
     * ]
     *
     * @param templateForm Форма заполнения шаблона
     * @returns {*[]} Массив с информацией.
     */
    getReceiverInfo: function (templateForm) {
        return [
            templateForm.down('textfield[name = dest]').getValue(),
            templateForm.down('textfield[name = dname]').getValue(),
            templateForm.down('textfield[name = dadr]').getValue(),
            templateForm.down('textfield[name = dcontname]').getValue(),
            templateForm.down('textfield[name = dcontmail]').getValue(),
            templateForm.down('textfield[name = dcontphone]').getValue(),
            templateForm.down('textfield[name = destrems]').getValue(),
            templateForm.down('textfield[name = dest]').getRawValue()
        ];
    },

    /**
     * Экспорт шаблонов.
     */
    exportTemplates: function () {
        window.open('srv/export/exportTemplates.php', '_blank');
    },

    /**
     * Импорт шаблонов.
     */
    importTemplate: function (button) {
        var me = this;
        var win = button.up('templwinimport');
        var form_imp = win.down('templformimport');
        if (form_imp.getForm().isValid() && form_imp.down('filefield[name=uploadFile]').getValue()) {
            form_imp.submit({
                url: 'srv/import/import.php',
                params: {
                    act: 'importTemplate'
                },
                success: function (form, action) {
                    me.getTemplStStore().reload();
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
     * Получение примера айла для заполнения ипорта шаблонов.
     */
    getTemplateImportExcel: function () {
        window.open('srv/import/Example_import_Template.xlsx', '_blank');
    },

    /**
     * Импорт шаблонов из файлов.
     */
    importTemplates: function () {
        var win = Ext.widget('templwinimport');
        win.show();
    },

    /**
     * Фильтрация по наименованию шаблонов.
     * @param component Поле наименование
     * @param newValue Новое значение
     */
    searchByNameEvent: function (component, newValue) {
        var grid = component.up("tabpanel").down("grid");
        if (newValue.length == 0)
            grid.getStore().clearFilter();
        else
            grid.getStore().filterBy(function (record) {
                var found = false;
                for (var i in record.getData()) {
                    if (record.get(i) != null)
                        found = record.get(i).toString().toLowerCase().includes(newValue.toLowerCase());
                    if (found)
                        break;
                }
                return found;
            })
    },

    dblclickTpl: function (gr, rec) {
        this.clkEdit(this.getTemplTool().down('button[action=edittpl]'));
    },
    clkNew: function (btn) {
        var win = Ext.widget('templwin');
        win.show();
        win.down('templform').down('textfield[name=templatename]').focus(false, true);
        if (this.getClientStStore().getCount() > 0) {
            //auto sender begin
            client = this.getClientStStore().first();
            //мухлеж
            client.set('org', client.get('city'));
            client.set('orgcode', client.get('cityid'));

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
    },
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
    },
    clkEdit: function (btn) {
        var sm = btn.up('templgrid').getSelectionModel();
        if (sm.getCount() > 0) {
            var win = Ext.widget('templwin');
            var form = win.down('templform');
            win.down('button[action=swap]').setVisible(true);
            var record = sm.getSelection()[0];
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
            form.down('textfield[name=templatename]').focus(false, true);
        } else {
            Ext.Msg.alert('Внимание!', 'Выберите шаблон для редактирования');
        }
    },
    saveTempl: function (btn) {
        var me = this;
        var win = btn.up('templwin');
        var form_ord = win.down('templform');
        var dest = form_ord.down('combocity[name=dest]');

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
});
