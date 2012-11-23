Ext.define('Courier.controller.Loginform', {
	extend : 'Ext.app.Controller',
	views : ['Loginform', 'Main', 'Loginformcontainer'],
	models : ['Courier'],
	refs : [{
			ref : 'Info',
			selector : 'info'
		}
	],
	init : function () {
		//console.log('Initialized LoginForm');
		this.control({
			'loginform button[action=login]' : {
				click : this.doLogin
			},
			'main button[action=logout]' : {
				click : this.doLogout
			},
		});
	},
	doLogin : function (button) {
		var form = button.up('form').form;
		if (form.isValid()) {
			form.submit({
				url : 'data/login.php',
				scope : this,
				success : function (form, action) {
					if (action.result.success == true) {
						var aviewport = button.up('viewport');
						aviewport.removeAll(true);
						aviewport.add(Ext.widget('main'));
						this.getInfo().down('label').setText("Курьер : " + action.result.username);
						/*Courier.model.Courier.load(0, {
						scope : this,
						success : function (cour) {
							this.getInfo().down('label').setText("Курьер : " + cour.get('name'));
						}
						})*/
					} else {
						Ext.Msg.alert('Внимание', action.result.msg);
					}
				},
				failure : function (form, action) {
					Ext.Msg.alert('Ошибка', action.result.msg);
				}
			});
		}
	},
	doLogout : function (button) {
		var me = this;
		Ext.Ajax.request({
			url : 'data/logout.php',
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
