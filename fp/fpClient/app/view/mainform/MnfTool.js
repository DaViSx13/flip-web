Ext.define('FPClient.view.mainform.MnfTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.mnftool',
	requires : ['FPClient.view.mainform.ComboMonth', 'FPClient.view.mainform.NumYear', 'FPClient.view.mainform.ComboAgent'],
	items : [{
			text : 'Входящие',
			enableToggle : true,
			iconCls : 'outbox',
			action : 'out'
		}, '-', {
			text : 'Исходящие',
			iconCls : 'inbox',
			action : 'in',
			enableToggle : true
		}, '-', {
			text : 'Все',
			enableToggle : true,
			iconCls : 'allbox',
			action : 'all'
		}, '-', '->', '-', {
			xtype : 'numyear'
		}, '-', {
			xtype : 'combomonth'
		}
	]
});
