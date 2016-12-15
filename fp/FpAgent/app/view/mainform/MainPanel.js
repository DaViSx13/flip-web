Ext.define('FPAgent.view.mainform.MainPanel', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.mainpanel',
	requires : ['FPAgent.view.mainform.AdmTool'],
	activeTab : 1,
	margins : '5 5 5 5',
	items : [{
			xtype : 'wbsgrid',
			title : FPAgent.lib.Translate.tr("MainPanel.wbsgrid")//'Накладные'
		}, {
			xtype : 'ordspanel',
			border : false,
			style : {
				borderStyle : 'none'
			},
			title : FPAgent.lib.Translate.tr("MainPanel.ordspanel")//'Заказы'
		}, {
			xtype : 'mnfpanel',
			title : FPAgent.lib.Translate.tr("MainPanel.mnfpanel")//'Манифесты'
		}, {
			xtype : 'usersgrid',
			title : FPAgent.lib.Translate.tr("MainPanel.usersgrid"),//'Пользователи',
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
