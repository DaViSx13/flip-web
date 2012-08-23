Ext.define('FpMnf.view.mainform.MainPanel', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.mainpanel',
	requires : ['FpMnf.view.mainform.MnfPanel', 'FpMnf.view.orders.OrdGrid', 'FpMnf.view.orders.OrdWin'],
	activeTab : 1,
	margins : '5 5 5 5',
	initComponent : function () {
		Ext.apply(this, {
			items : [{
					title : 'Накладные'
				}, {
					xtype : 'ordgrid',
					title : 'Заказы'
				},
                {
					xtype : 'mnfpanel',
					title : 'Манифесты'
				}
			]
		});
		this.callParent(arguments);
	}
});
