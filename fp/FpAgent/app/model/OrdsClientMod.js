Ext.define('FPAgent.model.OrdsClientMod', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'rordnum'
    }, {
        name: 'status',
        type: 'string'
    }, {
        name: 'datein',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    }, {
        name: 'orgcity'
    }, {
        name: 'cname'
    }, {
        name: 'destcity'
    }, {
        name: 'dname'
    }, {
        name: 'packs',
        type: 'int'
    }, {
        name: 'wt',
        type: 'float'
    }, {
        name: 'volwt',
        type: 'float'
    }, {
        name: 'wb_no',
        type: 'string'
    }, {
        name: 'is_ex',
        type: 'int'
    }, {
        name: 'cabinet_type',
        type: 'string'
    }]
});
