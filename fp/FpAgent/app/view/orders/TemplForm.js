Ext.define('FPAgent.view.orders.TemplForm', {
	alias : 'widget.templform',
	extend : 'Ext.form.Panel',
	requires : ['FPAgent.view.orders.ComboCity'],
	layout : {
		type : 'absolute'
	},
	bodyPadding : 10,
	items : [{
			xtype : 'textfield',
			width : 500,
			name : 'templatename',
			fieldLabel : FPAgent.lib.Translate.tr("TemplForm.templatename"),//'Название шаблона',
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
			title : FPAgent.lib.Translate.tr("TemplForm.fs.org"),//'Отправитель',
			x : 10,
			y : 40,
			items : [{
					xtype : 'combocity',
					name : 'org',
					store : 'CityStOrg'
				}, {
					xtype : 'textfield',
					name : 'id',
					hidden : true
				}, {
					xtype : 'textfield',
					width : 337,
					name : 'cname',
					fieldLabel : FPAgent.lib.Translate.tr("TemplForm.cname"),//'Название клиента',
					maxLength : 60,
					labelAlign : 'top',
					allowBlank : false
				}, {
					xtype : 'textfield',
					width : 337,
					name : 'address',
					maxLength : 200,
					fieldLabel : FPAgent.lib.Translate.tr("TemplForm.address"),//'Адрес',
					labelAlign : 'top',
					allowBlank : false
				}, {
					xtype : 'textfield',
					width : 329,
					name : 'contname',
					fieldLabel : FPAgent.lib.Translate.tr("TemplForm.contname"),//'Контактное лицо',
					maxLength : 50,
					labelAlign : 'top',
					anchor : '100%',
					allowBlank : false
				}, {
					xtype : 'textfield',
					name : 'contmail',
					fieldLabel : 'E-Mail',
					labelAlign : 'top',
					anchor : '100%',
					vtype : 'email'
				}, {
					xtype : 'textfield',
					width : 84,
					name : 'contphone',
					fieldLabel : FPAgent.lib.Translate.tr("TemplForm.contphone"),//'Телефон',
					labelAlign : 'top',
					anchor : '100%',
					allowBlank : false
				}, {
					xtype : 'textareafield',
					name : 'orgrems',
					height : 75,
					maxLength : 1000,
					fieldLabel : FPAgent.lib.Translate.tr("TemplForm.orgrems"),//'Примечание',
					labelAlign : 'top',
					anchor : '100%'
				}
			]
		}, {
			xtype : 'fieldset',
			height : 390,
			width : 360,
			title : FPAgent.lib.Translate.tr("TemplForm.fs.dest"),//'Получатель',
			x : 390,
			y : 40,
			items : [{
					xtype : 'combocity',
					name : 'dest',
					store : 'CityStDes'
				}, {
					xtype : 'textfield',
					width : 337,
					name : 'dname',
					fieldLabel : FPAgent.lib.Translate.tr("TemplForm.dname"),//'Название клиента',
					maxLength : 60,
					labelAlign : 'top',
					allowBlank : false
				}, {
					xtype : 'textfield',
					width : 337,
					name : 'dadr',
					maxLength : 200,
					fieldLabel : FPAgent.lib.Translate.tr("TemplForm.dadr"),//'Адрес',
					labelAlign : 'top',
					allowBlank : false
				}, {
					xtype : 'textfield',
					width : 329,
					name : 'dcontname',
					maxLength : 50,
					fieldLabel : FPAgent.lib.Translate.tr("TemplForm.dcontname"),//'Контактное лицо',
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
					fieldLabel : FPAgent.lib.Translate.tr("TemplForm.dcontphone"),//'Телефон',
					labelAlign : 'top',
					anchor : '100%',
					allowBlank : false
				}, {
					xtype : 'textareafield',
					name : 'destrems',
					height : 75,
					maxLength : 1000,
					fieldLabel : FPAgent.lib.Translate.tr("TemplForm.destrems"),//'Примечание',
					labelAlign : 'top',
					anchor : '100%'
				}
			]
		}
	]
});
