Ext.define('Courier.view.NewPodForm', {
	alias : 'widget.newpodform',
	extend : 'Ext.form.Panel',
	layout : {
		type : 'vbox'
	},
	bodyPadding : 10,
	items : [{
			xtype : 'label',
			itemId : 'wb_no' /*,
			fieldLabel : 'Накладная',
			readOnly : true*/
		}, {
			xtype : 'textfield',
			name : 'wb_no',
			hidden : true
		}, {
			xtype : 'textfield',
			name : 'tdd',
			fieldLabel : 'Время',
			vtype : 'time',
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'rcpn',
			width : 233,
			fieldLabel : 'Получатель',
			allowBlank : false
		}
	]
});
