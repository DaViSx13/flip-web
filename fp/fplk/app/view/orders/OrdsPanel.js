Ext.define('FPClient.view.orders.OrdsPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.ordspanel',
	requires : ['FPClient.view.orders.OrdGrid', 'FPClient.view.orders.TemplGrid'],
	layout : 'fit',
	closable : false,
	items : [{
			hidden : true,
			xtype : 'templgrid'
		}, {
			xtype : 'ordgrid'
		}
	]
});
