Ext.define('FPAgent.store.OrdsClientSt', {
	extend : 'Ext.data.Store',
	model : 'FPAgent.model.OrdsMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getClientAgOrders'
		}
	}
});
