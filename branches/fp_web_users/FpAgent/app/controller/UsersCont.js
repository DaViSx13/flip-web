Ext.define('FPAgent.controller.UsersCont', {
	extend : 'Ext.app.Controller',
	views : ['users.UsersGrid', 'users.UsersWin', 'users.UsersForm', 'users.UsersTool', 'mainform.MainPanel'],
	models : ['UsersMod', 'AgentsMod'],
	stores : ['UsersSt', 'AgentsListSt'],
	refs : [{
			ref : 'AdmTool',
			selector : 'admtool'
		}, {
			ref : 'UsersGrid',
			selector : 'usersgrid'
		}, {
			ref : 'UsersForm',
			selector : 'usersform'
		}, {
			ref : 'UsersTool',
			selector : 'userstool'
		}
	],
	init : function () {
		this.control({
			'mainpanel' : {
				tabchange : this.loadUsers
			},
			'userstool button[action=new]' : {
				click : this.newUser
			},
			'usersgrid > tableview' : {
				itemdblclick : this.editUser
			},
			'userswin button[action=save]' : {
				click : this.saveUsers
			},
			'userstool button[action=active]' : {
				click : this.isLocked
			},
			'usersgrid' : {
				selectionchange : this.isScroll
			}
		});
	},
	loadUsers : function (ThePanel, newCard) {
		if (newCard.xtype == 'usersgrid') {
			this.getUsersStStore().load();
			this.getAgentsListStStore().load();
			this.getAdmTool().down('buttongroup[itemId=admgroup]').setVisible(false);
			this.getAdmTool().down('button[action=list]').setVisible(false);
			this.getAdmTool().down('button[action=templ]').setVisible(false);
		}
	},
	isScroll : function (gr, rec) {
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
	isLocked : function (but) {
		var me = this;
		var sm = this.getUsersGrid().getSelectionModel();
		if (sm.getCount() > 0) {
			Ext.Ajax.request({
				url : 'srv/data.php',
				params : {
					dbAct : 'setActive',
					active : sm.getSelection()[0].get('active'),
					id : sm.getSelection()[0].get('id')
				},
				success : function (response) {
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
				failure : function (response) {
					Ext.Msg.alert('Сервер недоступен!', response.statusText);
				}
			});
		} else {
			Ext.Msg.alert('Выберите запись', 'Запись не выбрана')
		}
	},
	newUser : function (but) {
		Ext.widget('userswin').show();
		this.getUsersForm().down('textfield[name=id]').setValue(0);
	},
	editUser : function (me, rec) {
		var sm = this.getUsersGrid().getSelectionModel();
		if (sm.getCount() > 0) {
			if (rec.get('active') > 0) {
				var w = Ext.widget('userswin');
				w.setTitle('Редактирование пользователя:  ' + rec.get('auser'));
				w.show();
				var f = this.getUsersForm();
				f.loadRecord(rec);
				f.down('textfield[name=agents]').setReadOnly(true);
			} else {
				Ext.Msg.alert('Запись блокирована', 'Разблокируйте запись перед внесением корректировок')
			}
		} else {
			Ext.Msg.alert('Выберите запись', 'Выберите запись для редактирования')
		}
	},
	saveUsers : function (btn) {
		var me = this;
		var win = btn.up('userswin');
		var form = win.down('usersform');
		if (form.getForm().findField('passfirst').getValue() == form.getForm().findField('passsecond').getValue()) {
			if (form.getForm().isValid()) {
				function showResult(btn) {
					if (btn == 'yes') {
						form.submit({
							url : 'srv/data.php',
							params : {
								dbAct : 'setUsers'
							},
							submitEmptyText : false,
							success : function (form, action) {
								if (action.result.success == true) {
									if (form.getValues()['id'] > 0) {
										var rec = me.getUsersStStore().findRecord('id', form.getValues()['id']);
										rec.set('auser', form.getValues()['auser']);
										me.getUsersGrid().getSelectionModel().select(rec);
									} else {
									me.getUsersStStore().load();
									}
									form.reset();
									win.close();
								}
							},
							failure : function (form, action) {
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
						title : 'Сохранить изменения?',
						msg : '<p>Агент: "<font size="2" color="blue">' + form.getForm().findField('agents').getRawValue() + '</font>".</p>  <p>Логин: "<font size="2" color="blue">' + form.getForm().findField('auser').getValue() + '</font>".</p>  <p>Сохранить?</p>',
						buttons : Ext.Msg.YESNOCANCEL,
						fn : showResult,
						icon : Ext.Msg.QUESTION
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
