Ext.define('FPAgent.view.orders.OrdClientTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.ordclienttool',
	requires : ['FPAgent.view.mainform.ComboMonth', 'FPAgent.view.mainform.NumYear', 'FPAgent.view.mainform.ComboAgent'],
	items : [{
			text : FPAgent.lib.Translate.tr("OrdTool.action.wbno"),//'№ накладной',
			iconCls : 'wbno',
			action : 'wbno'
		}, '-', {
			text : FPAgent.lib.Translate.tr("OrdTool.action.wbview"),//'Просмотр накладной',
			hidden:true,
			iconCls : 'wbview',
			action : 'wbview'
		}, '->', '-', {
			xtype : 'numyear'
		}, '-', {
			xtype : 'combomonth'
		}
	]
});
