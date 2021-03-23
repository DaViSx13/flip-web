Ext.define('FPAgent.store.OrderClientSt', {
	extend : 'Ext.data.Store',
	model : 'FPAgent.model.OrderMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'viewregorder',
			se : window.location.hash.replace("#", "")
		}
	}
});
