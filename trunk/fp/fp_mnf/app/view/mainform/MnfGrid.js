Ext.define('FpMnf.view.mainform.MnfGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.mnfgrid',
	requires : ['FpMnf.view.mainform.MnfTool', 'FpMnf.view.mainform.TotalTool'],
	initComponent : function () {
		Ext.apply(this, {
			store : 'MnfSt',
			columns : [{
					text : 'Манифест',
					dataIndex : 'mnfrefno',
					width : 200
				}, {
					text : 'Перевозчик',
					dataIndex : 'descr',
					flex : 1
				}, {
					text : 'Отправлено',
					dataIndex : 'shpd',
					width : 200
				}, {
					text : 'РДП',
					dataIndex : 'dtarr',
					width : 200
				}, {
					text : 'Доставлено',
					dataIndex : 'darr',
					width : 200
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
					width : 50
				}, {
					text : 'Вес',
					dataIndex : 'bwt',
					width : 50
				}, {
					text : 'V вес',
					dataIndex : 'bvwt',
					width : 50
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
		this.callParent(arguments);
	}
});
