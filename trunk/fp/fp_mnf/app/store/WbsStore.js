Ext.define('FpMnf.store.WbsStore', {
	extend : 'Ext.data.Store',
	requires : ['Ext.data.reader.Json'],
	model : 'FpMnf.model.WbsMod',
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