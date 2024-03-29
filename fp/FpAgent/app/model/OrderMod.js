Ext.define('FPAgent.model.OrderMod', {
	extend : 'Ext.data.Model',
	fields : [{
			name : 'rordnum',
			type : 'int'
		}, {
			name : 'org'
		}, {
			name : 'orgcode',
			type : 'int'
		}, {
			name : 'cname'
		}, {
			name : 'curid'
		}, {
			name : 'address'
		}, {
			name : 'contname'
		}, {
			name : 'contmail',
			type : 'string'
		}, {
			name : 'contphone'
		}, {
			name : 'orgrems'
		}, {
			name : 'dest'
		}, {
			name : 'destcode',
			type : 'int'
		}, {
			name : 'dname'
		}, {
			name : 'dadr'
		}, {
			name : 'dcontname'
		}, {
			name : 'dcontmail'
		}, {
			name : 'dcontphone'
		}, {
			name : 'destrems'
		}, {
			name : 'amt'
		}, {
			name : 'paytype'
		}, {
			name : 'type',
			type : 'int'
		}, {
			name : 'packs',
			type : 'int'
		}, {
			name : 'wt',
			type : 'float'
		}, {
			name : 'volwt',
			type : 'float'
		}, {
			name : 'rordnum'
		}, {
			name : 'courdate'
		}, {
			name : 'courtimef'
		}, {
			name : 'courtimet'
		}, {
			name : 'fileplase'
		}, {
			name : 'realfilename'
		}, {
			name : 'autorfilename'
		}, {
			name : 'fileowner'
		}, {
			name : 'status'
		}, {
			name : 'cat'
	}, {
		name: 'subtype'
	}
	]
});
