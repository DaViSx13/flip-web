Ext.define('fplk.model.LocalQueries', {
	extend : 'Ext.data.Model',
	fields : ['data', 'field'],
	proxy: {
		type: 'localstorage',
		id: 'userInputQueries'
	}
});
