Ext.define('fplk.store.WbsStore', {
	extend : 'Ext.data.Store',
	model : 'fplk.model.WbsMod',
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
			dbAct : 'GetClientWbs'
		}
	}
});
