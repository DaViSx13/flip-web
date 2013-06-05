Ext.define('Courier.view.Actions', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.actions',
	items : [{
			//tooltip :'Строку вверх',
			scale : 'large',
			iconCls : 'up',
			action : 'up',
			disabled : true
		}, {
			//tooltip :'Строку вниз',
			iconCls : 'down',
			scale : 'large',
			action : 'down',
			disabled : true
		}, {
			//tooltip :'Просмотр',
			iconCls : 'view',
			scale : 'large',
			action : 'view'
		}, {
			//tooltip :'Просмотр',
			//iconCls : 'view',
			text : 'ЯК',
			scale : 'large',
			action : 'yamap'
		}, '->', {
			text : 'Всё',
			action : 'readall'
		}, '-', {
			text : 'Выход',
			action : 'logout'
		}
		/*,
		'->', {
		xtype : 'button',
		text : 'test',
		action : 'test'
		}, {
		xtype : 'button',
		text : 'clearLS',
		action : 'clearLS'
		}
		 */
	]
});
