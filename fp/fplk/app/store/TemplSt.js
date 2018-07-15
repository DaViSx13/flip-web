Ext.define('fplk.store.TemplSt', {
	extend : 'Ext.data.Store',
	model : 'fplk.model.TemplMod',
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
