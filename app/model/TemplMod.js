Ext.define('FPAgent.model.TemplMod', {
	extend : 'Ext.data.Model',
	fields : [{
			name : 'id',
			type : 'int'
		}, {
			name : 'org'
		}, /*{
			name : 'orgcity'
		},*/ {
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
		},/* {
			name : 'destcity'
		},*/ {
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
			name : 'templatename'
		}
	]
});