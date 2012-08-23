Ext.define('FpMnf.store.TypeSt', {
	extend : 'Ext.data.Store',
	
	model : 'FpMnf.model.TypeMod',
	
	data : [{
			Name : 'Документ',
			lowName : 1
		}, {
			Name : 'Не документ',
			lowName : 0
		}, {
			Name : 'Опасный груз',
			lowName : 3
		}
	]
});
