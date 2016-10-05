Ext.define('FPClient.view.orders.OrdTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.ordtool',
	requires : ['FPClient.view.mainform.ComboMonth', 'FPClient.view.mainform.NumYear', 'FPClient.view.mainform.ComboAgent'],
	items : [{
			text : 'Новый',
			iconCls : 'newdoc',
			action : 'new'
		}, '-', {
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
			action : 'excel',
			hidden: true
		}, /*'-',*/ {
			text : '№ накладной',
			iconCls : 'wbno',
			action : 'wbno',
			hidden: true
		}, /*'-',*/ {
			text : 'Просмотр накладной',
			iconCls : 'wbview',
			action : 'wbview'
		}, '->', '-', {
			xtype : 'numyear'
		}, '-', {
			xtype : 'combomonth'
		}
	]
});
