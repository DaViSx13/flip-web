Ext.define('FpMnf.view.Viewport', {
    extend: 'Ext.container.Viewport',//'Ext.Window.Window',
    //closable:false,
    layout: 'fit',
   // autoScroll:true,
   
  requires: [
            'FpMnf.view.mainform.MainPanel'
        ],
       
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'mainpanel'
                }
            ]
        });     
    me.callParent(arguments);  
	}
        
  });