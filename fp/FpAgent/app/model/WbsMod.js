Ext.define('FPAgent.model.WbsMod', {
	extend : 'Ext.data.Model',
	fields : [{
			name : 'wb_no',
			type : 'string'
		}, {
			name : 'd_acc_txt'
		}, {
			name : 'd_acc',
			dateFormat : 'Y-m-d H:i:s',
			type : 'date'
		}, {
			name : 'dod_txt'
		}, {
			name : 'dod',
			dateFormat : 'Y-m-d H:i:s',
			type : 'date'
		}, {
			name : 'rcpn'
		}, {
			name : 'p_d_in',
			dateFormat : 'Y-m-d H:i:s',
			type : 'date'
		}, {
			name : 'dtd_txt'
		}, {
			name : 'dtd',
			dateFormat : 'Y-m-d H:i:s',
			type : 'date'
		}, {
			name : 'org',
			type : 'string'
		}, {
			name : 'dest',
			type : 'string'
		}, {
			name : 's_co',
			type : 'string'
		}, {
			name : 'r_co',
			type : 'string'
		}, {
			name : 'wt',
			useNull: true,
			type : 'float'
		}, {
			name : 'vol_wt',
			useNull: true,
			type : 'float'
		}, {
			name : 't_srv'
		}, {
			name : 'dir'
		}, {
			name : 'tar_flip_b',
			useNull: true,
			type : 'float'
		}, {
			name : 'tar_flip_a',
			useNull: true,
			type : 'float'
		}, {
			name : 'tar_flip_tr',
			useNull: true,
			type : 'float'
		}, {
			name : 'tar_flip_t',
			useNull: true,
			type : 'float'
		}, {
			name : 'tar_flip_id'
		}, {
			name : 'tar_ag_a',
			useNull: true,
			type : 'float'
		}, {
			name : 'tar_ag_tr',
			useNull: true,
			type : 'float'
		}, {
			name : 'tar_ag_b',
			useNull: true,
			type : 'float'
		}, {
			name : 'tar_ag_t',
			useNull: true,
			type : 'float'
		}, {
			name : 'tar_ag_id'
		}, {
			name : 'rem_flip',
			type : 'string'
		}, {
			name : 'rem_ag',
			type : 'string'
		}, {
			name : 'is_ex',
			type : 'int'
		}, {
			name : 'req_tar_a'
		}, {
			name : 'req_rem'
		}, {
			name : 'flip_cash'
		}, {
			name : 'ag_cash'
		}, {
			name : 'pcs'
		}
	]
});
