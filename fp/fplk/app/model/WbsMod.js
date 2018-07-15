Ext.define('fplk.model.WbsMod', {
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
			type : 'float'
		}, {
			name : 'vol_wt',
			type : 'float'
		}, {
			name : 't_srv'
		}, {
			name : 'dir'
		}, {
			name : 'tar_flip_b',
			type : 'float'
		}, {
			name : 'tar_flip_a',
			type : 'float'
		}, {
			name : 'tar_flip_t',
			type : 'float'
		}, {
			name : 'tar_flip_id'
		}, {
			name : 'tar_ag_b',
			type : 'float'
		}, {
			name : 'tar_ag_t',
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
		}
	]
});
