Ext.define('FPAgent.view.Viewport', {
	extend : 'Ext.container.Viewport',
	layout : 'fit',
	alias : 'widget.fpmnfviewport',
	requires : ['Ext.resizer.*', 'Ext.grid.column.*', 'Ext.form.*', 'Ext.layout.container.*', 'Ext.Toolbar.Spacer', 'Ext.ButtonGroup'], //for build
	items : [{
			xtype : 'loginformcontainer'
		}
	]
});
