Ext.define('FPClient.store.ClientSt', {
	extend: 'Ext.data.Store',
	model: 'FPClient.model.ClientMod',
	proxy: {
		type: 'ajax',
		url: 'srv/data.php',
		reader: {
			type: 'json',
			root: 'data'
		},
		extraParams: {
			dbAct: 'GetClientInfo'
		}
	}
});
