Ext.define('FPClient.view.orders.OrdForm', {
	alias : 'widget.ordform',
	extend : 'Ext.form.Panel',
	requires : ['FPClient.view.orders.ComboCity'],
	layout : {
		type : 'absolute'
	},
	bodyPadding : 10,
	items : [{
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
					allowBlank : true
				}, {
					xtype : 'textfield',
					name : 'rordnum',
					hidden : true
				}, {
					xtype : 'textfield',
					width : 337,
					name : 'cname',
					fieldLabel : 'Название клиента',
					maxLength : 60,
					labelAlign : 'top',
					_allowBlank : false
				}, {
					xtype : 'textfield',
					width : 337,
					name : 'address',
					maxLength : 70,
					fieldLabel : 'Адрес',
					labelAlign : 'top',
					_allowBlank : false
				}, {
					xtype : 'textfield',
					width : 329,
					name : 'contname',
					fieldLabel : 'Контактное лицо',
					maxLength : 50,
					labelAlign : 'top',
					anchor : '100%',
					_allowBlank : false
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
					fieldLabel : 'Телефон',
					labelAlign : 'top',
					anchor : '100%',
					_allowBlank : false
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
			y : 0,
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
		}, {
			xtype : 'fieldset',
			height : 150,
			width : 243,
			title : 'Дата приезда курьера',
			x : 10,
			y : 390,
			defaults : {
				anchor : '100%'
			},
			layout : 'anchor',
			items : [{
					xtype : 'datefield',
					name : 'courdate',
					fieldLabel : 'Дата',
					startDay : 1,					
					format : 'd.m.Y',
					minValue: (new Date().getHours() >= 14) ? Ext.Date.add(new Date(), Ext.Date.DAY, 1): new Date(),
					value : (new Date().getHours() >= 14) ? Ext.Date.add(new Date(), Ext.Date.DAY, 1): new Date(),
					allowBlank : false,
					labelWidth: 60
				}, {
					xtype : 'fieldset',
					layout: 'vbox',
					border: 0,
					padding:  '1 1 1 1',
					items : [
					
					{
					xtype : 'textfield',
					name : 'courtimef',
					fieldLabel : 'Время с',
					labelWidth:  60,
					padding:  '5 0 0 0',
					width : 150,
					vtype: 'time'
				}, {
					xtype : 'textfield',
					name : 'courtimet',
					labelWidth:  60,
					padding:  '5 0 0 0',
					fieldLabel : 'Время до',
					width : 150,
					vtype: 'time'
				}
					
					
					]
				}
			]
		},
		, {
			xtype : 'fieldset',
			height : 150,
			width : 243,
			title : 'Информация по оплате',
			collapsed : true,
			collapsible : true,
			x : 255,
			y : 390,
			defaults : {
				anchor : '100%'
			},
			items: [{
				fieldLabel: 'Плательщик',
				xtype: 'radiofield',
				boxLabel: 'Отправитель',
				name: 'fpayr',
				inputValue: 1,
				checked: true
			}, {
				fieldLabel: '          ',
				labelSeparator: '',
				xtype: 'radiofield',
				boxLabel: 'Получатель',
				name: 'fpayr',
				inputValue: 2
			}, {
				fieldLabel: 'Вид оплаты',
				xtype: 'radiofield',
				boxLabel: 'По счету',
				name: 'metpaym',
				inputValue: 'INV',
				checked: true
			}, {
				fieldLabel: '          ',
				labelSeparator: '',
				xtype: 'radiofield',
				boxLabel: 'Наличными',
				name: 'metpaym',
				inputValue: 'CSH'
			}]
		},
		{
			xtype : 'fieldset',
			height : 150,
			width : 243,
			title : 'Информация о грузе',
			x : 500,
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
					name : 'packs',
					minValue : 0,
					fieldLabel : 'Число мест',
					allowBlank : false
				}, {
					xtype : 'numberfield',
					name : 'wt',
					minValue : 0,
					fieldLabel : 'Вес',
					allowBlank : false
				}, {
					xtype : 'numberfield',
					name : 'volwt',
					minValue : 0,
					fieldLabel : 'Объемный вес'
				}
			]
		},/* {
			xtype : 'label',
			text : '*по умолчанию оплата заказчиком (агентом, размещающим заказ), в случае другой оплаты - просьба указывать это в примечании (отправитель/получатель, сумма)',
			x : 10,
			y : 510,
			width : 360
		},*/ {
			xtype : 'checkboxfield',
			boxLabel : 'Оформить веб накладную',
			name : 'webwb',
			inputValue: 1,
			uncheckedValue: 0,
			x : 10,
			y : 550
		}, {
			xtype : 'checkboxfield',
			boxLabel : 'Распечатать веб накладную',
			name : 'webwbprint',
			inputValue: 1,
			uncheckedValue: 0,
			disabled: true,
			x : 190,
			y : 550
			
		}
	]
});
