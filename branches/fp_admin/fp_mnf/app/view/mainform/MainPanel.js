Ext.define('FpMnf.view.mainform.MainPanel', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.mainpanel',
	activeTab : 1,
	margins : '5 5 5 5',
	items : [{
			xtype : 'wbsgrid',
			title : 'Накладные'
		}, {
			xtype : 'ordgrid',
			title : 'Заказы'
		}, {
			xtype : 'mnfpanel',
			title : 'Манифесты'
		}
	]
});
