Ext.define('Courier.view.Viewport', {
	extend : 'Ext.container.Viewport',
	layout : 'fit',
	requires : ['Ext.resizer.*', 'Ext.grid.column.*', 'Ext.form.*', 'Ext.layout.container.*', 'Ext.grid.plugin.DragDrop', 'Ext.grid.ViewDropZone', 'Ext.data.proxy.LocalStorage', 'Ext.data.proxy.WebStorage', 'Ext.data.SequentialIdGenerator'],
	items : [{
			xtype : 'loginformcontainer'
		}
	]
});
