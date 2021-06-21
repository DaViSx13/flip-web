Ext.define('fplk.store.TypeStSber', {
	extend : 'Ext.data.Store',
	model : 'fplk.model.TypeMod',
	data : [{
			Name : 'Документы',
			lowName : 1
		}, {
			Name : 'Габаритный груз',
			lowName : 0
		}, {
			Name : 'Опасный груз',
			lowName : 2
		}, {
			Name : 'Груз',
			lowName : 3
		}
	]
});
