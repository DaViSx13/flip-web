Ext.define('FPAgent.store.TrackSt', {
	extend: 'Ext.data.Store',
	model: 'FPAgent.model.TrackMod',
	sorters: [{
			property: 'id',
			direction: 'ASC'
		}
	],
	proxy: {
		type: 'ajax',
		url: '../fp/client/api.php',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});
