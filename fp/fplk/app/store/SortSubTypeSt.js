Ext.define('fplk.store.SortSubTypeSt', {
	extend : 'Ext.data.Store',
	model : 'fplk.model.SubTypeMod',
	autoLoad: true,
	data : [{
		Name : 'Опасный груз',
	}, {
		Name : 'Авиа',
	}, {
		Name: 'ЖД',
	}]
});
