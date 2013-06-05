Ext.define('Courier.view.WbForm', {
	alias : 'widget.wbform',
	extend : 'Ext.form.Panel',
	layout : {
		type : 'vbox'
	},
	bodyPadding : 10,
	items : [{
			xtype : 'textfield',
			name : 'displayno',
			fieldLabel : 'Накладная',
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
			
		},{
			xtype : 'textfield',
			name : 'contphone',
			fieldLabel : 'Телефон'
			
		}, {
			xtype : 'textfield',
			name : 'rems',
			//width : 233,
			fieldLabel : 'Коментарий'
			
		},{
			xtype : 'textfield',
			name : 'packs',
			fieldLabel : 'Мест'
			
		},{
			xtype : 'textfield',
			name : 'wt',
			fieldLabel : 'Вес'
			
		},{
			xtype : 'textfield',
			name : 'volwt',
			fieldLabel : 'Об. вес'
			
		},{
			xtype : 'textfield',
			name : 'acash',
			fieldLabel : 'Сумма'
			
		}
	]
});
