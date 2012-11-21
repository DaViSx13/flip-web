Ext.define('Courier.view.WbForm', {
	extend : 'Ext.form.Panel',
	alias : 'widget.wbform',
	layout : {
		type : 'vbox'
	},
	bodyPadding : 10,
	items : [{
			xtype : 'label',
			itemId : 'displayno'//,
			//fieldLabel : 'Накладная',
			//readOnly : true
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
			
		}
	]
});
