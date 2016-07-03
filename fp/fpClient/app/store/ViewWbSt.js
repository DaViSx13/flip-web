Ext.define('FPClient.store.ViewWbSt', {
	extend : 'Ext.data.Store',
	model : 'FPClient.model.ViewWbMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		actionMethods : 'POST',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'GetWb'
		}
	}
});
