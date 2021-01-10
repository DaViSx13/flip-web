Ext.define('fplk.view.orders.OrdExGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.ordexgrid',
	autoScroll : true,
	store : 'OrdExStore',
	columns : [{
			text : '№',
			dataIndex : 'agordno'
		}, {
			text : 'Код',
			dataIndex : 'excode'
		}, {
			text : 'Трек',
			dataIndex : 'loc'
		}, {
			text : 'Описание',
			flex : 1,
			dataIndex : 'exdesc'
		}, {
			text : 'Дата события',
			dataIndex : 'raised_txt'
		}
	]
});
