Ext.define('FPClient.view.mainform.MnfPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.mnfpanel',
	requires : ['FPClient.view.mainform.MnfGrid', 'FPClient.view.mainform.WbGrid'],
	layout : 'border',
	closable : false,
	items : [{
			flex : 1,
			minHeight : 250,
			region : 'center',
			xtype : 'mnfgrid'
		}, {
			flex : 1,
			split : true,
			region : 'south',
			xtype : 'wbgrid'
		}
	]
});
