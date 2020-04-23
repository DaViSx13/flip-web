Ext.define('FPClient.store.WbNoSt', {
	extend : 'Ext.data.Store',
	model : 'FPClient.model.WbNoMod',
	data:[
		{wbNum : 1, cost: 2},
		{wbNum : 2, cost: 3.22},
		{wbNum : 3, cost: 3.12}
	]
	/*proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'GetWbMnf'
		}
	}*/
});
