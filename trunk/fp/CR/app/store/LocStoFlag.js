Ext.define('Courier.store.LocStoFlag', {
	extend : 'Ext.data.Store',
	model : 'Courier.model.LocModFlag',
	proxy : {
		type : 'localstorage',
		id : 'flag1'
	}
});
