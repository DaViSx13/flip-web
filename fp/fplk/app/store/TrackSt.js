Ext.define('fplk.store.TrackSt', {
	extend: 'Ext.data.Store',
	model: 'fplk.model.TrackMod',
	sorters: [{
			property: 'id',
			direction: 'ASC'
		}
	],
	proxy: {
		type: 'ajax',
		url: '../client/api.php',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});
