Ext.define('Courier.view.OrderForm', {
	alias : 'widget.orderform',
	extend : 'Ext.form.Panel',
	layout : {
		type : 'vbox'
	},
	bodyPadding : 10,
	items : [{
			xtype : 'label',
			itemId : 'displayno'/*,
			fieldLabel : 'Заказ',
			readOnly : true*/
		}, {
			xtype : 'label',
			itemId : 'aaddress',
			width : 570
		}, {
			xtype : 'label',
			itemId : 'client'/*,
			fieldLabel : 'Клиент'*/
		}, {
			xtype : 'label',
			itemId : 'cont'/*,
			fieldLabel : 'Контакт'*/
		}, {
			xtype : 'label',
			itemId : 'contphone'/*,
			fieldLabel : 'Телефон'*/
		}, {
			xtype : 'label',
			itemId : 'rems',
			width : 570
		}, {
			xtype : 'label',
			itemId : 'packs'/*,
			fieldLabel : 'Мест'*/
		}, {
			xtype : 'label',
			itemId : 'wt'/*,
			fieldLabel : 'Вес'*/
		}, {
			xtype : 'label',
			itemId : 'volwt'/*,
			fieldLabel : 'Об. вес'*/
		}, {
			xtype : 'label',
			itemId : 'acash'/*,
			fieldLabel : 'Сумма'*/
		}, {
			xtype : 'label',
			itemId : 'ordstatus'/*,
			fieldLabel : 'Статус'*/
		}, {
			xtype : 'label',
			itemId : 'ordtype'/*,
			fieldLabel : 'Вид'*/
		}, {
			xtype : 'fieldset',
			layout : 'hbox',
			border : 0,
			
			items : [{
					xtype : 'label',
					itemId : 'timeb'/*,
					width : 80,
					labelPad : 2,
					labelWidth : 20,
					margin : '0 10 0 0',
					fieldLabel : 'C'*/
				}, {
					xtype : 'label',
					itemId : 'timee'/*,
					width : 80,
					labelPad : 2,
					labelWidth : 20,
					margin : '0 0 0 10',
					,
					fieldLabel : 'До'*/
				}
			]
		}
	]
});
