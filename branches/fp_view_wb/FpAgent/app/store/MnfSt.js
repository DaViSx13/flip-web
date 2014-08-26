Ext.define('FPAgent.store.MnfSt', {
	extend : 'Ext.data.Store',
	model : 'FPAgent.model.MnfMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'GetMnf'
		}
	}
});
