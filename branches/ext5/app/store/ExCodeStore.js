Ext.define('FPAgent.store.ExCodeStore', {
	extend : 'Ext.data.Store',
	model : 'FPAgent.model.ExCodeMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'GetExCodes'
		}
	}
});
