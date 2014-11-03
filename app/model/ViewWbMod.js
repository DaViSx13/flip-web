Ext.define('FPAgent.model.ViewWbMod', {
	extend : 'Ext.data.Model',
	fields : [{
			name : 'wb_no',
			type : 'string'
		}, {
			name : 'd_acc',
			dateFormat : 'Y-m-d H:i:s',
			type : 'date'
		}, {
			name : 'org',
			type : 'string'
		}, {
			name : 'dest',
			type : 'string'
		}, {
			name : 's_name',
			type : 'string'
		}, {
			name : 's_tel',
			type : 'string'
		},  {
			name : 's_co',
			type : 'string'
		}, {
			name : 's_adr',
			type : 'string'
		}, {
			name : 's_cnt',
			type : 'string'
		}, {
			name : 's_zip'
		}, {
			name : 's_ref',
			type : 'string'
		}, {
			name : 's_city',
			type : 'string'
		}, {
			name : 'r_name',
			type : 'string'
		}, {
			name : 'r_tel',
			type : 'string'
		}, {
			name : 'r_co',
			type : 'string'
		}, {
			name : 'r_adr',
			type : 'string'
		}, {
			name : 'r_cnt',
			type : 'string'
		}, {
			name : 'r_zip'
		}, {
			name : 'r_city',
			type : 'string'
		}, {
			name : 'metpaym',
			type : 'string'
		}, {
			name : 'payr',
			type : 'int'
		}, {
			name : 't_srv',
			type : 'string'
		}, {
			name : 'wt',
			type : 'float'
		}, {
			name : 'vol_wt',
			type : 'float'
		}, {
			name : 'wbstatus',
			type : 'int'
		}, {
			name : 'pers',
			type : 'string'
		}, {
			name : 't_pak',
			type : 'string'
		}, {
			name : 'rcpn',
			type : 'string'
		}, {
			name : 'dod',
			dateFormat : 'Y-m-d H:i:s',
			type : 'date'
		}, {
			name : 'tdd',
			dateFormat : 'Y-m-d H:i:s',
			type : 'date'
		}, {
			name : 'pcs',
			type : 'int'
		}, {
			name : 'holidaydel',
			type : 'string'
		}, {
			name : 'timing',
			dateFormat : 'Y-m-d H:i:s',
			type : 'date'
		}, {
			name : 't_del',
			type : 'string'
		}, {
			name : 'ins',
			type : 'float'
		}
	]
});
