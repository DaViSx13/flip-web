Ext.define('FPClient.model.OrdsMod', {
	extend : 'Ext.data.Model',
	fields : [{
			name : 'rordnum'
		}, {
			name : 'status',
			type : 'string'
		}, {
			name : 'datein',
			type : 'date',
			dateFormat : 'Y-m-d H:i:s'
		}, {
			name : 'orgcity'
		}, {
			name : 'cname'
		}, {
			name : 's_adr',
			type : 'string'
		}, {
			name : 's_name',
			type : 'string'
		}, {
			name : 's_mail',
			type : 'string'
		}, {
			name : 's_tel',
			type : 'string'
		}, {
			name : 'destcity'
		}, {
			name : 'dname'
		}, {
			name : 'type'
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
			name : 'wb_no',
			type : 'string'
		}, {
			name : 'org',
			type : 'int'
		}, {
			name : 'fpayr',
			type : 'int'
		}, {
			name : 'metpaym'
		}]
});
