Ext.define('fplk.store.ViewExStore', {
	extend : 'Ext.data.Store',
	model : 'fplk.model.ViewExMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'GetWbEx'
		}
	}
});
