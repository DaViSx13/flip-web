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
      name: 'agentname',
      type: 'string'
      }, {
      name: 'active',
      type: 'boolean'
      }
    ]
  }
);