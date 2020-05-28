Ext.define('FPAgent.model.WbNoMod', {
	extend : 'Ext.data.Model',
	fields : [{
			name : 'web_num',
			type : 'string'
		}, {
			name: 'cost',
			type: 'float'
	}, {
			name: 'id',
			type: 'number'
	}, {
			name: 'isagent',
			type: 'number'
	}, {
			name: 'isdeleted',
			type: 'number'
	}, {
			name: 'creatingdate',
			type: 'date',
			dateFormat: 'd.m.Y H:i:s'
	}]
});
