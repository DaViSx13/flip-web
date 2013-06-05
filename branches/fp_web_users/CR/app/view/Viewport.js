Ext.define('Courier.view.Viewport', {
	extend : 'Ext.container.Viewport',
	layout : 'fit',
	//requires : ['Ext.data.proxy.LocalStorage', 'Ext.grid.column.Action', 'Ext.form.Label', 'Ext.layout.container.Form', 'Ext.form.FieldSet', 'Ext.form.field.Number', 'Ext.form.field.Time'], //for build
	items : [{
			xtype : 'loginformcontainer'
		}
	]
});
