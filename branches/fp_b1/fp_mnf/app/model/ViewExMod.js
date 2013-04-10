Ext.define('FpMnf.model.ViewExMod', {
	extend : 'Ext.data.Model',
	fields : [{
			name : 'wbno',
			type : 'string'
		}, {
			name : 'raised_txt'/*,
			type : 'date',
			dateFormat : 'Y-m-d H:i'*/
		}, {
			name : 'excode'
		}, {
			name : 'loc'
		}, {
			name : 'exdesc'
		}, {
			name : 'ofvers'
		}
	]
});
