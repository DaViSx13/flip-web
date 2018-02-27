Ext.define('FPClient.view.mainform.MainPanel', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.mainpanel',
	requires : ['FPClient.view.mainform.AdmTool'],
	activeTab : 0,
	margins : '5 5 5 5',
	items : [{
			xtype : 'ordspanel',
			border : false,
			style : {
				borderStyle : 'none'
			},
			title : 'Заказы'
		}, {
			xtype : 'wbsgrid',
			title : 'Накладные'
		}, {
			xtype : 'webwbsgrid',
			title : 'Веб накладные',
			hidden : false
		}, {
			xtype : 'usersgrid',
			title : 'Пользователи',
			itemId : 'users',
			hidden : true
		}
	],
	dockedItems : [{
			xtype : 'admtool',
			dock : 'top'
		}
	]
});
