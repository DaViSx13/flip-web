Ext.define('fplk.store.OrdExStore', {
	extend : 'Ext.data.Store',
	model : 'fplk.model.OrdExMod',
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
