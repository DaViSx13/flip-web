Ext.define('FpMnf.store.WbsBufStore', {
	extend : 'Ext.data.Store',
	model : 'FpMnf.model.WbsBufMod',
	buffered: true,
    //leadingBufferZone: 300,
    pageSize: 100,
	 proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
	
	
});