Ext.define('FpWeb.view.mainform.MainPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.mainpanel',
    title:'�����������',
    layout: 'fit',
    autoShow: true,
    //height: 120,
    //width: 280,
   	initComponent: function() {
		Ext.apply(this,  {
		  
         
          items:[
          {
            xtype: 'form',
             
            title: '��������'
          }
          ]
    
    });
    	this.callParent(arguments);
    }
    });