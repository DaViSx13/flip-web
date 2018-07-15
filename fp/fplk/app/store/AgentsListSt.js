Ext.define('fplk.store.AgentsListSt', {
	extend : 'Ext.data.Store',
	model : 'fplk.model.AgentsMod',
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
