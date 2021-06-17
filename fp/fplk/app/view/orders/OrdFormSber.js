Ext.define('fplk.view.orders.OrdFormSber', {
	alias : 'widget.ordformsber',
	extend : 'Ext.form.Panel',
	requires : ['fplk.view.orders.ComboCity'],
	layout : {
		type : 'absolute'
	},
	flex: 1,
	bodyPadding : 10,
	items : [{
			xtype : 'fieldset',
			id : 'fs1',
			height : 385,
			width : 360,
			title : 'Отправитель',
			x : 10,
			y : 0,			
			items : [{
				xtype: 'panel',
				width: 337,
				border: false,
				layout: 'hbox',
				items: [{
						xtype : 'numberfield',
						name : 'orgIndex',
						maxLength: 6,
						maxLengthText: 6,
						enforceMaxLength: true,
						width : '16%',
						allowBlank : true,
						fieldLabel : 'Индекс',
						margin: '0 5 0 0',
						hideTrigger : true,
						labelAlign : 'top'
					}, {
						xtype : 'combocity',
						name : 'org',
						store : 'CityStOrg',
						allowBlank : true,
						flex : 1
				}]
			},  {
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
					maxLength : 200,
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
					anchor : '100%'
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
					height : 70,
					maxLength : 1000,
					fieldLabel : 'Примечание',
					labelAlign : 'top',
					anchor : '100%'
				}
			]
		}, {
			xtype : 'fieldset',
			height : 385,
			width : 360,
			title : 'Получатель',
			x : 390,
			y : 0,
			items : [{
				xtype: 'panel',
				border: false,
				width: 337,
				layout: 'hbox',
				items: [{
					xtype : 'numberfield',
					width : '16%',
					name : 'destIndex',
					maxLength: 6,
					maxLengthText: 6,					
					enforceMaxLength: true,
					allowBlank : true,
					fieldLabel : 'Индекс',
					hideTrigger : true,
					margin: '0 5 0 0',
					labelAlign : 'top'
				},{
					xtype : 'combocity',
					name : 'dest',
					store : 'CityStDes',
					flex: 1
				}]
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
					maxLength : 200,
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
					anchor : '100%'
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
					height : 70,
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
			y : 385,
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
					value : new Date(),
					allowBlank : false,
					labelWidth: 60
				}, {
					xtype : 'fieldset',
					layout: 'vbox',
					border: 0,
					padding:  '1 1 1 1',					
					items : [{
						xtype : 'textfield',
						name : 'courtimef',
						fieldLabel : 'Время с',
						labelWidth:  60,
						width : 150,
						vtype: 'time'
					}, {
						xtype : 'textfield',
						name : 'courtimet',
						labelWidth:  60,
						fieldLabel : 'Время до',
						width : 150,
						vtype: 'time'
					}, {
						xtype:'checkboxfield',
						fieldLabel : 'Срочность',
						name : 'sberquick',
						labelWidth:  70,
						inputValue: 1
					}]
				}
			]
		}, {
		xtype : 'fieldset',
		height : 150,
		width : 243,
		title : 'Информация по оплате',
		collapsed : true,
		collapsible : true,
		x : 255,
		y : 385,
		defaults : {
			anchor : '100%'
		},
		items: [{
			fieldLabel: 'Плательщик',
			xtype: 'radiofield',
			boxLabel: 'Отправитель',
			name: 'fpayr',
			inputValue: 1
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
			checked:true,
			name: 'metpaym',
			inputValue: 'INV'
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
			width : 250,
			title : 'Информация о грузе',
			x : 500,
			y : 385,
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
					store : 'TypeStSber',
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
					minValue : 0.1,
					value : 0.1,
					fieldLabel : 'Вес',
					step : 0.1,
					allowBlank : false
				}, {
					xtype : 'numberfield',
					name : 'volwt',
					minValue : 0,
					fieldLabel : 'Объемный вес'
				}]
		}, {
			xtype : 'fieldset',
			height : 80,
			width : 740,
			title : 'Дополнительно',
			x : 10,
			y : 535,
			defaults : {
				anchor : '100%',
			},
			layout : 'anchor',
			items : [{
				xtype : 'panel',
				border: false,
				width: 740,
				defaults: {
					margin: '0 10 0 0'
				},
				layout: 'hbox',
				items: [{
					xtype : 'textfield',
					name : 'sbersize',
					fieldLabel : 'Габариты груза',
					labelAlign : 'top',
					width : 150
				}, {
					xtype : 'numberfield',
					minValue : 0.1,
					value : 0.1,
					step: 0.1,
					name : 'sbercost',
					fieldLabel : 'Объявленная ценность',
					labelAlign : 'top',
					width : 150
				}, {
					xtype : 'textfield',
					name : 'sberproject',
					fieldLabel : 'Проект',
					labelAlign : 'top',
					width : 150
				}, {
					xtype : 'textfield',
					name : 'sbersuit',
					fieldLabel : 'Подразделение',
					labelAlign : 'top',
					width : 150
				}]
			}]},
		{
			xtype : 'label',
			html : '*по умолчанию <br> Вы являетесь плательщиком',
			x : 255,
			y : 620,
			width : 360
		}, {
			xtype : 'checkboxfield',
			boxLabel : 'Оформить веб накладную',
			name : 'webwb',
			inputValue: 1,
			uncheckedValue: 0,
			x : 10,
			y : 620//,
			//width : 360
		}
	]
});