Ext.define('FpMnf.controller.Loginform', {
	extend : 'Ext.app.Controller',
	views : ['mainform.Loginform', 'mainform.MainPanel', 'mainform.Loginformcontainer', 'Viewport'],
	init : function () {
		this.control({
			'loginform button[action=login]' : {
				click : this.doLogin
			}
		});
		
	},
	onLaunch : function () {
		
		Ext.Ajax.request({
			url : 'srv/launch.php',
			success : function (response) {
				var text = Ext.decode(response.responseText);
				if (text.success == true) {
					
					var aviewport = Ext.widget('fpmnfviewport');
					aviewport.removeAll(true);
					aviewport.add(Ext.widget('mainpanel'));
					
				} else {
					var aviewport = Ext.widget('fpmnfviewport');
					//aviewport.removeAll(true);
					//aviewport.add(Ext.widget('loginformcontainer'));
					
				}
			},
			failure : function (response) {
				
				Ext.Msg.alert('Сервер недоступен!', response.statusText);
			}
		});
	},
	doLogin : function (button) {
		var form = button.up('form').form;
		if (form.isValid()) {
			form.submit({
				url : 'srv/login.php',
				scope : this,
				success : function (form, action) {
					var aviewport = button.up('viewport');
					aviewport.removeAll(true);
					aviewport.add(Ext.widget('mainpanel'));
				},
				failure : function (form, action) {
					Ext.Msg.alert('Ошибка', action.result.msg);
				}
			});
		}
	}
});
