Ext.define('FpMnf.store.OrderSt', {
    extend: 'Ext.data.Store',
	requires: ['Ext.data.reader.Json'],
	
    model: 'FpMnf.model.OrderMod',
	proxy: {
		type: 'ajax',
		url : 'srv/EditAgOrders.php',
		reader: {
			type: 'json'
            }
	}   
    
});