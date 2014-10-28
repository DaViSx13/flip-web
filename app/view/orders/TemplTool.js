Ext.define('FPAgent.view.orders.TemplTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.templtool',	
	items : [{
			text : 'Новый',
			iconCls : 'newdoc',
			action : 'newtpl'
		}, '-', {
			text : 'Редактировать',
			iconCls : 'editdoc',
			action : 'edittpl'
		}, '-', {
			text : 'Удалить',
			iconCls : 'deldoc',
			action : 'deltpl'
		}
	]
});
