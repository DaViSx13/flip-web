Ext.define('FPAgent.view.orders.OrdClientGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.ordclientgrid',
	requires: ['FPAgent.view.orders.OrdClientTool', 'FPAgent.view.orders.OrdClientTotal'],
	store: 'OrdsClientSt',
	viewConfig: {
		getRowClass: function (record) {
			return (record.data.status === 'просрочено') ?  'red-row' : '';
		}
	},
	columns: [{
			xtype: 'gridcolumn',
			width: 55,
			dataIndex: 'rordnum',
			text: '№'
		}, {
			xtype: 'gridcolumn',
			width: 130,
			dataIndex: 'status',
			text: FPAgent.lib.Translate.tr("OrdGrid.status") //'Статус'
		}, {
			xtype: 'gridcolumn',
			width: 80,
			dataIndex: 'wb_no',
			text: FPAgent.lib.Translate.tr("OrdGrid.wb_no") //'№ накл.'
		}, {
			xtype: 'datecolumn',
			format: 'd.m.Y',
			width: 70,
			dataIndex: 'datein',
			text: FPAgent.lib.Translate.tr("OrdGrid.datein") //'Дата'
		}, {
			xtype: 'gridcolumn',
			width: 114,
			dataIndex: 'orgcity',
			text: FPAgent.lib.Translate.tr("OrdGrid.orgcity") //'Город'
		}, {
			xtype: 'gridcolumn',
			flex: 1,
			dataIndex: 'cname',
			text: FPAgent.lib.Translate.tr("OrdGrid.cname") //'Отправитель'
		}, {
			xtype: 'gridcolumn',
			width: 114,
			dataIndex: 'destcity',
			text: FPAgent.lib.Translate.tr("OrdGrid.destcity") //'Город'
		}, {
			xtype: 'gridcolumn',
			flex: 1,
			dataIndex: 'dname',
			text: FPAgent.lib.Translate.tr("OrdGrid.dname") //'Получатель'
		}, {
			xtype: 'numbercolumn',
			format: '0',
			width: 41,
			dataIndex: 'packs',
			text: FPAgent.lib.Translate.tr("OrdGrid.packs") //'Кол.'
		}, {
			xtype: 'numbercolumn',
			format: '0.00',
			width: 51,
			dataIndex: 'wt',
			text: FPAgent.lib.Translate.tr("OrdGrid.wt") //'Вес'
		}, {
			xtype: 'numbercolumn',
			format: '0.00',
			width: 51,
			dataIndex: 'volwt',
			text: FPAgent.lib.Translate.tr("OrdGrid.volwt") //'Об. вес'
		}
	],
	dockedItems: [{
			xtype: 'ordclienttool',
			dock: 'top'
		}, {
			xtype: 'ordclienttotal',
			dock: 'bottom'
		}
	]
});
