Ext.define('fplk.view.orders.TemplForm', {
	alias : 'widget.templform',
	extend : 'Ext.form.Panel',
	requires : ['fplk.view.orders.ComboCity'],
	layout : {
		type : 'absolute'
	},
	bodyPadding : 10,
	items : [{
			xtype : 'userinputfield',
			width : 500,
			name : 'templatename',
			fieldLabel : 'Название шаблона',
			maxLength : 500,
			labelWidth : 150,
			x : 60,
			y : 10,
			allowBlank : false
		}, {
			xtype : 'fieldset',
			id : 'fs1',
			height : 390,
			width : 360,
			title : 'Отправитель',
			x : 10,
			y : 40,
			items : [{
					xtype : 'combocity',
					name : 'org',
					allowBlank : true,
					store : 'CityStOrg'
				}, {
					xtype : 'textfield',
					name : 'id',
					hidden : true
				}, {
					xtype : 'userinputfield',
					width : 337,
					name : 'cname',
					fieldLabel : 'Название клиента',
					maxLength : 60,
					labelAlign : 'top',
					allowBlank : true
				}, {
					xtype : 'userinputfield',
					width : 337,
					name : 'address',
					maxLength : 70,
					fieldLabel : 'Адрес',
					labelAlign : 'top',
					allowBlank : true
				}, {
					xtype : 'userinputfield',
					width : 329,
					name : 'contname',
					fieldLabel : 'Контактное лицо',
					maxLength : 50,
					labelAlign : 'top',
					anchor : '100%',
					allowBlank : true
				}, {
					xtype : 'userinputfield',
					name : 'contmail',
					fieldLabel : 'E-Mail',
					labelAlign : 'top',
					anchor : '100%'
				}, {
					xtype : 'userinputfield',
					width : 84,
					name : 'contphone',
					fieldLabel : 'Телефон',
					labelAlign : 'top',
					anchor : '100%',
					allowBlank : true
				}, {
					xtype : 'textareafield',
					name : 'orgrems',
					height : 75,
					maxLength : 1000,
					fieldLabel : 'Примечание',
					labelAlign : 'top',
					anchor : '100%'
				}
			]
		}, {
			xtype : 'fieldset',
			height : 390,
			width : 360,
			title : 'Получатель',
			x : 390,
			y : 40,
			items : [{
					xtype : 'combocity',
					name : 'dest',
					allowBlank : true,
					store : 'CityStDes'
				}, {
					xtype : 'userinputfield',
					width : 337,
					name : 'dname',
					fieldLabel : 'Название клиента',
					maxLength : 60,
					labelAlign : 'top',
					allowBlank : true
				}, {
					xtype : 'userinputfield',
					width : 337,
					name : 'dadr',
					maxLength : 70,
					fieldLabel : 'Адрес',
					labelAlign : 'top',
					allowBlank : true
				}, {
					xtype : 'userinputfield',
					width : 329,
					name : 'dcontname',
					maxLength : 50,
					fieldLabel : 'Контактное лицо',
					labelAlign : 'top',
					anchor : '100%',
					allowBlank : true
				}, {
					xtype : 'userinputfield',
					name : 'dcontmail',
					fieldLabel : 'E-Mail',
					labelAlign : 'top',
					anchor : '100%'
				}, {
					xtype : 'userinputfield',
					width : 84,
					name : 'dcontphone',
					fieldLabel : 'Телефон',
					labelAlign : 'top',
					anchor : '100%',
					allowBlank : true
				}, {
					xtype : 'textareafield',
					name : 'destrems',
					height : 75,
					maxLength : 1000,
					fieldLabel : 'Примечание',
					labelAlign : 'top',
					anchor : '100%'
				}
			]
		}
	]
});
