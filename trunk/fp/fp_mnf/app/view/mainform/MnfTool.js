Ext.define('FpMnf.view.mainform.MnfTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.mnftool',
	requires : ['FpMnf.view.mainform.ComboMonth', 'FpMnf.view.mainform.NumYear', 'FpMnf.view.mainform.ComboAgent'],
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
