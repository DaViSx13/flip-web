Ext.define('FPAgent.view.mainform.MnfGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.mnfgrid',
	requires : ['FPAgent.view.mainform.MnfTool', 'FPAgent.view.mainform.TotalTool'],
	store : 'MnfSt',
	columns : [{
			text : 'Манифест',
			dataIndex : 'mnfrefno'
		}, {
			text : 'Отправлено',
			dataIndex : 'shpd',
			xtype : 'datecolumn',
			format : 'd.m.Y',
			width : 180
		}, {
			text : 'РДП',
			dataIndex : 'dtarr',
			xtype : 'datecolumn',
			format : 'd.m.Y H:i',
			width : 180
		}, {
			text : 'Доставлено',
			dataIndex : 'darr',
			xtype : 'datecolumn',
			format : 'd.m.Y H:i',
			width : 180
		}, {
			text : 'ORG',
			dataIndex : 'orgtrk',
			width : 50
		}, {
			text : 'DEST',
			dataIndex : 'desttrk',
			width : 50
		}, {
			text : 'Мест',
			dataIndex : 'bpcs',
			xtype : 'numbercolumn',
			format : '0',
			width : 50
		}, {
			text : 'Вес',
			xtype : 'numbercolumn',
			format : '0.00',
			dataIndex : 'bwt',
			width : 50
		}, {
			text : 'V вес',
			xtype : 'numbercolumn',
			format : '0.00',
			dataIndex : 'bvwt',
			width : 50
		}, {
			text : 'Перевозчик',
			dataIndex : 'descr',
			flex : 1
		}
	],
	dockedItems : [{
			xtype : 'mnftool',
			dock : 'top'
		}, {
			xtype : 'totaltool',
			dock : 'bottom'
		}
	]
});
