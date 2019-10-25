Ext.define('FPClient.view.mainform.TarifForm', {
	alias: 'widget.tarifform',
	extend: 'Ext.form.Panel',
	requires: ['FPClient.view.orders.ComboCity'],
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	
	items: [{
			xtype: 'fieldset',
			id: 'fs1',
			flex: 1,
			border: false,

			items: [{
					xtype: 'combocity',
					name: 'org',
					valueField: 'citycode',
					emptyText: 'Пункт отправления',
					store: 'CityStOrg',
					allowBlank: false
				}, {
					xtype: 'fieldset',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					padding: 0,
					border: false,
					items: [{
							xtype: 'numberfield',
							padding: '0 15 0 0',
							name: 'weight',
							fieldLabel: 'Вес, кг',
							minValue: 0.1,
							value: 0.1,
							labelAlign: 'top',
							allowBlank: false
						}, {
							xtype: 'numberfield',
							name: 'length',
							minValue: 0.1,
							value: 0.1,
							fieldLabel: 'Длина, см',
							labelAlign: 'top' ,
							allowBlank: false 
						}
					]
				}, /*{
					xtype: 'checkboxfield',
					boxLabel: 'Отметьте, если отправление оплачивает получатель',
					name: 'webwbprint',
					inputValue: 1,
					uncheckedValue: 0
				}*/
				{
					xtype: 'label',
					html: 'Cрок доставки:',
					name: 'tarif'
					
				}
			]
		}, {
			xtype: 'fieldset',
			
			flex: 1,
			border: false,

			items: [{
					xtype: 'combocity',
					name: 'dest',
					valueField: 'citycode',
					emptyText: 'Пункт назначения',
					store: 'CityStDes',
					allowBlank: false
				}, {
					xtype: 'fieldset',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					padding: 0,
					border: false,
					items: [{
							xtype: 'numberfield',
							padding: '0 15 0 0',
							name: 'width',
							fieldLabel: 'Ширина, см',
							minValue: 0.1,
							value: 0.1,
							labelAlign: 'top' ,
							allowBlank: false
						}, {
							xtype: 'numberfield',
							padding: '0 0 0 0',
							name: 'height',
							fieldLabel: 'Высота, см',
							labelAlign: 'top' ,
							minValue: 0.1,
							value: 0.1,
							allowBlank: false
						}
					]
				},{
					xtype: 'label',					
					name: 'delivery',							
					html: 'Стоимость:'
				}
			]
		}
	]
});
