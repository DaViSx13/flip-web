Ext.define('FPClient.store.OrdsSt', {
	extend : 'Ext.data.Store',
	model : 'FPClient.model.OrdsMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getAgOrders'
		}
	}
});
