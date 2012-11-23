Ext.define('Courier.store.LocStore', {
	extend : 'Ext.data.Store',
	model : 'Courier.model.LocModel',
	//autoSync : true,
	proxy : {
		type : 'localstorage',
		id : 'lost1'
	}
});
