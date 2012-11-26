Ext.define('Courier.view.Info', {
	extend : 'Ext.toolbar.Toolbar',
//	extend : 'Ext.container.Container',
	alias : 'widget.info',
	//title: 'infopanel',
//	layout:  { type: 'hbox'},
	items : [{
			xtype : 'label',
			text : ''
		}
		, '-'
		, {
			text : 'Выход',
			action : 'logout'
		}
		, '->'
		,
		{
			xtype : 'label',
			itemId : 'count',
			text : ''
		}
		
	]
});
