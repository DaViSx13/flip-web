Ext.define('FpMnf.view.Viewport', {
    extend: 'Ext.container.Viewport',//'Ext.Window.Window',
    //closable:false,
    layout: 'fit',
   // autoScroll:true,
   
  requires: [
            'FpMnf.view.mainform.MainPanel'
        ],
       
    /*initComponent: function() {
        this.items = {
         layout: {
                 type: 'fit',
                 align: 'stretch'
                },
          border:false,
            items: [
                {
               
               
		        xtype: 'mainpanel',
                minHeight:800,
                minWidth:1024,
                layout: {
                 type: 'fit',
                 align: 'stretch'
                        }
                }
             
                
            ]  
         
          
        };

        this.callParent();
    }*/      
      
//layout: 'border',

    items: [{
		//split: true, 
        //region: 'center',
        xtype: 'mainpanel'
    }]
	  
        
  });