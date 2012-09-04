Ext.define('FpMnf.model.User',
  {
  extend: 'Ext.data.Model',
  idProperty: 'login',
  fields:[
      {
      name: 'login',
      type: 'string'
      }, {
      name: 'agentid',
      type: 'int'
      }, {
      name: 'partname',
      type: 'string'
      }, {
      name: 'partloc',
      type: 'string'
      }, {
      name: 'active',
      type: 'boolean'
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
			dbAct : 'getUsers'
		},
        writer: {
            root: 'user',
            encode: true
        }
	}
  }
);