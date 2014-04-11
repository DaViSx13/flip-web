Ext.define('Courier.model.Order', {
	extend : 'Ext.data.Model',
	fields : [{
			name : 'ano',
			type : 'string'
		}, {
			name : 'displayno',
			type : 'string'
		}, {
			name : 'acash',
			type : 'float'
		}, {
			name : 'aaddress',
			type : 'string'
		}, {
			name : 'client',
			type : 'string'
		}, {
			name : 'timeb',
			type : 'string'
		}, {
			name : 'timee',
			type : 'string'
		}, {
			name : 'tdd',
			type : 'string'
		}
		
	],
	proxy : {
		type : 'ajax',
		url : 'data/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getCourOrders'
		}
	}
});
