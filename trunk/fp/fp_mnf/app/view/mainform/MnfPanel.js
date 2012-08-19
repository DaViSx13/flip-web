Ext.define('FpMnf.view.mainform.MnfPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.mnfpanel',
	requires : ['FpMnf.view.mainform.MnfGrid', 'FpMnf.view.mainform.WbGrid'],
	layout : 'border',
	closable : false,
	initComponent : function () {
		Ext.apply(this, {
			items : [{
					flex : 2,
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
		this.callParent(arguments);
	}
});
