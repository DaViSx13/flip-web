Ext.define('FPAgent.view.orders.OrdsPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.ordspanel',
	requires : ['FPAgent.view.orders.OrdGrid', 'FPAgent.view.orders.TemplGrid'],
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
