Ext.define('FpMnf.store.Users', {
	extend : 'Ext.data.Store',
	model : 'FpMnf.model.User',
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