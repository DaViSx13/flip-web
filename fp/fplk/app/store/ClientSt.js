Ext.define('fplk.store.ClientSt', {
	extend: 'Ext.data.Store',
	model: 'fplk.model.ClientMod',
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
