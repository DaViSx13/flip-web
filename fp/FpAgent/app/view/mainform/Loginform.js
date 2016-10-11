Ext.define('FPAgent.view.mainform.Loginform', {
	extend : 'Ext.form.Panel',
	alias : 'widget.loginform',
	title : 'Вход в ФлипПост WEB',	
	layout : {
		type : 'vbox'
	},
	bodyPadding : 12,
	height : 130,
	width : 260,
	items : [{
			xtype : 'textfield',
			width : 230,
			name : 'user',
			fieldLabel : __("nameLabel"),//'Имя',//Ext.getVersion().version
			enableKeyEvents : true,
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'password',
			enableKeyEvents : true,
			width : 230,
			fieldLabel : FPAgent.lib.Translate.tr("passwordLabel"),//'Пароль',
			inputType : 'password',
			allowBlank : false
		}
	],
	buttons : [{
			text : 'Вход',
			action : 'login',
			formBind : true
		}
	]
});
