Ext.define('FPAgent.model.AgentsListMod', {
	extend : 'Ext.data.Model',
	fields : [{
			name : 'partcode',
			type : 'string'
		}, {
			name : 'partloc',
			type : 'string'
		}, {
			name : 'partname',
			type : 'string'
		}, {
			name : 'displayname',
			type : 'string'			
		}
	]
});
