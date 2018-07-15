Ext.define('fplk.store.ExCodeStore', {
	extend : 'Ext.data.Store',
	model : 'fplk.model.ExCodeMod',
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
