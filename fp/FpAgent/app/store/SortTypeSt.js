Ext.define('FPAgent.store.SortTypeSt', {
	extend : 'Ext.data.Store',
	model : 'FPAgent.model.TypeMod',
	autoLoad: true,
	data : [{
		Name : 'Обрешетка',
		lowName : 2
	}, {
		Name : 'Спец перевозка',
		lowName : 1
	}, {
		Name: 'Дополнительная упаковка',
		lowName: 0
	}]
});
