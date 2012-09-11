Ext.define('FpMnf.store.OrderSt', {
	extend : 'Ext.data.Store',
	requires : ['Ext.data.reader.Json'],
	
	model : 'FpMnf.model.OrderMod',
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader: {
			type: 'json',
			root: 'data'
            },
		extraParams: {
			dbAct: 'editagorder'
		}
	}
	
});
