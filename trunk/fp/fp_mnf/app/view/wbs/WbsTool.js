Ext.define('FpMnf.view.wbs.WbsTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.wbstool',
	requires : ['FpMnf.view.mainform.ComboMonth', 'FpMnf.view.mainform.NumYear', 'Ext.ButtonGroup', 'FpMnf.view.mainform.ComboAgent'],
	items : [{
			xtype : 'buttongroup',
			items : [{
					text : 'Исходящие',
					enableToggle : true,
					action : 'out'
				}, {
					text : 'Входящие',
					action : 'in',
					enableToggle : true
				}, {
					text : 'Все',
					enableToggle : true,
					action : 'all'
				}
			]
		}, {
			xtype : 'buttongroup',
			items : [{
					text : 'Внести ПОД',
					action : 'pod'
				}, {
					text : 'Новая ИС',
					action : 'ex'
				}
			]
		}, {
			xtype : 'buttongroup',
			itemId : 'admgroup',
			items : [
			{xtype : 'comboagent'}
			],
			hidden : true,
			style : {
				marginLeft : '20px',
				marginRight : '20px'
			}
		}, '->', '-', {
			xtype : 'numyear'
		}, '-', {
			xtype : 'combomonth'
		}
	]
});
