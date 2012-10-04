Ext.define('Courier.controller.Loginform', {
	extend: 'Ext.app.Controller',
	views: ['Loginform', 'Main', 'Loginformcontainer'],
	models: ['Courier'],
	refs: [{
		ref: 'Info',
		selector: 'info'
	}],
	init: function() {
		//console.log('Initialized LoginForm');
		this.control({
			'loginform button[action=login]': {
				click: this.doLogin
			}
		});
	},
	doLogin: function(button) {
		var form = button.up('form').form;
		if (form.isValid()) {
			form.submit({
				url: 'data/login.php',
				scope: this,
				success: function(form, action) {
					console.log('test');
					var aviewport = button.up('viewport');
					console.log('test1');
					aviewport.removeAll(true);
					console.log('test2');
					aviewport.add(Ext.widget('main'));
					console.log('test3');
					Courier.model.Courier.load(0, {
						scope: this,
						success: function(cour) {
							this.getInfo().down('label').setText("Курьер : " + cour.get('name'));
						}
					})
				},
				failure: function(form, action) {
					Ext.Msg.alert('Ошибка', action.result.msg);
				}
			});
		}
	}
});