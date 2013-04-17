Ext.define('FPAgent.view.orders.UseTemplForm', {
	alias : 'widget.usetemplform',
	extend : 'Ext.form.Panel',
	width : 758,
	height : 38,
	layout : {
		type : 'hbox'
	},
	bodyPadding : 5,
	items : [{
			xtype : 'textfield',
			name : 'id',
			hidden : true
		}, {
			xtype : 'textfield',
			width : 154,
			enableKeyEvents : true,
			name : 'wbno'
		}
	]
});