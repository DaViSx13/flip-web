Ext.define('FPAgent.store.ViewExStore', {
	extend : 'Ext.data.Store',
	model : 'FPAgent.model.ViewExMod',
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
