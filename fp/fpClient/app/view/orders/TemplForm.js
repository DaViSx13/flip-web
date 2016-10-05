Ext.define('FPClient.view.orders.TemplForm', {
	alias : 'widget.templform',
	extend : 'Ext.form.Panel',
	requires : ['FPClient.view.orders.ComboCity'],
	layout : {
		type : 'absolute'
	},
	bodyPadding : 10,
	items : [{
			xtype : 'textfield',
			width : 350,
			name : 'templatename',
			fieldLabel : 'Название шаблона',
			maxLength : 500,
			labelWidth : 150,
			x : 20,
			y : 10,
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'id',
			hidden : true
		}, {
			xtype : 'fieldset',
			height : 390,
			width : 360,
			title : 'Получатель',
			x : 10,
			y : 40,
			items : [{
					xtype : 'combocity',
					name : 'dest',
					store : 'CityStDes'
				}, {
					xtype : 'textfield',
					width : 337,
					name : 'dname',
					fieldLabel : 'Название клиента',
					maxLength : 60,
					labelAlign : 'top',
					allowBlank : false
				}, {
					xtype : 'textfield',
					width : 337,
					name : 'dadr',
					maxLength : 70,
					fieldLabel : 'Адрес',
					labelAlign : 'top',
					allowBlank : false
				}, {
					xtype : 'textfield',
					width : 329,
					name : 'dcontname',
					maxLength : 50,
					fieldLabel : 'Контактное лицо',
					labelAlign : 'top',
					anchor : '100%',
					allowBlank : false
				}, {
					xtype : 'textfield',
					name : 'dcontmail',
					fieldLabel : 'E-Mail',
					labelAlign : 'top',
					anchor : '100%',
					vtype : 'email'
				}, {
					xtype : 'textfield',
					width : 84,
					name : 'dcontphone',
					fieldLabel : 'Телефон',
					labelAlign : 'top',
					anchor : '100%',
					allowBlank : false
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
