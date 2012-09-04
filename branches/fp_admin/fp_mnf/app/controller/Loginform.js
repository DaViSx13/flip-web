Ext.define('FpMnf.controller.Loginform', {
	extend : 'Ext.app.Controller',
	views : ['mainform.Loginform', 'mainform.MainPanel', 'mainform.Loginformcontainer'],
	//models: ['Courier'],
	/*refs: [{
	ref: 'infoPanel',
	selector: 'info'
	}],*/
	init : function () {
		//console.log('Initialized LoginForm');
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
					/*FpMnf.model.Courier.load(0, {
					scope: this,
					success: function(cour) {
					this.getInfoPanel().setTitle("Курьер : " + cour.get('name'));
					}
					})*/
				},
				failure : function (form, action) {
					Ext.Msg.alert('Ошибка', action.result.msg);
				}
			});
		}
	}
});
