Ext.define('Courier.controller.Loginform', {
	extend : 'Ext.app.Controller',
	views : ['Loginform', 'UchetList', 'Loginformcontainer', 'Info', 'Actions'],
	refs : [{
			ref : 'Info',
			selector : 'info'
		}, {
			ref : 'Actions',
			selector : 'actions'
		}
	],
	
	init : function () {
		this.control({
			'loginform button[action=login]' : {
				click : this.doLogin
			},
			'actions button[action=logout]' : {
				click : this.confirmLogout
			}
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
						aviewport.add(Ext.widget('uchetlist'));
						this.getInfo().down('label').setText("Курьер : " + action.result.username);
						
						var courId = action.result.msg;
						var courDate = Ext.Date.format(new Date(), 'Ymd');
						var storedId = localStorage.getItem('courId');
						var storedDate = localStorage.getItem('courDate');
						if (courId != storedId || courDate != storedDate) {
							localStorage.setItem('courId', courId);
							localStorage.setItem('courDate', courDate);
							localStorage.setItem('courClearStorage', true);
						}
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
	
	confirmLogout : function (outbutton) {
		Ext.Msg.confirm('Выход', 'Вы хотите выйти?', function (button) {
			if (button === 'yes') {
				this.doLogout(outbutton);
			}
		},
			this);
	},
	
	doLogout : function (button) {
		Ext.Ajax.request({
			url : 'data/logout.php',
			success : function (response) {
				var text = Ext.decode(response.responseText);
				if (text.success == true) {
					Ext.TaskManager.stopAll();
					var aviewport = button.up('viewport'); //Ext.ComponentQuery.query('viewport');
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
