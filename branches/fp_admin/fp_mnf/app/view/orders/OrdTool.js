Ext.define('FpMnf.view.orders.OrdTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.ordtool',
	requires : ['FpMnf.view.mainform.ComboMonth', 'FpMnf.view.mainform.NumYear'],
	items : [{
			text : 'Новый',
			action : 'new'
		}, '-', {
			text : 'Просмотр',
			action : 'view'
		}, '-', {
			text : 'Редактировать',
			action : 'edit'
		},
		'->', '-', {
			xtype : 'numyear'
		}, '-', {
			xtype : 'combomonth'
		}
	]
});
