Ext.define('FPAgent.store.TemplSt', {
	extend : 'Ext.data.Store',
	model : 'FPAgent.model.TemplMod',
	autoLoad : true,
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
