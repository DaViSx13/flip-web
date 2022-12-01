Ext.define('FPClient.store.SortSubTypeSt', {
	extend : 'Ext.data.Store',
	model : 'FPClient.model.SubTypeMod',
	autoLoad: true,
	data : [{
		Name : 'Опасный груз',
	}, {
		Name : 'Авиа',
	}, {
		Name: 'ЖД',
	}]
});
