Ext.define('FpMnf.view.mainform.MainPanel', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.mainpanel',
	requires : ['FpMnf.view.mainform.MnfPanel', 'FpMnf.view.orders.OrdGrid', 'FpMnf.view.orders.OrdWin'],
	activeItem : 0,
	margins : '5 5 5 5',
	initComponent : function () {
		Ext.apply(this, {
			items : [{
					xtype : 'mnfpanel',
					title : 'Манифесты'
				}, {
				
					title : 'Накладные'
					
				}, {
					xtype : 'ordgrid',
					title : 'Заказы'
				}
			]
		});
		this.callParent(arguments);
	}
});
