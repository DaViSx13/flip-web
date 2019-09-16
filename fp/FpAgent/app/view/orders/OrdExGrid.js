Ext.define('FPAgent.view.orders.OrdExGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.ordexgrid',
	autoScroll : true,
	store : 'OrdExStore',
	columns : [{
			text : '№',
			dataIndex : 'agordno'
		}, {
			text : FPAgent.lib.Translate.tr("ViewExGrid.excode"),//'Код',
			dataIndex : 'excode'
		}, {
			text : FPAgent.lib.Translate.tr("ViewExGrid.loc"),//'Трек',
			dataIndex : 'loc'
		}, {
			text : FPAgent.lib.Translate.tr("ViewExGrid.exdesc"),//'Описание',
			flex : 1,
			dataIndex : 'exdesc'
		}, {
			text : FPAgent.lib.Translate.tr("ViewExGrid.raised_txt"),//'Дата события',
			dataIndex : 'raised_txt'
		}
	]
});
