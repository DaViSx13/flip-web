Ext.define('FPAgent.store.WbNoSt', {
	extend 		: 'Ext.data.Store',
	model		: 'FPAgent.model.WbNoMod',
	autoLoad	: false,
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'GetWebNoGroup'
		}
	}
});
