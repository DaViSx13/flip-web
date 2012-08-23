Ext.define('FpMnf.view.mainform.MnfTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.mnftool',
	requires : ['FpMnf.view.mainform.ComboMonth', 'FpMnf.view.mainform.NumYear'],
	initComponent : function () {
		Ext.apply(this, {
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
		this.callParent(arguments);
	}
});
