Ext.define('FPAgent.view.wbs.WbsGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.wbsgrid',
	requires : ['FPAgent.view.wbs.WbsTool', 'FPAgent.view.wbs.WbsTotal'],
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
				text : FPAgent.lib.Translate.tr("WbsGrid.exaction"),//'ИС',
				name : 'exaction',
				width : 40,
				dataIndex : 'is_ex',
				items : [{
						getClass : function (v, meta, rec) {
							if (rec.get('is_ex') > 0) {
								this.items[0].tooltip = FPAgent.lib.Translate.tr("WbsGrid.exaction.tooltip");//'Посмотреть ИС';
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
				text : FPAgent.lib.Translate.tr("WbsGrid.wb_no"),//'Накладная',
				dataIndex : 'wb_no'
			}, {
				text : FPAgent.lib.Translate.tr("WbsGrid.d_acc"),//'Принято',
				dataIndex : 'd_acc',
				xtype : 'datecolumn',
				format : 'd.m.Y'
			}, {
				text : FPAgent.lib.Translate.tr("WbsGrid.dod_txt"),//'Доставлено',
				dataIndex : 'dod_txt'
			}, {
				text : FPAgent.lib.Translate.tr("WbsGrid.rcpn"),//'Получил',
				dataIndex : 'rcpn'
			}, {
				text : FPAgent.lib.Translate.tr("WbsGrid.p_d_in"),//'Подтв.',
				dataIndex : 'p_d_in',
				xtype : 'datecolumn',
				format : 'd.m.Y'
			}, {
				text : 'ORG',
				width : 50,
				dataIndex : 'org'
			}, {
				text : 'DEST',
				width : 50,
				dataIndex : 'dest'
			}, {
				text : FPAgent.lib.Translate.tr("WbsGrid.t_srv"),//'Услуга',
				width : 45,
				dataIndex : 't_srv'
			}, {
				text : FPAgent.lib.Translate.tr("WbsGrid.s_co"),//'Отправитель',
				flex : 1,
				dataIndex : 's_co'
			}, {
				text : FPAgent.lib.Translate.tr("WbsGrid.r_co"),//'Получатель',
				flex : 1,
				dataIndex : 'r_co'
			}, {
				text : FPAgent.lib.Translate.tr("WbsGrid.wt"),//'Вес',
				width : 45,
				dataIndex : 'wt',
				xtype : 'numbercolumn',
				format : '0.00'
			}, {
				text : FPAgent.lib.Translate.tr("WbsGrid.vol_wt"),//'Об.вес',
				width : 45,
				xtype : 'numbercolumn',
				format : '0.00',
				dataIndex : 'vol_wt'
			}, {
				text : FPAgent.lib.Translate.tr("WbsGrid.tar_flip"),//'Тариф Флип',
				columns : [{
						text : FPAgent.lib.Translate.tr("WbsGrid.tar_flip_b"),//'баз.',
						width : 45,
						xtype : 'numbercolumn',
						format : '0.00',
						dataIndex : 'tar_flip_b'
					}, {
						text : FPAgent.lib.Translate.tr("WbsGrid.tar_flip_a"),//'доп.',
						width : 45,
						xtype : 'numbercolumn',
						format : '0.00',
						dataIndex : 'tar_flip_a'
					}, {
						text : FPAgent.lib.Translate.tr("WbsGrid.tar_flip_t"),//'Всего',
						width : 45,
						xtype : 'numbercolumn',
						format : '0.00',
						dataIndex : 'tar_flip_t'
					}, {
						text : FPAgent.lib.Translate.tr("WbsGrid.rem_flip"),//'прим.',
						dataIndex : 'rem_flip'
					}
				]
			}, {
				text : FPAgent.lib.Translate.tr("WbsGrid.tar_ag"),//'Тариф Аг',
				columns : [{
						text : FPAgent.lib.Translate.tr("WbsGrid.tar_ag_b"),//'баз.',
						width : 45,
						xtype : 'numbercolumn',
						format : '0.00',
						dataIndex : 'tar_ag_b'
					}, {
						text : FPAgent.lib.Translate.tr("WbsGrid.tar_ag_a"),//'доп.',
						width : 45,
						xtype : 'numbercolumn',
						format : '0.00',
						dataIndex : 'tar_ag_a'
					}, {
						text : FPAgent.lib.Translate.tr("WbsGrid.tar_ag_t"),//'Всего',
						width : 45,
						xtype : 'numbercolumn',
						format : '0.00',
						dataIndex : 'tar_ag_t'
					}, {
						text : FPAgent.lib.Translate.tr("WbsGrid.rem_ag"),//'прим.',
						dataIndex : 'rem_ag'
					}
				]
			}, {
				xtype : 'numbercolumn',
				text : FPAgent.lib.Translate.tr("WbsGrid.req_tar_a"),//'Заявка',
				itemId : 'dop',
				dataIndex : 'req_tar_a',
				width : 45,
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
