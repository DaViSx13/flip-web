Ext.define('FPAgent.view.mainform.WbGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.wbgrid',
	autoScroll : true,
	requires : ['FPAgent.view.mainform.TotalWb'],
	store : 'WbSt',
	columns : [{
			text : '№ Накладной',
			dataIndex : 'wb_no',
			width : 200
		}, {
			text : 'РДД',
			dataIndex : 'dtd',
			xtype : 'datecolumn',
			format : 'd.m.Y',
			width : 200
		}, {
			text : 'ORG',
			dataIndex : 'org',
			width : 50
		}, {
			text : 'Отправитель',
			dataIndex : 's_co',
			flex : 1
		}, {
			text : 'DEST',
			dataIndex : 'dest',
			width : 50
		}, {
			text : 'Получатель',
			dataIndex : 'r_co',
			flex : 1
		}, {
			text : 'Мест',
			xtype : 'numbercolumn',
			format : '0',
			dataIndex : 'shpcs',
			width : 50
		}, {
			text : 'Вес',
			xtype : 'numbercolumn',
			format : '0.00',
			dataIndex : 'shwt',
			width : 50
		}, {
			text : 'V вес',
			xtype : 'numbercolumn',
			format : '0.00',
			dataIndex : 'shvol_wt',
			width : 50
		}
	],
	dockedItems : [{
			xtype : 'totalwb',
			dock : 'bottom'
		}
	]
});
