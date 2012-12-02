Ext.define('Courier.view.OrderForm', {
	alias : 'widget.orderform',
	extend : 'Ext.form.Panel',
	layout : 'form',
	bodyPadding : 10,
	items : [{
			xtype : 'displayfield',
			name : 'ano',
			fieldLabel : 'Заказ'
		}, {
			xtype : 'displayfield',
			name : 'aaddress',
			fieldLabel : 'Адрес'
			//,width : 570
		}, {
			xtype : 'displayfield',
			name : 'client',
			fieldLabel : 'Клиент'
		}, {
			xtype : 'displayfield',
			name : 'cont',
			fieldLabel : 'Контакт'
		}, {
			xtype : 'displayfield',
			name : 'contphone',
			fieldLabel : 'Телефон'
		}, {
			xtype : 'displayfield',
			name : 'acash',
			fieldLabel : 'Сумма'
		}, {
			xtype : 'fieldset',
			layout : 'hbox',
			border : 0,
			padding : 0,
			defaults : {
				margin : '0 50 0 0'
			},
			items : [{
					xtype : 'displayfield',
					name : 'packs',
					fieldLabel : 'Мест',
					labelWidth : 50
				}, {
					xtype : 'displayfield',
					name : 'wt',
					fieldLabel : 'Вес',
					labelWidth : 40
				}, {
					xtype : 'displayfield',
					name : 'volwt',
					fieldLabel : 'Об. вес',
					labelWidth : 70
				}
			]
		}, {
			xtype : 'fieldset',
			layout : 'hbox',
			border : 0,
			padding : 0,
			items : [{
					xtype : 'displayfield',
					name : 'timeb',
					width : 80,
					labelPad : 2,
					labelWidth : 20,
					margin : '0 10 0 0',
					fieldLabel : 'C'
				}, {
					xtype : 'displayfield',
					name : 'timee',
					width : 80,
					labelPad : 2,
					labelWidth : 30,
					margin : '0 0 0 10',
					fieldLabel : 'До'
				}
			]
		}, {
			xtype : 'displayfield',
			name : 'rems',
			fieldLabel : 'Примечание',
			labelWidth: 110,
			//labelAlign : 'top',
			width : 570
		}
	]
});
