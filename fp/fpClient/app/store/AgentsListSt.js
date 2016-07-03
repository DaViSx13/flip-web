Ext.define('FPClient.store.AgentsListSt', {
	extend : 'Ext.data.Store',
	model : 'FPClient.model.AgentsMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'GetAgentsList'
		}
	}
});
