Ext.define('FpWeb.view.Viewport', {
    extend: 'Ext.container.Viewport',//'Ext.Window.Window',
    alias: 'widget.mainviewport',
    layout: 'fit',
    autoScroll:true,
    title:'Новый web',
   // html:'sfgssgsgsg',
  requires: [
        'FpWeb.view.loginform.ShowForm'//,
        //'FpWeb.view.mainform.MainPanel'
        ],
        
    initComponent: function() {
        this.items = {
         layout: {
                 type: 'fit',
                 align: 'stretch'
                },
          border:false,
            items: [
                {
                 //height: 100,
                //title:'Логин',
               
		        xtype: 'showform',
                minHeight:300,
                minWidth:400,
                layout: {
                 type: 'fit',
                 align: 'stretch'
                        }
                }
              /*  ,{
                    xtype:'username',
                    height: 100
                }*/
                
            ]  
         
            
         //xtype: 'form',
        // frame: true,
          // height: 100,
          // width: 100,
           // x: 0,
         //   y: 0,
        /*    title: 'Viewport',
          
         layout: {
        type: 'hbox',
        align: 'stretch'
    },
          
            
         
         items: [
         {
        xtype: 'panel',
        title: 'Inner Panel One1',
        flex: 1
    },{
        xtype: 'panel',
        title: 'Inner Panel Two2',
        flex: 1,
        layout: {
        type: 'vbox',
        align: 'center'
                },
        items: [
            {
            xtype: 'panel',
            //title: 'Inner Panel One',
            //width: 250,
            flex: 1
            },
             {
            xtype: 'panel',
            title: 'Inner Panel Two',
            width: 250,
            flex: 1
            },
            {
            xtype: 'panel',
            //title: 'Inner Panel Three',
            //width: '50%',
            flex: 1
            }]
    },{
        xtype: 'panel',
        title: 'Inner Panel Three3',
        flex: 1
    }
         
         
         ]*/
        };

        this.callParent();
    }      
        
        
  });