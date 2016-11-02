Ext.define('FPAgent.view.mainform.Loginform', {
	extend : 'Ext.form.Panel',
	alias : 'widget.loginform',
	title : FPAgent.lib.Translate.tr("Loginform.title"), //'Вход в ФлипПост WEB',
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
			fieldLabel : FPAgent.lib.Translate.tr("Loginform.user"), //__("nameLabel"), //'Имя'
			enableKeyEvents : true,
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'password',
			enableKeyEvents : true,
			width : 230,
			fieldLabel : FPAgent.lib.Translate.tr("Loginform.password"), //'Пароль'
			inputType : 'password',
			allowBlank : false
		}
	],
	buttons : [{
			text : 'RU',
			action : 'langRU',
			toggleGroup : 'langBtn',
			iconCls : 'ru',
			allowDepress : false
		}, {
			text : 'EN',
			action : 'langEN',
			toggleGroup : 'langBtn',
			iconCls : 'gb',
			allowDepress : false
		}, '->', {
			text : FPAgent.lib.Translate.tr("Loginform.login"),//'Вход',
			action : 'login',
			iconCls : 'key',
			formBind : true
		}
	]
});
