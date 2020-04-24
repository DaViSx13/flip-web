Ext.define('fplk.model.CityMod', {
	extend : 'Ext.data.Model',
	fields : [{
			name : 'code',
			type : 'int'
		}, {
			name : 'fname',
			type : 'string'
		}, {
		name : 'citycode',
		type : 'string'
	}

	],
	proxy : {
		type : 'ajax',
		url : 'srv/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'GetCity'
		}
	}
});
