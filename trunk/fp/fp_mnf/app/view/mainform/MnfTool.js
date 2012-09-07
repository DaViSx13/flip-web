Ext.define('FpMnf.view.mainform.MnfTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.mnftool',
	requires : ['FpMnf.view.mainform.ComboMonth', 'FpMnf.view.mainform.NumYear', 'FpMnf.view.mainform.ComboAgent'],
	items : [{
			text : 'Входящие',
			enableToggle : true,
			action : 'out'
		}, '-', {
			text : 'Исходящие',
			action : 'in',
			enableToggle : true
		}, '-', {
			text : 'Все',
			enableToggle : true,
			action : 'all'
		}, '-', /*{
			xtype : 'buttongroup',
			itemId : 'admgroup',
			items : [{
					xtype : 'comboagent'
				}
			],
			hidden : true,
			style : {
				marginLeft : '20px',
				marginRight : '20px'
			}
		},*/ '->', '-', {
			xtype : 'numyear'
		}, '-', {
			xtype : 'combomonth'
		}
	]
});
