Ext.define('FpMnf.store.OrdsSt', {
    extend: 'Ext.data.Store',
	requires: ['Ext.data.reader.Json'],
	
    model: 'FpMnf.model.OrdsMod',
	proxy: {
		type: 'ajax',
		url : 'srv/data.php',
		reader: {
			type: 'json',
			root: 'data'
            },
		extraParams: {
			dbAct: 'getAgOrders'
		}
	}   
    
});