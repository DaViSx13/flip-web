Ext.define('FPClient.view.webwbs.WbForm', {
	alias : 'widget.wbform',
	extend : 'Ext.form.Panel',
	requires : ['FPClient.view.orders.ComboCity'],
	layout : {
		type : 'absolute'
	},
	bodyPadding : 10,
	items : [{
				xtype : 'textfield',
				name : 'id',
				hidden : true
			},{
				xtype : 'textfield',
				name : 'wb_no',
				hidden : true
			},{
				xtype : 'textfield',
				name : 'ord_no',
				hidden : true
			}, {
				xtype : 'fieldset',
				id : 'fs1',
				height : 390,
				width : 360,
				title : 'Отправитель',
				x : 10,
				y : 0,			
				items : [{
					xtype : 'combocity',
					name : 'org',
					store : 'CityStOrg',
					allowBlank : false
				}, {
					xtype : 'textfield',
					width : 337,
					name : 's_co',
					fieldLabel : 'Название клиента',
					maxLength : 90,
					labelAlign : 'top',
					allowBlank : false
				}, {
					xtype : 'textfield',
					width : 337,
					name : 's_adr',
					maxLength : 70,
					fieldLabel : 'Адрес',
					labelAlign : 'top',
					allowBlank : false
				}, {
					xtype : 'textfield',
					width : 329,
					name : 's_name',
					fieldLabel : 'Контактное лицо',
					maxLength : 50,
					labelAlign : 'top',
					anchor : '100%',
					allowBlank : false
				}, {
					xtype : 'textfield',
					name : 's_mail',
					fieldLabel : 'E-Mail',
					labelAlign : 'top',
					anchor : '100%',
					vtype : 'email'
				}, {
					xtype : 'textfield',
					width : 84,
					name : 's_tel',
					fieldLabel : 'Телефон',
					labelAlign : 'top',
					anchor : '100%',
					allowBlank : false
				}, {
					xtype : 'textareafield',
					name : 's_ref',
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
			y : 0,
			items : [{
					xtype : 'combocity',
					name : 'dest',
					store : 'CityStDes',
					allowBlank : false
				}, {
					xtype : 'textfield',
					width : 337,
					name : 'r_co',
					fieldLabel : 'Название клиента',
					maxLength : 90,
					labelAlign : 'top',
					allowBlank : false
				}, {
					xtype : 'textfield',
					width : 337,
					name : 'r_adr',
					maxLength : 70,
					fieldLabel : 'Адрес',
					labelAlign : 'top',
					allowBlank : false
				}, {
					xtype : 'textfield',
					width : 329,
					name : 'r_name',
					maxLength : 50,
					fieldLabel : 'Контактное лицо',
					labelAlign : 'top',
					anchor : '100%',
					allowBlank : false
				}, {
					xtype : 'textfield',
					name : 'r_mail',
					fieldLabel : 'E-Mail',
					labelAlign : 'top',
					anchor : '100%',
					vtype : 'email'
				}, {
					xtype : 'textfield',
					width : 84,
					name : 'r_tel',
					fieldLabel : 'Телефон',
					labelAlign : 'top',
					anchor : '100%',
					allowBlank : false
				}, {
					xtype : 'textareafield',
					name : 'r_ref',
					height : 75,
					maxLength : 1000,
					fieldLabel : 'Примечание',
					labelAlign : 'top',
					anchor : '100%'
				}
			]
		},  {
			xtype : 'fieldset',
			height : 150,
			width : 360,
			title : 'Информация о грузе',
			x : 10,
			y : 390,
			defaults : {
				anchor : '100%'
			},
			layout : 'anchor',
			items : [{
					xtype : 'combobox',
					name : 'type',
					displayField : 'Name',
					valueField : 'lowName',
					allowBlank : false,
					forceSelection : true,
					editable : false,
					fieldLabel : 'Тип груза',
					store : 'TypeSt',
					queryMode : 'local'
				}, {
					xtype : 'numberfield',
					name : 'pcs',
					minValue : 0,
					fieldLabel : 'Число мест',
					allowBlank : true
				}, {
					xtype : 'numberfield',
					name : 'wt',
					minValue : 0,
					fieldLabel : 'Вес',
					allowBlank : true
				}, {
					xtype : 'numberfield',
					name : 'vol_wt',
					minValue : 0,
					fieldLabel : 'Объемный вес'
				}
			]
		}, {
		xtype: 'fieldset',
		title: 'Информация по оплате',
		x : 390,
		y : 390,
		height : 150,
		width : 360,
		defaults: {
			anchor: '100%'
		},
		layout: 'anchor',
		items: [{
			fieldLabel: 'Плательщик',
			xtype: 'radiofield',
			boxLabel: 'Отправитель',
			name: 'payr',
			inputValue: 1,
			readOnly:true
		}, {
			fieldLabel: '          ',
			labelSeparator: '',
			xtype: 'radiofield',
			boxLabel: 'Получатель',
			name: 'payr',
			inputValue: 2,
			readOnly:true
		}, {
			fieldLabel: 'Вид оплаты',
			xtype: 'radiofield',
			boxLabel: 'По счету',
			name: 'metpaym',
			inputValue: 'INV',
			checked: true,
			readOnly:true
		}, {
			fieldLabel: '          ',
			labelSeparator: '',
			xtype: 'radiofield',
			boxLabel: 'Наличными',
			name: 'metpaym',
			inputValue: 'CSH',
			readOnly:true
		}, {
			name: 'inssum',
			xtype: 'numberfield',
			minValue: 0,
			value: 0,
			fieldLabel: 'Сумма страховки'
		}
		]
	}]
});
