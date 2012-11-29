Ext.define('Courier.store.LocStoFlag', {
	extend : 'Ext.data.Store',
	model : 'Courier.model.LocModFlag',
	autoLoad: true,
	proxy : {
		type : 'localstorage',
		id : 'flag1'
	}
});
