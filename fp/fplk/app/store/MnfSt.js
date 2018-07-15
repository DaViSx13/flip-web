Ext.define('fplk.store.MnfSt', {
	extend : 'Ext.data.Store',
	model : 'fplk.model.MnfMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'GetMnf'
		}
	}
});
