Ext.define('Courier.model.Courier', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'courId',
		type: 'int'
	},
	{
		name: 'name',
		type: 'string'
	}],
	proxy: {
		type: 'ajax',
		url: 'data/getCour.php',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});