Ext.define('FPClient.store.WebWbSt', {
	extend : 'Ext.data.Store',
	model : 'FPClient.model.WebWbMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		actionMethods : 'POST',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'GetWebWbs'
		}
	}
});
