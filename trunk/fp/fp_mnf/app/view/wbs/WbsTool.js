Ext.define('FpMnf.view.wbs.WbsTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.wbstool',
	requires : ['FpMnf.view.mainform.ComboMonth', 'FpMnf.view.mainform.NumYear'],
	items : [{
			text : 'Входящие',
			enableToggle : true,
			action : 'out'
		}, '-', {
			text : 'Исходящие',
			action : 'in',
			enableToggle : true
		}, '-', {
			text : 'Все',
			enableToggle : true,
			action : 'all'
		}, '-', '->', '-', {
			xtype : 'numyear'
		}, '-', {
			xtype : 'combomonth'
		}
	]
});
