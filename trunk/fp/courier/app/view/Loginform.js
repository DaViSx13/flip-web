Ext.define('Courier.view.Loginform', {
	extend: 'Ext.form.Panel',
	alias: 'widget.loginform',
	title: 'Здрасте',
	//url: 'data/login.php',
/*
    config: {
        url: 'login.php'
        },
  */
	items: [{
		xtype: 'textfield',
		name: 'user',
		fieldLabel: 'Имя',
		allowBlank: false
	},
	{
		xtype: 'textfield',
		name: 'password',
		fieldLabel: 'Пароль',
		inputType: 'password',
		allowBlank: false
	}],
	buttons: [{
		text: 'Вход',
		action: 'login',
		formBind: true
	}]
});