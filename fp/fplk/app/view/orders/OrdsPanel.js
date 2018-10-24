Ext.define('fplk.view.orders.OrdsPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.ordspanel',
	requires : ['fplk.view.orders.OrdGrid', 'fplk.view.orders.TemplGrid'],
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
