Ext.define('fplk.store.TypeStSber', {
	extend : 'Ext.data.Store',
	model : 'fplk.model.TypeMod',
	data : [{
			Name : 'Документы',
			lowName : 1
		}, {
			Name : 'Негабаритный груз',
			lowName : 3
		}, {
			Name : 'Опасный груз',
			lowName : 2
		}, {
			Name : 'Груз',
			lowName : 0
		}
	]
});
