Ext.define('FPAgent.view.orders.OrdGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.ordgrid',
	requires: ['FPAgent.view.orders.OrdTool', 'FPAgent.view.orders.OrdTotal'],
	store: 'OrdsSt',
	columns: [{
			xtype: 'actioncolumn',
			text: FPAgent.lib.Translate.tr("WbsGrid.exaction"), //'ИС',
			name: 'exaction',
			width: 40,
			dataIndex: 'is_ex',
			items: [{
					getClass: function (v, meta, rec) {
						if (rec.get('is_ex') > 0) {
							this.items[0].tooltip = FPAgent.lib.Translate.tr("WbsGrid.exaction.tooltip"); //'Посмотреть ИС';
							return 'ex-col';
						}
					},
					handler: function (grid, rowIndex, colIndex, node, e, record, rowNode) {
						var action = 'exaction';
						this.fireEvent('itemclick', this, action, grid, rowIndex, colIndex, record, node);
					}
				}

			]
		}, {
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
			xtype: 'ordtool',
			dock: 'top'
		}, {
			xtype: 'ordtotal',
			dock: 'bottom'
		}
	]
});
