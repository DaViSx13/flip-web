Ext.define('FpMnf.view.orders.OrdForm', {
	alias : 'widget.ordform',
	extend : 'Ext.form.Panel',
	requires : ['FpMnf.view.orders.ComboCity'],
	initComponent : function () {
		Ext.apply(this, {
			height : 610,
			width : 763,
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
                            store : 'CityStOrg'
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
							allowBlank : false
						}, {
							xtype : 'textfield',
							width : 337,
							name : 'address',
							maxLength : 70,
							fieldLabel : 'Адрес',
							labelAlign : 'top',
							allowBlank : false
						}, {
							xtype : 'textfield',
							width : 329,
							name : 'contname',
							fieldLabel : 'Контактное лицо',
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
							fieldLabel : 'Телефон',
							labelAlign : 'top',
							anchor : '100%',
							allowBlank : false
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
					height : 120,
					width : 360,
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
							format : 'd.m.Y'
						}, {
							xtype : 'timefield',
							name : 'courtimef',
							fieldLabel : 'Время с',
							format : 'H:i'
						}, {
							xtype : 'timefield',
							name : 'courtimet',
							fieldLabel : 'Время до',
							format : 'H:i'
						}
					]
				}, {
					xtype : 'fieldset',
					height : 150,
					width : 360,
					title : 'Информация о грузе',
					x : 390,
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
							//typeAhead : true,
							fieldLabel : 'Тип груза',
							store : 'TypeSt',
							//selectOnFocus : true,
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
				}, {
					xtype : 'label',
					text : '*по умолчанию оплата заказчиком (агентом, размещающим заказ), в случае другой оплаты - просьба указывать это в примечании (отправитель/получатель, сумма)',
					x : 10,
					y : 510,
					width : 360
				}
			]
		});
		this.callParent(arguments);
	}
});
