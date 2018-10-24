Ext.define('fplk.view.wbs.WbsGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.wbsgrid',
	requires : ['fplk.view.wbs.WbsTool', 'fplk.view.wbs.WbsTotal'],
	store : 'WbsStore',
	change : function (val) {
		if (val > 0) {
			return '<span style="color:green; cursor: pointer;">' + val + '</span>';
		} else if (val == 0) {
			return '<img src="resources/images/dop.gif" style="cursor: pointer;" alt="dop" />';
		}
		return val;
	},
	autoScroll : true,
	loadMask : true,
	selModel : {
		pruneRemoved : false
	},
	viewConfig : {
		trackOver : false
	},
	initComponent : function () {
		this.columns = [{
				xtype : 'actioncolumn',
				text : 'ИС',
				name : 'exaction',
				width : 40,
				items : [{
						getClass : function (v, meta, rec) {
							if (rec.get('is_ex') > 0) {
								this.items[0].tooltip = 'Посмотреть ИС';
								return 'ex-col';
							}
						},
						handler : function (grid, rowIndex, colIndex, node, e, record, rowNode) {
							var action = 'exaction';
							this.fireEvent('itemclick', this, action, grid, rowIndex, colIndex, record, node);
						}
					}
				]
			}, {
				text : 'Накладная',
				dataIndex : 'wb_no'
			}, {
				text : 'Принято',
				dataIndex : 'd_acc',
				xtype : 'datecolumn',
				format : 'd.m.Y'
			}, {
				text : 'Доставлено',
				dataIndex : 'dod_txt'
			}, {
				text : 'Получил',
				dataIndex : 'rcpn'
			}, {
				text : 'ORG',
				width : 50,
				dataIndex : 'org'
			}, {
				text : 'DEST',
				width : 50,
				dataIndex : 'dest'
			}, {
				text : 'Отправитель',
				flex : 1,
				dataIndex : 's_co'
			}, {
				text : 'Получатель',
				flex : 1,
				dataIndex : 'r_co'
			}, {
				text : 'Вес',
				width : 45,
				dataIndex : 'wt',
				xtype : 'numbercolumn',
				format : '0.00'
			}, {
				text : 'Об.вес',
				width : 45,
				xtype : 'numbercolumn',
				format : '0.00',
				dataIndex : 'vol_wt'
			}
		];
		this.dockedItems = [{
				xtype : 'wbstool',
				dock : 'top'
			}, {
				xtype : 'wbstotal',
				dock : 'bottom'
			}
		];
		this.callParent(arguments);
	}
});
