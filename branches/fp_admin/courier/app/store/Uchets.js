Ext.define('Courier.store.Uchets', {
	extend: 'Ext.data.Store',
	model: 'Courier.model.Uchet',
    proxy: {
        type: 'localstorage',
        id: 'agrid'
    }
});