Ext.define('fplk.store.TypeSt', {
	extend : 'Ext.data.Store',
	model : 'fplk.model.TypeMod',
	data : [{
			Name : 'Документ',
			lowName : 1
		}, {
			Name : 'Не документ',
			lowName : 0
		}
	]
});
