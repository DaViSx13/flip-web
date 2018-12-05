Ext.define('FPAgent.view.mainform.MnfTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.mnftool',
	requires : ['FPAgent.view.mainform.ComboMonth', 'FPAgent.view.mainform.NumYear', 'FPAgent.view.mainform.ComboAgent'],
	items : [{
			text : FPAgent.lib.Translate.tr("MnfTool.out"),//'Входящие',
			enableToggle : true,
			iconCls : 'outbox',
			action : 'out'
		}, '-', {
			text : FPAgent.lib.Translate.tr("MnfTool.in"),//'Исходящие',
			iconCls : 'inbox',
			action : 'in',
			enableToggle : true
		}, '-', {
			text : FPAgent.lib.Translate.tr("MnfTool.all"),//'Все',
			enableToggle : true,
			iconCls : 'allbox',
			action : 'all'
		}, '-',
		{
			text : FPAgent.lib.Translate.tr("WbsTool.excel"),//'Экспорт в Excel',
			iconCls : 'excel',
			action : 'excel'
				},
		 '->', '-', {
			xtype : 'numyear'
		}, '-', {
			xtype : 'combomonth'
		}
	]
});
