Ext.define('FPAgent.store.UsersSt', {
	extend : 'Ext.data.Store',
	model : 'FPAgent.model.UsersMod',
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
