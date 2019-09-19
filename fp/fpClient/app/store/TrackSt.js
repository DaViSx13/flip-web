Ext.define('FPClient.store.TrackSt', {
	extend: 'Ext.data.Store',
	model: 'FPClient.model.TrackMod',
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
