Ext.define('FpMnf.store.WbsStore', {
	extend : 'Ext.data.Store',
	requires : ['Ext.data.reader.Json'],
	model : 'FpMnf.model.WbsMod',
	buffered: true,
	pageSize: 100,
	leadingBufferZone: 300,
//	trailingBufferZone: 100,
    remoteSort: true,
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