Ext.define('FPAgent.view.mainform.MainPanel', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.mainpanel',
	requires : ['FPAgent.view.mainform.AdmTool'],
	activeTab : 1,
	margins : '5 5 5 5',
	items : [{
			xtype : 'wbsgrid',
			title : 'Накладные'
		}, {
			xtype : 'ordspanel',
			border: false,
			style: {    
					borderStyle: 'none'
			},
			title : 'Заказы'
		}, {
			xtype : 'mnfpanel',
			title : 'Манифесты'
		}
	],
	dockedItems : [{
			xtype : 'admtool',
			dock : 'top'
		}
	]
});
