Ext.define('fplk.model.UsersMod', {
	extend : 'Ext.data.Model',
	fields : [{
			name : 'id',
			type : 'int'
		}, {
			name : 'auser',
			type : 'string'
		}, {
			name : 'active',
			type : 'int'
		}, {
			name : 'clientid',
			type : 'int'
		}, {
			name : 'c_name',
			type : 'string'
		},{
			name : 'rusname',
			type : 'string'
		},  {
			name : 'loc',
			type : 'string'
		}
	]
});
