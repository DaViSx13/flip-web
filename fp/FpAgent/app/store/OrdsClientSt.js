Ext.define('FPAgent.store.OrdsClientSt', {
	extend : 'Ext.data.Store',
	model : 'FPAgent.model.OrdsClientMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getClientAgOrders',
			se : window.location.hash.replace("#", "")
		}
	}
});
