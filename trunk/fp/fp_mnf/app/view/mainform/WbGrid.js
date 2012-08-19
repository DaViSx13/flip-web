Ext.define('FpMnf.view.mainform.WbGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.wbgrid',
	autoScroll : true,
	requires : ['FpMnf.view.mainform.TotalWb'],
	initComponent : function () {
		Ext.apply(this, {
			store : 'WbSt',
			columns : [{
					text : '№ Накладной',
					dataIndex : 'wb_no',
					width : 200
				}, {
					text : 'РДД',
					dataIndex : 'dtd',
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
					dataIndex : 'shpcs',
					width : 50
				}, {
					text : 'Вес',
					dataIndex : 'shwt',
					width : 50
				}, {
					text : 'V вес',
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
		this.callParent(arguments);
	}
});
