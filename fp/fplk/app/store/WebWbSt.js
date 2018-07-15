Ext.define('fplk.store.WebWbSt', {
	extend : 'Ext.data.Store',
	model : 'fplk.model.WebWbMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		actionMethods : 'POST',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'GetWebWbs'
		}
	}
});
