Ext.define('FPClient.store.MnfSt', {
	extend : 'Ext.data.Store',
	model : 'FPClient.model.MnfMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'GetMnf'
		}
	}
});
