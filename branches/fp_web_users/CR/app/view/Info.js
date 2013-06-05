Ext.define('Courier.view.Info', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.info',
	height : 50,
	items : [{
			xtype : 'label',
			text : ''
		},
		'->', {
			xtype : 'label',
			itemId : 'refresh',
			text : 'Обновлено: ',
			width : '150px'
		}, {
			xtype : 'label',
			itemId : 'count',
			text : 'Новых/Всего: ',
			width : '150px'
		}
		
	]
});
