Ext.define('FpMnf.model.WbMod', {
    extend: 'Ext.data.Model',
          
    fields: [
        {name: 'wb_no'},
        {name: 'dtd'},
		{name: 'org'},
        {name: 'dest'},
		{name: 'shpcs'},
        {name: 'shwt'},
		{name: 'shvol_wt'},
        {name: 'c_adr'}		
    ]
});