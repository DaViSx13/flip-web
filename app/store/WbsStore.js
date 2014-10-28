Ext.define('FPAgent.store.WbsStore', {
	extend : 'Ext.data.Store',
	model : 'FPAgent.model.WbsMod',
	buffered : true,
	pageSize : 100,
	leadingBufferZone : 300,
	remoteSort : true,
	remoteFilter : true,
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'GetAgentWbs'
		}
	}
});
