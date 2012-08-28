Ext.define('FpMnf.view.wbs.WbsGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.wbsgrid',
	requires : ['FpMnf.view.wbs.WbsTool'/*, 'FpMnf.view.mainform.TotalTool'*/],
	store : 'WbsStore',
	columns : [{
			text : 'ИС',
			dataIndex : 'is_ex' 
		},{
			text : 'Накладная',
			dataIndex : 'wb_no'
		},{
			text : 'Принято',
			dataIndex : 'd_acc_txt'
		},{
			text : 'Доставлено',
			dataIndex : 'dod_txt'
		},{
			text : 'Получил',
			dataIndex : 'rcpn'
		},{
			text : 'Подтв.',
			dataIndex : 'p_d_in_txt'
		},{
			text : 'ORG',
			dataIndex : 'org'
		},{
			text : 'DEST',
			dataIndex : 'dest'
		},{
			text : 'Услуга',
			dataIndex : 't_srv'
		},{
			text : 'Отправитель',
			dataIndex : 's_co'
		},{
			text : 'Получатель',
			dataIndex : 'r_co'
		},{
			text : 'Вес',
			dataIndex : 'wt'
		},{
			text : 'Об.вес',
			dataIndex : 'vol_wt'
		},{
			text : 'баз.',
			dataIndex : 'tar_flip_b'
		},{
			text : 'доп.',
			dataIndex : 'tar_flip_a'
		},{
			text : 'Всего',
			dataIndex : 'tar_flip_t'
		},{
			text : 'прим.',
			dataIndex : 'rem_flip'
		},{
			text : 'баз.',
			dataIndex : 'tar_ag_b'
		},{
			text : 'доп.',
			dataIndex : 'tar_ag_a'
		},{
			text : 'Всего',
			dataIndex : 'tar_ag_t'
		},{
			text : 'прим.',
			dataIndex : 'rem_ag'
		}
	],
	dockedItems : [{
			xtype : 'mnftool',
			dock : 'top'
		}/*, {
			xtype : 'totaltool',
			dock : 'bottom'
		}*/
	]
});
