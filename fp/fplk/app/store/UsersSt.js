Ext.define('FPClient.store.UsersSt', {
	extend : 'Ext.data.Store',
	model : 'FPClient.model.UsersMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getUsers'
		}
	}
});
