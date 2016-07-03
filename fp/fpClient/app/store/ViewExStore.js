Ext.define('FPClient.store.ViewExStore', {
	extend : 'Ext.data.Store',
	model : 'FPClient.model.ViewExMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'GetWbEx'
		}
	}
});
