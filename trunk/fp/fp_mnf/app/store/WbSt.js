Ext.define('FpMnf.store.WbSt', {
	extend : 'Ext.data.Store',
	requires : ['Ext.data.reader.Json'],
	model : 'FpMnf.model.WbMod',
	proxy : {
		type : 'ajax',
		url : 'srv/fpwebsrv.php',
		reader : {
			type : 'json'
		}
	}
});
