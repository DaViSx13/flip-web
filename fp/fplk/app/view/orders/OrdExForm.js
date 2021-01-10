Ext.define('fplk.view.orders.OrdExForm', {
	alias : 'widget.ordexform',
	extend : 'Ext.form.Panel',
	layout : {
		type : 'fit'
	},
	bodyPadding : 0,
	items : [{
			xtype : 'textareafield',
			name : 'ofvers'
		}
	]
});
