Ext.define('Courier.view.WbForm', {
	extend : 'Ext.form.Panel',
	alias : 'widget.wbform',
	layout : {
		type : 'vbox'
	},
	bodyPadding : 10,
	items : [{
			xtype : 'displayfield',
			name : 'ano',
			fieldLabel : 'Накладная'
			//readOnly : true
		}, {
			xtype : 'displayfield',
			name : 'aaddress',
			fieldLabel : 'Адрес'
			//width : 570
			
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
			
		}/*, {
			xtype : 'displayfield',
			name : 'packs',
			fieldLabel : 'Мест'
			
		}*/, {
			xtype : 'displayfield',
			name : 'wt',
			fieldLabel : 'Вес'
			
		}, {
			xtype : 'displayfield',
			name : 'volwt',
			fieldLabel : 'Об. вес'
			
		}, {
			xtype : 'displayfield',
			name : 'acash',
			fieldLabel : 'Сумма'
			
		}, {
			xtype : 'displayfield',
			name : 'rems',
			width : 570,
			labelWidth: 110,
			fieldLabel : 'Примечание'
						
		}
	]
});
