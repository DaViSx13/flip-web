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
