Ext.define('FPClient.controller.UsersCont', {
    extend: 'Ext.app.Controller',
    views: [
		'users.UsersGrid',
		'users.UsersWin',
		'users.UsersForm',
		'users.UsersTool',
		'mainform.MainPanel',
		'users.imports.ImportUsersWin',
		'users.imports.ImportUsersForm'],
    models: [
		'UsersMod',
		'AgentsMod'],
    stores: [
		'UsersSt',
		'AgentsListSt'],
    refs: [{
        ref: 'AdmTool',
        selector: 'admtool'
    }, {
        ref: 'UsersGrid',
        selector: 'usersgrid'
    }, {
        ref: 'UsersForm',
        selector: 'usersform'
    }, {
        ref: 'UsersTool',
        selector: 'userstool'
    }, {
        ref: 'ImportUsersForm',
        selector: 'importuserform'
    }, {
        ref: 'ImportUsersWin',
        selector: 'importUserWin'
    }],
    init: function () {
        this.control({
            'mainpanel': {
                tabchange: this.loadUsers
            },
            'userstool button[action=new]': {
                click: this.newUser
            },
            'usersgrid > tableview': {
                itemdblclick: this.editUser
            },
            'userswin button[action=save]': {
                click: this.saveUsers
            },
            'userstool button[action=active]': {
                click: this.isLocked
            },
            'usersgrid': {
                selectionchange: this.isScroll
            },
            'usersform > #changepass': {
                change: this.changePass
            },
            'userstool checkbox[name=showBlocked]': {
                change: this.showHideBlocked
            },
            'userstool textfield[name=userSearch]': {
                change: this.searchUser
            },
            'userstool button[action=import]': {
                click: this.openImportUsersWin
            },
            'importUserWin button[action=imp]': {
                click: this.importUsers
            }
        });
    },

	/**
	 * Импорт пользователей
	 * @param importButton {Ext.button.Button} Кнопка "Импорт пользователей"
	 */
	importUsers:function (importButton) {
		var me = this;
		var win = importButton.up('importUserWin');
		var form = win.down('importuserform');
		if (form.getForm().isValid() && form.down('filefield[name=uploadFile]').getValue()) {
			form.submit({
				url : 'srv/import/import.php',
				params : {
					act : 'importUsers'
				},
				success : function (form, action) {

					var grid = me.getUsersGrid();
					var store = grid.getStore();
					store.load();
					win.close();
					Ext.Msg.alert('Импортирование завершено успешно!', action.result.msg);
				},
				failure : function (form, action) {
					Ext.Msg.alert('Ошибка импорта!', action.result.msg);
				}
			});
		}
	},

    /**
     * Открытие окна "Импорт пользователей"
     */
	openImportUsersWin: function () {
		Ext.widget('importUserWin').show();
	},

    /**
     * Поиск пользователя.
     * Событие: Измененеие текста в Поле "Поиск пользователя"
     *
     * @param textfield Фильтр "Поиск пользователя"
     * @param newValue Текущее значение
     */
    searchUser: function (textfield, newValue) {
        var grid = this.getUsersGrid();
        var store = grid.getStore();
        var usernameFilter = this.getUsernameFilter(newValue);
        if (newValue.length !== 0) {
            store.filters.add(usernameFilter);
        } else {
            store.filters.removeAtKey('usernameFilter');
        }

        store.load();
    },

    /**
     * Показывает/скрывает блокированных функций.
     * Событие: Изменение значения checkbox "Показать блокированных".
     *
     * @param checkbox Фильтр
     * @param newValue Текущее значение фильтра
     */
    showHideBlocked: function (checkbox, newValue) {
        var grid = this.getUsersGrid();
        var store = grid.getStore();
        var blockedFilter = this.getBlockedFilter();
        if (!newValue) {
            store.filters.add(blockedFilter);
        } else {
            store.filters.removeAtKey('blockedFilter');
        }

        store.load();
    },

    /**
     * Получает фильтр по полю "aUser" (Login).
     * @param value Значение из поля "Поиск пользователя"
     * @returns Ext.utils.Filter Фильтр
     */
    getUsernameFilter: function (value) {
        return new Ext.util.Filter({
            id: 'usernameFilter',
            filterFn: function (item) {
                return item.get('auser').indexOf(value) !== -1
            }
        });
    },

    /**
     * Получает фильтр по полю "Показать блокированных"
     *
     * @returns Ext.utils.Filter Фильтр
     */
    getBlockedFilter: function () {
        return new Ext.util.Filter({
            id: 'blockedFilter',
            filterFn: function (item) {
                return item.get('active') > 0
            }
        });
    },

    /**
     * Изменяет пароль пользователя.
     * Событие: Нажатие на checkbox "Сменить пароль"
     *
     * @param cb Поле "Сменить пароль"
     * @param newValue Текущее значение поля
     */
    changePass: function (cb, newValue) {
        var f = this.getUsersForm();
        if (newValue) {
            f.down('textfield[name=passfirst]').enable();
            f.down('textfield[name=passsecond]').enable();
        } else {
            f.down('textfield[name=passfirst]').disable();
            f.down('textfield[name=passsecond]').disable();
        }
    },

    /**
     * Загружает данные таблицы "Пользователи"
     * По умолчанию, скрыты блокированные пользователи.
     *
     * @param ThePanel Контент
     * @param newCard Новая карточка
     */
    loadUsers: function (ThePanel, newCard) {
        if (newCard.xtype == 'usersgrid') {
            var store = this.getUsersStStore();
            store.filters.add('blockedFilter', this.getBlockedFilter());
            store.load();
            this.getAgentsListStStore().load();
            this.getAdmTool().down('buttongroup[itemId=admgroup]').setVisible(false);
            this.getAdmTool().down('button[action=list]').setVisible(false);
            this.getAdmTool().down('button[action=templ]').setVisible(false);
        }
    },
    isScroll: function (gr, rec) {
        if (gr.isSelected(rec[0]) == true) {
            var but = this.getUsersTool().down('button[action=active]');
            if (rec[0].get('active') == 1) {
                but.setIconCls('redusr');
                but.setText('Блокировать');
            } else {
                but.setIconCls('greusr');
                but.setText('Разблокировать');
            }
        }
    },
    isLocked: function (but) {
        var me = this;
        var sm = this.getUsersGrid().getSelectionModel();
        if (sm.getCount() > 0) {
            Ext.Ajax.request({
                url: 'srv/data.php',
                params: {
                    dbAct: 'setActive',
                    active: sm.getSelection()[0].get('active'),
                    id: sm.getSelection()[0].get('id')
                },
                success: function (response) {
                    var text = Ext.decode(response.responseText);
                    var rec = me.getUsersStStore().findRecord('id', sm.getSelection()[0].get('id'));
                    if (sm.getSelection()[0].get('active') > 0) {
                        rec.set('active', 0);
                    } else {
                        rec.set('active', 1);
                    }
                    me.getUsersGrid().getSelectionModel().select(0);
                    me.getUsersGrid().getSelectionModel().select(rec);
                },
                failure: function (response) {
                    Ext.Msg.alert('Сервер недоступен!', response.statusText);
                }
            });
        } else {
            Ext.Msg.alert('Выберите запись', 'Запись не выбрана')
        }
    },
    newUser: function (but) {
        Ext.widget('userswin').show();
        this.getUsersForm().down('textfield[name=id]').setValue(0);
    },
    editUser: function (me, rec) {
        var sm = this.getUsersGrid().getSelectionModel();
        if (sm.getCount() > 0) {
            if (rec.get('active') > 0) {
                var w = Ext.widget('userswin');
                w.setTitle('Редактирование пользователя:  ' + rec.get('auser'));
                w.show();
                var f = this.getUsersForm();

                f.down('#changepass').show();
                f.down('textfield[name=passfirst]').disable();
                f.down('textfield[name=passsecond]').disable();

                f.loadRecord(rec);
                //f.down('textfield[name=agents]').setReadOnly(true);
            } else {
                Ext.Msg.alert('Запись блокирована', 'Разблокируйте запись перед внесением корректировок')
            }
        } else {
            Ext.Msg.alert('Выберите запись', 'Выберите запись для редактирования')
        }
    },
    saveUsers: function (btn) {
        var me = this;
        var win = btn.up('userswin');
        var form = win.down('usersform');

        var invalidSymbols = [
            '+',
            '-',
            '?',
            '*',
            '/',
            '=',
            ')',
            '(',
            '*',
            '&',
            ',',
            '^',
            '%',
            '$',
            '№',
            '@',
            '!',
            '"',
            '#',
            ';'
        ]

        var wrongSymbol = "";
        var loginValue = form.getForm().findField('auser').getValue();

        if (loginValue.length > 0) {
            invalidSymbols.forEach(function (item, i, arr) {
                if (loginValue.indexOf(item) > -1) {
                    wrongSymbol = item;
                    return;
                }
            });

            if (wrongSymbol != "") {
                Ext.Msg.alert('Обнаружены недопустимые символы', 'Найден символ "' + wrongSymbol + '"');
                return;
            }
        }

        if (form.getForm().findField('passfirst').getValue() == form.getForm().findField('passsecond').getValue()) {
            if (form.getForm().isValid()) {
                function showResult(btn) {
                    if (btn == 'yes') {
                        form.submit({
                            url: 'srv/data.php',
                            params: {
                                dbAct: 'setUsers'
                            },
                            submitEmptyText: false,
                            success: function (form, action) {
                                if (action.result.success == true) {
                                    if (form.getValues()['id'] > 0) {
                                        var rec = me.getUsersStStore().findRecord('id', form.getValues()['id']);
                                        rec.set('auser', form.getValues()['auser']);
                                        me.getUsersStStore().load();
                                        me.getUsersGrid().getSelectionModel().select(rec);
                                    } else {
                                        me.getUsersStStore().load();
                                    }
                                    form.reset();
                                    win.close();
                                }
                            },
                            failure: function (form, action) {
                                Ext.Msg.alert('не сохранено!', action.result.msg);
                            }
                        });
                    }
                    if (btn == 'no') {
                        form.getForm().reset();
                        win.close();
                    }
                };
                if (form.getForm().findField('id').getValue() == 0) {
                    Ext.Msg.show({
                        title: 'Сохранить изменения?',
                        msg: '<p>Агент: "<font size="2" color="blue">' + form.getForm().findField('agents').getRawValue() + '</font>".</p>  <p>Логин: "<font size="2" color="blue">' + form.getForm().findField('auser').getValue() + '</font>".</p>  <p>Сохранить?</p>',
                        buttons: Ext.Msg.YESNOCANCEL,
                        fn: showResult,
                        icon: Ext.Msg.QUESTION
                    });
                } else {
                    showResult('yes');
                }
            } else {
                Ext.Msg.alert('Не все поля заполнены', 'Откорректируйте информацию')
            }
        } else {
            Ext.Msg.alert('Пароли не совпадают', 'Введите идентичные пароли')
        }
    }
});
