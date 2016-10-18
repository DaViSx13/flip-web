Ext.define('FPAgent.view.orders.OrdTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.ordtool',
	requires : ['FPAgent.view.mainform.ComboMonth', 'FPAgent.view.mainform.NumYear', 'FPAgent.view.mainform.ComboAgent'],
	items : [{
			text : FPAgent.lib.Translate.tr("OrdTool.action.new"),//'Новый',
			iconCls : 'newdoc',
			action : 'new'
		}, '-', {
			text : FPAgent.lib.Translate.tr("OrdTool.action.newtpl"),//'Из шаблона',
			iconCls : 'newtpl',
			action : 'newtpl'
		}, '-', {
			text : FPAgent.lib.Translate.tr("OrdTool.action.view"),//'Просмотр',
			iconCls : 'viewdoc',
			action : 'view'
		}, '-', {
			text : FPAgent.lib.Translate.tr("OrdTool.action.edit"),//'Редактировать',
			iconCls : 'editdoc',
			action : 'edit'
		}, '-', {
			text : FPAgent.lib.Translate.tr("OrdTool.action.excel"),//'Экспорт в Excel',
			iconCls : 'excel',
			action : 'excel'
		}, '-', {
			text : FPAgent.lib.Translate.tr("OrdTool.action.import"),//'Импорт из Excel',
			iconCls : 'import',
			action : 'import'
		}, '-', {
			text : FPAgent.lib.Translate.tr("OrdTool.action.wbno"),//'№ накладной',
			iconCls : 'wbno',
			action : 'wbno'
		}, '-', {
			text : FPAgent.lib.Translate.tr("OrdTool.action.wbview"),//'Просмотр накладной',
			iconCls : 'wbview',
			action : 'wbview'
		}, '->', '-', {
			xtype : 'numyear'
		}, '-', {
			xtype : 'combomonth'
		}
	]
});
