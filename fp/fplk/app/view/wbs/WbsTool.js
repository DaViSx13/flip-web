Ext.define('fplk.view.wbs.WbsTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.wbstool',
	requires : ['fplk.view.mainform.ComboMonth', 'fplk.view.mainform.NumYear', 'fplk.view.mainform.ComboAgent'],
	items : [{
			xtype : 'buttongroup',
			hidden: true,
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
			hidden: true,
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