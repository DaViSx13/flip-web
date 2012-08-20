Ext.define('FpMnf.store.CityStOrg', {
    extend: 'Ext.data.Store',
	requires: ['Ext.data.reader.Json'],
	model: 'FpMnf.model.CityMod',
	proxy: {
            type: 'ajax',
            url : 'srv/getCityList.php',
            reader: {
                type: 'json'
            }
        }    
});