Ext.define('fplk.store.AgentsListSt', {
	extend : 'Ext.data.Store',
	model : 'fplk.model.AgentsMod',
	proxy : {
		type : 'ajax',
		sorters: [{
			property: "partcode",
			direction: "ASC"
		}],
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
