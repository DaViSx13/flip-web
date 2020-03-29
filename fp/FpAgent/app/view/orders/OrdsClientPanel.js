Ext.define('FPAgent.view.orders.OrdsClientPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.ordsclientpanel',
	requires : ['FPAgent.view.orders.OrdClientGrid', 'FPAgent.view.orders.TemplGrid'],
	layout : 'fit',
	closable : false,
	items : [{
			hidden : true,
			xtype : 'templgrid'
		}, {
			xtype : 'ordclientgrid'
		}
	]
});
