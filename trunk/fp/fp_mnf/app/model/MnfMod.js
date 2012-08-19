Ext.define('FpMnf.model.MnfMod', {
    extend: 'Ext.data.Model',
          
    fields: [
        {name: 'mnfregno'},
        {name: 'mnfrefno'},
		{name: 'orgtrk'},
        {name: 'desttrk'},
		{name: 'bpcs'},
        {name: 'bwt'},
		{name: 'bvwt'},
        {name: 'shpd'},
		{name: 'dtarr'},
		{name: 'darr'},
        {name: 'descr'}
		//{name: 'destagentid'}
    ]
});