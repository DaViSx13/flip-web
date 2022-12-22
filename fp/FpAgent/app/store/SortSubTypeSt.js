Ext.define('FPAgent.store.SortSubTypeSt', {
	extend : 'Ext.data.Store',
	model : 'FPAgent.model.SubTypeMod',
	autoLoad: true,
	data : [{
		Name : 'Опасный груз'
	}, {
		Name : 'Авиа'
	}, {
		Name: 'ЖД'
	}]
});
