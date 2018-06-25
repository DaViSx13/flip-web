Ext.define('FPClient.store.WbSt', {
	extend : 'Ext.data.Store',
	model : 'FPClient.model.WbMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'GetWbMnf'
		}
	}
});
