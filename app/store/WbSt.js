Ext.define('FPAgent.store.WbSt', {
	extend : 'Ext.data.Store',
	model : 'FPAgent.model.WbMod',
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
