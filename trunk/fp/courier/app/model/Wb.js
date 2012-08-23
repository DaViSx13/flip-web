Ext.define('Courier.model.Wb', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'aNo',
		type: 'string'
	},
	{
		name: 'displayNo',
		type: 'string'
	},
	{
		name: 'aCash',
		type: 'float'
	},
	{
		name: 'aAddress',
		type: 'string'
	},
	{
		name: 'client',
		type: 'string'
	},
	{
		name: 'tdd',
		type: 'string'
	}],
	proxy: {
		type: 'ajax',
		url: 'data/data.php',
		reader: {
			type: 'json',
			root: 'data'
		},
		extraParams: {
			dbAct: 'getCourWbs'
		}
	}
});