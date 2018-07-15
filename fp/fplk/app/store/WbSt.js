Ext.define('fplk.store.WbSt', {
	extend : 'Ext.data.Store',
	model : 'fplk.model.WbMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'GetWbMnf'
		}
	}
});
