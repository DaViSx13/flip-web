Ext.define('Courier.view.Actions', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.actions',
	items : [{
			//tooltip :'Строку вверх',
			scale : 'large',
			iconCls : 'up',
			action : 'up'
		}, {
			//tooltip :'Строку вниз',
			iconCls : 'down',
			scale : 'large',
			action : 'down'
		}, {
			//tooltip :'Просмотр',
			iconCls : 'view',
			scale : 'large',
			action : 'view'
		}, {
			//tooltip :'Просмотр',
			//iconCls : 'view',
			text: 'ЯК',
			scale : 'large',
			action : 'yamap'
		},
		'->', {
			xtype : 'button',
			text : 'test',
			action : 'test'
		}, {
			xtype : 'button',
			text : 'clearLS',
			action : 'clearLS'
		}
		
	]
});
