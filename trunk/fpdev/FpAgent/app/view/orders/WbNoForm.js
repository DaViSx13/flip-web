Ext.define('FPAgent.view.orders.WbNoForm', {
	alias : 'widget.wbnoform',
	extend : 'Ext.form.Panel',
	width : 758,
	height : 38,
	layout : {
		type : 'hbox'
	},
	bodyPadding : 5,
	items : [{
			xtype : 'textfield',
			name : 'rordnum',
			hidden : true
		}, {
			xtype : 'textfield',
			width : 154,
			enableKeyEvents : true,
			name : 'wbno'
		}
	]
});
