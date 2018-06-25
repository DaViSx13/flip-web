Ext.define('FPClient.store.ExCodeStore', {
	extend : 'Ext.data.Store',
	model : 'FPClient.model.ExCodeMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'GetExCodes'
		}
	}
});
