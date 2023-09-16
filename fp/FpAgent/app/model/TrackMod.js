Ext.define('FPAgent.model.TrackMod', {
	extend: 'Ext.data.Model',
	fields: [{
			name: 'id',
			type: 'int'
		}, {
			name: 'trackinfo',
			type: 'string'
		}, {
			name: 'atime',
			type: 'string'
		}, {
			name: 'astatus',
			type: 'string'
		}, {
			name: 'aloc',
			type: 'string'
		}
	]
});
