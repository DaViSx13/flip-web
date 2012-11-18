Ext.define('FPAgent.view.orders.OrdTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.ordtool',
	requires : ['FPAgent.view.mainform.ComboMonth', 'FPAgent.view.mainform.NumYear', 'FPAgent.view.mainform.ComboAgent'],
	items : [{
			text : 'Новый',
			iconCls : 'newdoc',
			action : 'new'
		}, '-', {
			text : 'Просмотр',
			iconCls : 'viewdoc',
			action : 'view'
		}, '-', {
			text : 'Редактировать',
			iconCls : 'editdoc',
			action : 'edit'
		}, '-', '->', '-', {
			xtype : 'numyear'
		}, '-', {
			xtype : 'combomonth'
		}
	]
});
