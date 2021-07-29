Ext.define('fplk.store.WbNoSt', {
	extend : 'Ext.data.Store',
	model : 'fplk.model.WbNoMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		actionMethods : 'POST',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getWebWbsGroup'
		}
	}
});
