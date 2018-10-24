Ext.define('fplk.view.orders.OrdGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.ordgrid',
	requires : ['fplk.view.orders.OrdTool', 'fplk.view.orders.OrdTotal'],
	store : 'OrdsSt',
	columns : [{
			xtype : 'gridcolumn',
			width : 60,
			dataIndex : 'rordnum',
			text : '№'
		}, {
			xtype : 'gridcolumn',
			width : 150,
			dataIndex : 'status',
			text : 'Статус'
		}, {
			xtype : 'datecolumn',
			format : 'd.m.Y',
			width : 70,
			dataIndex : 'datein',
			text : 'Дата ввода'
		}, {
			xtype : 'datecolumn',
			format : 'd.m.Y',
			width : 80,
			dataIndex : 'courdate',
			text : 'Дата приезда'
		}, {
			xtype : 'gridcolumn',
			width : 114,
			dataIndex : 'orgcity',
			text : 'Город'
		}, {
			xtype : 'gridcolumn',
			flex : 1,
			dataIndex : 'cname',
			text : 'Отправитель'
		}, {
			xtype : 'gridcolumn',
			width : 114,
			dataIndex : 'destcity',
			text : 'Город'
		}, {
			xtype : 'gridcolumn',
			flex : 1,
			dataIndex : 'dname',
			text : 'Получатель'
		}, {
			xtype : 'numbercolumn',
			format : '0',
			width : 41,
			dataIndex : 'packs',
			text : 'Кол.'
		}, {
			xtype : 'numbercolumn',
			format : '0.00',
			width : 51,
			dataIndex : 'wt',
			text : 'Вес'
		}, {
			xtype : 'numbercolumn',
			format : '0.00',
			width : 51,
			dataIndex : 'volwt',
			text : 'Об. вес'
		}, {
			xtype : 'gridcolumn',
			width : 70,
			dataIndex : 'wb_no',
			text : '№ накл.'
		}
	],
	dockedItems : [{
			xtype : 'ordtool',
			dock : 'top'
		}, {
			xtype : 'ordtotal',
			dock : 'bottom'
		}
	]
});
