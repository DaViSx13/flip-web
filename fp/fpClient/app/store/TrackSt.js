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
		url: 'http://192.168.56.2:8080/client/api.php', //'http://web.flippost.com/fp/client/api.php',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});
