Ext.define('Courier.view.Main', {
	extend : 'Ext.container.Container',
	alias : 'widget.main',
	requires : ['Courier.view.UchetList'],
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	items : [/*{
		xtype : 'info'
		},*/
		{
			xtype : 'uchetlist',
			flex : 1
		}
	]
});
