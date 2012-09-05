Ext.define('FpMnf.view.Viewport', {
	extend : 'Ext.container.Viewport',
	layout : 'fit',
	alias : 'widget.fpmnfviewport',
	requires : ['Ext.resizer.*', 'Ext.grid.column.*', 'Ext.form.*', 'Ext.layout.container.*'], //for build
	items : [{
			//xtype : 'mainpanel'
			xtype : 'loginformcontainer'
		}
	]
});
