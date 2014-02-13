Ext.define('FPAgent.model.MnfMod', {
	extend : 'Ext.data.Model',
	fields : [{
			name : 'mnfregno'
		}, {
			name : 'mnfrefno'
		}, {
			name : 'orgtrk'
		}, {
			name : 'desttrk'
		}, {
			name : 'bpcs',
			type : 'int'
		}, {
			name : 'bwt',
			type : 'float'
		}, {
			name : 'bvwt',
			type : 'float'
		}, {
			name : 'shpd',
			dateFormat : 'Y-m-d H:i:s',
			type : 'date'
		}, {
			name : 'dtarr',
			dateFormat : 'Y-m-d H:i:s',
			type : 'date'
		}, {
			name : 'darr',
			dateFormat : 'Y-m-d H:i:s',
			type : 'date'
		}, {
			name : 'descr'
		}
	]
});
