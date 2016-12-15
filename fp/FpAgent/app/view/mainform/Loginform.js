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
				xtype : 'buttongroup',
				frame : false,
				items : [		
				{	
					enableToggle: true,	
					text : '<div style="text-align:left;">RU<div>',//'RU',				
					action : 'langRU',
					toggleGroup : 'langBtn',
					iconCls : 'ru',	
					cls : 'lang-button',						
					allowDepress : false			
				},{ 
					enableToggle: true,
					text : '<div style="text-align:left;">EN<div>',//'EN',
					action : 'langEN',
					toggleGroup : 'langBtn',
					iconCls : 'gb',
					cls : 'lang-button',
					align: 'left',			
					allowDepress : false
				}
				]
				}, '->', {
			text : FPAgent.lib.Translate.tr("Loginform.login"),//'Вход',
			action : 'login',
			iconCls : 'key',
			formBind : true
		}
	]
});
