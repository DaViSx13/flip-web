Ext.define('FPAgent.view.orders.OrdTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.ordtool',
	requires : ['FPAgent.view.mainform.ComboMonth', 'FPAgent.view.mainform.NumYear', 'FPAgent.view.mainform.ComboAgent'],
	items : [{
			text : 'Новый',
			iconCls : 'newdoc',
			action : 'new'
		}, '-',{
			text : 'Из шаблона',
			iconCls : 'newtpl',
			action : 'newtpl'
		}, '-', {
			text : 'Просмотр',
			iconCls : 'viewdoc',
			action : 'view'
		}, '-', {
			text : 'Редактировать',
			iconCls : 'editdoc',
			action : 'edit'
		}, '-', {
			text : 'Экспорт в Excel',
			iconCls : 'excel',
			action : 'excel'
		}, '-', {
			text : '№ накладной',
			iconCls : 'wbno',
			action : 'wbno'
		}, '->', '-', {
			xtype : 'numyear'
		}, '-', {
			xtype : 'combomonth'
		}
	]
});
