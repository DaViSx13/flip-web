Ext.define('FpMnf.controller.Loginform', {
	extend : 'Ext.app.Controller',
	views : ['mainform.Loginform', 'mainform.MainPanel', 'mainform.Loginformcontainer'],
	init : function () {
		this.control({
			'loginform button[action=login]' : {
				click : this.doLogin
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
