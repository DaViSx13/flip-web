Ext.define('FpMnf.view.wbs.WbsGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.wbsgrid',
	requires : ['FpMnf.view.wbs.WbsTool', 'FpMnf.view.wbs.WbsTotal'],
	store : 'WbsStore',
	change : function (val) {
		if (val > 0) {
			return '<span style="color:green; cursor: pointer;">' + val + '</span>';
		} else if (val == 0) {
			return '<img src="/fp_mnf/resources/images/dop.gif" style="cursor: pointer;" alt="dop" />';
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
				width : 50,
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
				dataIndex : 'd_acc_txt'
			}, {
				text : 'Доставлено',
				dataIndex : 'dod_txt'
			}, {
				text : 'Получил',
				dataIndex : 'rcpn'
			}, {
				text : 'Подтв.',
				dataIndex : 'p_d_in_txt'
			}, {
				text : 'ORG',
				dataIndex : 'org'
			}, {
				text : 'DEST',
				dataIndex : 'dest'
			}, {
				text : 'Услуга',
				dataIndex : 't_srv'
			}, {
				text : 'Отправитель',
				dataIndex : 's_co'
			}, {
				text : 'Получатель',
				dataIndex : 'r_co'
			}, {
				text : 'Вес',
				dataIndex : 'wt',
				xtype : 'numbercolumn',
				format : '0.00'
			}, {
				text : 'Об.вес',
				xtype : 'numbercolumn',
				format : '0.00',
				dataIndex : 'vol_wt'
			}, {
				text : 'Тариф Флип',
				columns : [{
						text : 'баз.',
						xtype : 'numbercolumn',
						format : '0.00',
						dataIndex : 'tar_flip_b'
					}, {
						text : 'доп.',
						xtype : 'numbercolumn',
						format : '0.00',
						dataIndex : 'tar_flip_a'
					}, {
						text : 'Всего',
						xtype : 'numbercolumn',
						format : '0.00',
						dataIndex : 'tar_flip_t'
					}, {
						text : 'прим.',
						dataIndex : 'rem_flip'
					}
				]
			}, {
				text : 'Тариф Аг',
				columns : [{
						text : 'баз.',
						xtype : 'numbercolumn',
						format : '0.00',
						dataIndex : 'tar_ag_b'
					}, {
						text : 'доп.',
						xtype : 'numbercolumn',
						format : '0.00',
						dataIndex : 'tar_ag_a'
					}, {
						text : 'Всего',
						xtype : 'numbercolumn',
						format : '0.00',
						dataIndex : 'tar_ag_t'
					}, {
						text : 'прим.',
						dataIndex : 'rem_ag'
					}
				]
			}, {
				xtype : 'numbercolumn',
				text : 'Заявка',
				itemId : 'dop',
				dataIndex : 'req_tar_a',
				width : 50,
				renderer : this.change
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
