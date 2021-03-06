Ext.define('fplk.view.wbs.WbsTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.wbstool',
	requires : ['fplk.view.mainform.ComboMonth', 'fplk.view.mainform.NumYear', 'fplk.view.mainform.ComboAgent'],
	items : [{
			xtype : 'buttongroup',
			items : [{
					text : 'Входящие',
					enableToggle : true,
					iconCls : 'outbox',
					action : 'out'
				}, {
					text : 'Остальные',
					action : 'in',
					iconCls : 'inbox',
					enableToggle : true
				}, {
					text : 'Все',
					iconCls : 'allbox',
					enableToggle : true,
					action : 'all'
				}
			]
		}, {
			xtype : 'buttongroup',
			items : [{
					text : 'Внести ПОД',
					iconCls : 'newpod',
					action : 'pod',
					hidden: true
				}, {
					text : 'Новая ИС',
					iconCls : 'newex',
					action : 'ex',
					hidden: true
				}, {
					text : 'Экспорт в Excel',
					iconCls : 'excel',
					action : 'excel'
				}, {
					text : 'Импорт ПОД',
					iconCls : 'import',
					action : 'import',
					hidden: true
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
		}, ' ', {
			text : 'Трэк',
			iconCls : 'track',
			action : 'track'
		}, '->', '-',  {
			xtype : 'combomonth'
		}
	]
});
