Ext.define('FpMnf.model.OrdsMod', {
	extend : 'Ext.data.Model',
	fields : [{
                    name: 'ROrdNum'
                },
                {
                    name: 'status'
                },
				{
					name: 'datein',
					type : 'date',
					dateFormat: 'Y-m-d H:i:s'
				},
                {
                    name: 'ORGCity'
                },
                {
                    name: 'CName'
                },
                {
                    name: 'DESTCity'
                },
                {
                    name: 'DName'
                },
                {
                    name: 'Packs',
					type : 'int'
                },
                {
                    name: 'Wt',
					type : 'float'
                },
                {
                    name: 'VolWt',
					type : 'float'
                },
                {
                    name: 'wb_no'
                }
	]
});
