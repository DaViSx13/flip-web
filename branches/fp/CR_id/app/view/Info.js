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
		}, '-'
		, {
			text : 'testBtn',
			action : 'testbtn'
		}
		, '->'
		,
		{
			xtype : 'label',
			itemId : 'refresh',
			text : 'Обновлено: '
			,width: '150px'
		},
		{
			xtype : 'label',
			itemId : 'count',
			text : 'Новых/Всего: '
			,width: '150px'
		}
		
	]
});
