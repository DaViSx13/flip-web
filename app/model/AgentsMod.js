Ext.define('FPAgent.model.AgentsMod', {
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
			type : 'string',
			convert : function (v, record) {
				return record.data.partname + ' (' + record.data.partloc + ')'
			}
		}
	]
});
