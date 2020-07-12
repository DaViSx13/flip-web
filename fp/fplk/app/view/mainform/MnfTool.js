Ext.define('fplk.view.mainform.MnfTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.mnftool',
	requires : ['fplk.view.mainform.ComboMonth', 'fplk.view.mainform.NumYear', 'fplk.view.mainform.ComboAgent'],
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
		}, '-', '->', '-',  {
			xtype : 'combomonth'
		}
	]
});
