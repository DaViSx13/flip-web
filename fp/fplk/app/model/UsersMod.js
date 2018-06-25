Ext.define('FPClient.model.UsersMod', {
	extend : 'Ext.data.Model',
	fields : [{
			name : 'id',
			type : 'int'
		}, {
			name : 'auser',
			type : 'string'
		}, {
			name : 'agents',
			type : 'string'
		}, {
			name : 'partname',
			type : 'string'
		}, {
			name : 'active',
			type : 'int'
		}, {
			name : 'partloc',
			type : 'string'
		}, {
			name : 'rusname',
			type : 'string'
		}, {
			name : 'dateshtdn',
			type : 'string'
		}, {
			name : 'c_co',
			type : 'string'
		}, {
			name : 'c_city',
			type : 'string'
		}, {
			name : 'loc',
			type : 'string'
		}, {
			name : 'cacc',
			type : 'string'
		}
	]
});
