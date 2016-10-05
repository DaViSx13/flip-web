Ext.define('FPClient.view.orders.TemplGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.templgrid',
	requires : ['FPClient.view.orders.TemplTool'],
	store : 'TemplSt',
	columns : [ {
			xtype : 'numbercolumn',
			format : '0',
			dataIndex : 'id',
			text : '№'
		}, {
			xtype : 'gridcolumn',
			flex : 1,
			dataIndex : 'templatename',
			text : 'Наименование'
		}
	],
	dockedItems : [{
			xtype : 'templtool',
			dock : 'top'
		}
	]
});
