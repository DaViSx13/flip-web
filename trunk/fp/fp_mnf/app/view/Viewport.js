Ext.define('FpMnf.view.Viewport', {
	extend : 'Ext.container.Viewport',
	layout : 'fit',
	requires : ['Ext.resizer.*', 'Ext.grid.column.*', 'Ext.form.*', 'Ext.layout.container.*'], //for build
	items : [{
			xtype : 'mainpanel'
		}
	]
});
