Ext.define('Courier.model.OrderAndWb', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'ano',
		type: 'string'
	},
	{
		name: 'displayno',
		type: 'string'
	},
	{
		name: 'acash',
		type: 'float'
	},
	{
		name: 'aaddress',
		type: 'string'
	},
	{
		name: 'client',
		type: 'string'
	},
	{
		name: 'timeb',
		type: 'string'
	},
	{
		name: 'timee',
		type: 'string'
	},
	{
		name: 'tdd',
		type: 'string'
	},
	{
		name: 'cont',
		type: 'string'
	},
	{
		name: 'contphone',
		type: 'string'
	},
	{
		name: 'packs',
		type: 'int'
	},
	{
		name: 'wt',
		type: 'float'
	},
	{
		name: 'volwt',
		type: 'float'
	},
	{
		name: 'rems',
		type: 'string'
	},
	{
		name: 'ordstatus',
		type: 'int'
	},
	{
		name: 'ordtype',
		type: 'int'
	},
	{
		name: 'rectype',
		type: 'int'
	}
	],
	proxy: {
		type: 'ajax',
		url: 'data/data.php',
		reader: {
			type: 'json',
			root: 'data'
		},
		extraParams: {
			dbAct: 'getCourAll'
		}
	}
});