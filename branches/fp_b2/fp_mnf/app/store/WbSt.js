Ext.define('FpMnf.store.WbSt', {
	extend : 'Ext.data.Store',
	requires : ['Ext.data.reader.Json'],
	model : 'FpMnf.model.WbMod',
	proxy: {
		type: 'ajax',
		url : 'srv/data.php',
		reader: {
			type: 'json',
			root: 'data'
            },
		extraParams: {
			dbAct: 'GetWbMnf'
		}
	}
});
