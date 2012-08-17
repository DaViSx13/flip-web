Ext.define('FpMnf.store.WbSt', {
    extend: 'Ext.data.Store',
	requires: ['Ext.data.reader.Json'],
    model: 'FpMnf.model.WbMod',
	proxy: {
		type: 'ajax',
		url : 'fpwebsrv.php',
		reader: {
			type: 'json'
            }/*,
	params:{
			proc: 'GetWbMnf'
			}*/
	}
});