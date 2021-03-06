Ext.define('FPClient.controller.Loginform', {
	extend : 'Ext.app.Controller',
	views : ['mainform.Loginform', 'mainform.MainPanel', 'mainform.Loginformcontainer', 'Viewport'],
	stores : ['WbsStore', 'ClientSt'],
	refs : [{
			ref : 'AdmTool',
			selector : 'admtool'
		}
	],
	init : function () {
		this.control({
			'loginform button[action=login]' : {
				click : this.doLogin
			},
			'mainpanel button[action=logout]' : {
				click : this.doLogout
			},
			'loginform textfield' : {
				keypress : this.pressEnter
			}
		});
	},
	pressEnter : function (fild, e) {
		var keyCode = e.getKey();
		if (keyCode == 13) {
			this.doLogin(fild.up('loginform').down('button[action=login]'));
		}
	},
	loadAdmPan : function () {
		var me = this;
		Ext.Ajax.request({
			url : 'srv/data.php',
			params : {
				dbAct : 'GetAgents'
			},
			success : function (response) {
				var text = Ext.decode(response.responseText);
				if (text.success == true) {
					me.getAdmTool().down('comboagent').store.add(text.data);
					//me.getAdmTool().down('comboagent').up('buttongroup').setVisible(true);
					
				} else {
					Ext.Msg.alert('Сервер недоступен!', response.statusText);
				}
			},
			failure : function (response) {
				Ext.Msg.alert('Сервер недоступен!', response.statusText);
			}
		});
	},
	onLaunch : function () {
		var me = this;
		Ext.Ajax.request({
			url : 'srv/launch.php',
			success : function (response) {
				var text = Ext.decode(response.responseText);
				if (text.success == true) {
					var aviewport = Ext.widget('fpmnfviewport');
					aviewport.removeAll(true);
					aviewport.add(Ext.widget('mainpanel'));
					if (text.msg == '-1') {
						me.loadAdmPan();
						aviewport.down('mainpanel').child('#users').tab.show();
						aviewport.down('mainpanel').down('label').setText('WEB Администратор');
						aviewport.down('mainpanel').setActiveTab('users');						
					} else {
						aviewport.down('mainpanel').down('label').setText(text.clientName);
					}
				} else {
					var aviewport = Ext.widget('fpmnfviewport');
				}
			},
			failure : function (response) {
				Ext.Msg.alert('Сервер недоступен!', response.statusText);
			}
		});
	},
	doLogin : function (button) {
		var me = this;
		var form = button.up('form').form;
		if (form.isValid()) {
			form.submit({
				url : 'srv/login.php',
				scope : this,
				success : function (form, action) {
					var aviewport = button.up('viewport');
					aviewport.removeAll(true);
					aviewport.add(Ext.widget('mainpanel'));
					if (action.result.msg == '-1') {
						me.loadAdmPan();
						aviewport.down('mainpanel').child('#users').tab.show();						
						aviewport.down('mainpanel').down('label').setText('WEB Администратор');
						aviewport.down('mainpanel').setActiveTab('users');
					} else {
						aviewport.down('mainpanel').down('label').setText(action.result.clientName);
						this.getClientStStore().load();
						Ext.Ajax.request({
							url : 'srv/data.php',
							params : {
								dbAct : 'GetAgentWbs',
								dir : 'ove',
								newPeriod : ''
							},
							success : function (response) {
								var text = Ext.decode(response.responseText);
								if (text.success == true && text.data.length > 0) {
									Ext.Msg.show({
										title: 'Внимание!',
										msg: 'У Вас есть просроченные накладные в количестве ' + text.data.length + ' шт.!<br/>Для просмотра информации по накладным перейдите в закладку "Накладные" и нажмите вкладку "Просрочено"',
										buttons: Ext.Msg.OK,
										icon: Ext.MessageBox.WARNING
									});									
								}
							},
							failure : function (response) {
								Ext.Msg.alert('Ошибка', 'Сервер недоступен!');
							}
						});
					};
					Ext.TaskManager.start({
						run : function () {
							Ext.Ajax.request({
								url : 'srv/launch.php',
								success : function (response) {
									var text = Ext.decode(response.responseText);
									if (text.success == false) {
										Ext.getDoc().dom.location.reload()
									}
								},
								failure : function (response) {
									Ext.Msg.alert('Ошибка', 'checkSession - Сервер недоступен!: ' + response.statusText);
								}
							});
						},
						interval : 33 * 60 * 1000,
						scope : this
					});
				},
				failure : function (form, action) {
					Ext.Msg.alert('Ошибка', action.result.msg);
				}
			});
		};
	},
	doLogout : function (button) {
		var me = this;
		Ext.Ajax.request({
			url : 'srv/logout.php',
			success : function (response) {
				var text = Ext.decode(response.responseText);
				if (text.success == true) {
					var aviewport = button.up('viewport');
					aviewport.removeAll(true);
					aviewport.add(Ext.widget('loginformcontainer'));
				} else {
					Ext.Msg.alert('Ошибка!', 'Обновите страницу');
				}
			},
			failure : function (response) {
				Ext.Msg.alert('Сервер недоступен!', response.statusText);
			}
		});
	}
});
