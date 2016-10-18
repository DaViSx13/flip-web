Ext.define('FPAgent.view.orders.TemplTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.templtool',	
	items : [{
			text : FPAgent.lib.Translate.tr("TemplTool.newtpl"),//'Новый',
			iconCls : 'newdoc',
			action : 'newtpl'
		}, '-', {
			text : FPAgent.lib.Translate.tr("TemplTool.edittpl"),//'Редактировать',
			iconCls : 'editdoc',
			action : 'edittpl'
		}, '-', {
			text : FPAgent.lib.Translate.tr("TemplTool.deltpl"),//'Удалить',
			iconCls : 'deldoc',
			action : 'deltpl'
		}
	]
});
