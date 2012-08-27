Ext.define('Courier.view.Main', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.mainview',
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	items : [{
			xtype : 'info'
		}, {
			/*title : 'grid',
			html : 'основа',*/
			xtype : 'uchetlist',
			flex : 1
		}
	]
});
