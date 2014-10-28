Ext.define('FPAgent.store.AgentsListSt', {
	extend : 'Ext.data.Store',
	model : 'FPAgent.model.AgentsMod',
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
