Ext.define('FpMnf.view.mainform.Loginform', {
	extend: 'Ext.form.Panel',
	alias: 'widget.loginform',
	title: 'Вход в ФлипПост WEB',
	layout : {
		type : 'vbox'
	},
	bodyPadding : 12,
	height : 130,
	width : 260,
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