Ext.define('FpMnf.store.AgentsSt', {
	extend : 'Ext.data.Store',
	requires : ['Ext.data.reader.Json'],
	model : 'FpMnf.model.AgentsMod'//,
	//autoLoad : true,
	/*proxy: {
		type: 'ajax',
		url : 'srv/data.php',
		reader: {
			type: 'json',
			root: 'data'
            },
		extraParams: {
			dbAct: 'GetAgents'
		}
	}*/
});
