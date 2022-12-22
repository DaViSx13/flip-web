Ext.define('fplk.store.SortTypeSt', {
	extend : 'Ext.data.Store',
	model : 'fplk.model.TypeMod',
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
