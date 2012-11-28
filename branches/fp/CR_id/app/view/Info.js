Ext.define('Courier.view.Info', {
	extend : 'Ext.toolbar.Toolbar',
	//extend : 'Ext.container.Container',
	alias : 'widget.info',
	//title: 'infopanel',
	//layout:  { type: 'hbox'},
	height : 50,
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
			text : 'Новых/Всего: '
			,width: '200px'
		}
		
	]
});
