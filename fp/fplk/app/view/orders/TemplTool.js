Ext.define('fplk.view.orders.TemplTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.templtool',	
	items : [{
			text : 'Новый',
			iconCls : 'newdoc',
			action : 'newtpl'
		}, '-', {
			text : 'Редактировать',
			iconCls : 'editdoc',
			action : 'edittpl'
		}, '-', {
			text : 'Удалить',
			iconCls : 'deldoc',
			action : 'deltpl'
		}, '-', {
			xtype: 'textfield',
			emptyText: "Наименование",
			name: "filterByName"
		}, '-', {
         	text: "Импорт",
         	iconCls : 'import',
         	action: "importFromExcel"
        }, '-', {
			text : 'Экспорт в Excel',
			iconCls : 'excel',
			action : 'export'
	}]
});
