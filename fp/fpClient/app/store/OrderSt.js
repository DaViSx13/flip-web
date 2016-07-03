Ext.define('FPClient.store.OrderSt', {
	extend : 'Ext.data.Store',
	model : 'FPClient.model.OrderMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'editagorder'
		}
	}
});
