Ext.define('FpMnf.store.MnfSt', {
    extend: 'Ext.data.Store',
	requires: ['Ext.data.reader.Json'],
	//autoLoad: true,
    model: 'FpMnf.model.MnfMod',
	proxy: {
		type: 'ajax',
		url : 'srv/fpwebsrv.php',
		reader: {
			type: 'json'
            }
	},
	params:{
			proc: 'GetMnf'
			}

    
    
});