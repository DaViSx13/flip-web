Ext.define('FPClient.store.TypeSt', {
	extend : 'Ext.data.Store',
	model : 'FPClient.model.TypeMod',
	data : [{
			Name : 'Документ',
			lowName : 1
		}, {
			Name : 'Не документ',
			lowName : 0
		}
	]
});
