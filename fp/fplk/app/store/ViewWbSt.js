Ext.define('fplk.store.ViewWbSt', {
	extend : 'Ext.data.Store',
	model : 'fplk.model.ViewWbMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		actionMethods : 'POST',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'GetWb'
		}
	}
});
