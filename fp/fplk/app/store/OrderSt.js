Ext.define('fplk.store.OrderSt', {
	extend : 'Ext.data.Store',
	model : 'fplk.model.OrderMod',
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
