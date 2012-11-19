Ext.define('Courier.view.OrderForm', {
	alias : 'widget.orderform',
	extend : 'Ext.form.Panel',
	layout : {
		type : 'vbox'
	},
	bodyPadding : 10,
	items : [{
			xtype : 'textfield',
			name : 'displayno',
			fieldLabel : 'Заказ',
			readOnly : true
		}, {
			xtype : 'textfield',
			name : 'aaddress',
			fieldLabel : 'Адрес',
			readOnly : true
		}, {
			xtype : 'textfield',
			name : 'client',
			fieldLabel : 'Клиент'
		}, {
			xtype : 'textfield',
			name : 'cont',
			fieldLabel : 'Контакт'
		}, {
			xtype : 'textfield',
			name : 'contphone',
			fieldLabel : 'Телефон'
		}, {
			xtype : 'textfield',
			name : 'rems',
			fieldLabel : 'Коментарий'
		}, {
			xtype : 'textfield',
			name : 'packs',
			fieldLabel : 'Мест'
		}, {
			xtype : 'textfield',
			name : 'wt',
			fieldLabel : 'Вес'
		}, {
			xtype : 'textfield',
			name : 'volwt',
			fieldLabel : 'Об. вес'
		}, {
			xtype : 'textfield',
			name : 'acash',
			fieldLabel : 'Сумма'
		}, {
			xtype : 'textfield',
			name : 'ordstatus',
			fieldLabel : 'Статус'
		}, {
			xtype : 'textfield',
			name : 'ordtype',
			fieldLabel : 'Вид'
		}, {
			xtype : 'fieldset',
			layout : 'hbox',
			border : 0,
			
			items : [{
					xtype : 'textfield',
					name : 'timeb',
					width : 80,
					labelPad : 2,
					labelWidth : 20,
					margin : '0 10 0 0',
					fieldLabel : 'C'
				}, {
					xtype : 'textfield',
					width : 80,
					labelPad : 2,
					labelWidth : 20,
					margin : '0 0 0 10',
					name : 'timee',
					fieldLabel : 'До'
				}
			]
		}
	]
});
