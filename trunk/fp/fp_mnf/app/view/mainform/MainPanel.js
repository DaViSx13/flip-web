Ext.define('FpMnf.view.mainform.MainPanel', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.mainpanel',
	requires : ['FpMnf.view.mainform.MnfPanel'],
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
					title : 'Заказы'
				}
			]
		});
		this.callParent(arguments);
	}
});
