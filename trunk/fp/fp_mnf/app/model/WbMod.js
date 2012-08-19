Ext.define('FpMnf.model.WbMod', {
	extend : 'Ext.data.Model',
	fields : [{
			name : 'wb_no'
		}, {
			name : 'dtd'
		}, {
			name : 'org'
		}, {
			name : 'dest'
		}, {
			name : 'shpcs',
			type : 'int'
		}, {
			name : 'shwt',
			type : 'float'
		}, {
			name : 'shvol_wt',
			type : 'float'
		}, {
			name : 'c_adr'
		}, {
			name : 's_co'
		}, {
			name : 'r_co'
		}
	]
});
