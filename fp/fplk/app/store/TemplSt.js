Ext.define('FPClient.store.TemplSt', {
	extend : 'Ext.data.Store',
	model : 'FPClient.model.TemplMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getAgTemplates'
		}
	}
});
