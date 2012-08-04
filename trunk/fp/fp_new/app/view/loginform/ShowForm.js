Ext.define('FpWeb.view.loginform.ShowForm', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.showform',
   
    requires: [
        'FpWeb.view.loginform.UserName'
        ,'FpWeb.view.loginform.Pass'
    ],
//html:'sfgssgsgsg',
	//closable: false,

	initComponent: function() {
		Ext.apply(this,  {
		   layout: {
                    type: 'hbox',
                    align: 'middle'
                    },
            border:false,
			items: [
            
                {
                xtype: 'tbspacer',
                //title: 'Inner Panel One1',
                flex: 1
                },
                {
                xtype: 'form',
                title: 'Выполнить вход',
                height: 150,
                minHeight:150,
                minWidth:300,
                maxWidth:300,
                width:300,
                flex: 1,
                layout: {
                    type: 'vbox',
                    align: 'center'
                },
                frame: true,
                defaults: {
                    anchor: '100%'
                        },
                bodyPadding: 10,
                
                items: [
                    {                        
                    xtype: 'username'//,
                    },
                    {
                    xtype: 'pass',
                    },
                    {
                       
                xtype: 'button',
                //formBind: true,
                action: 'logon',
                text: 'Вход',
                width: 100
                    }
                ]
                
                
                },
                {
                xtype: 'tbspacer',
               // title: 'Inner Panel Three3',
                flex: 1
                }
          
            ]
		});

		this.callParent(arguments);
	}
});