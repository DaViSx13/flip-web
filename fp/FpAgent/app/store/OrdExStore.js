Ext.define('FPAgent.store.OrdExStore', {
	extend : 'Ext.data.Store',
	model : 'FPAgent.model.OrdExMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'GetOrdEx'
		}
	}
});
