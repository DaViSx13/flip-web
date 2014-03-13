Ext.define('FPAgent.view.wbs.WbsTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.wbstool',
	requires : ['FPAgent.view.mainform.ComboMonth', 'FPAgent.view.mainform.NumYear', 'FPAgent.view.mainform.ComboAgent'],
	items : [{
			xtype : 'buttongroup',
			items : [{
					text : 'Входящие',
					enableToggle : true,
					iconCls : 'outbox',
					action : 'out'
				}, {
					text : 'Исходящие',
					action : 'in',
					iconCls : 'inbox',
					enableToggle : true
				}, {
					text : 'Все',
					iconCls : 'allbox',
					enableToggle : true,
					action : 'all'
				}, {
					text : 'Просрочено',
					iconCls : 'overduebox',
					enableToggle : true,
					action : 'overdue'
				}
			]
		}, {
			xtype : 'buttongroup',
			items : [{
					text : 'Внести ПОД',
					iconCls : 'newpod',
					action : 'pod'
				}, {
					text : 'Новая ИС',
					iconCls : 'newex',
					action : 'ex'
				}, {
					text : 'Экспорт в Excel',
					iconCls : 'excel',
					action : 'excel'
				}, {
					text : 'Импорт ПОД',
					iconCls : 'import',
					action : 'import'
				}
			]
		}, '-', {
			xtype : 'textfield',
			width : 120,
			emptyText : '№ накладной',
			name : 'filteredit'
		}, ' ', {
			text : 'Фильтр',
			iconCls : 'filter',
			action : 'filter'
		}, '->', '-', {
			xtype : 'numyear'
		}, '-', {
			xtype : 'combomonth'
		}
	]
});
