Ext.define('fplk.store.OrdsSt', {
	extend : 'Ext.data.Store',
	model : 'fplk.model.OrdsMod',
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
