Ext.define('fplk.store.UsersSt', {
	extend : 'Ext.data.Store',
	model : 'fplk.model.UsersMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getUsers'
		}
	}
});
