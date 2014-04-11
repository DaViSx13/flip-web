Ext.define('Courier.model.Uchet', {
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
			name : 'tdd',
			type : 'string'
		}
	]
});
