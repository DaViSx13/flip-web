Ext.define('FpMnf.view.mainform.MnfPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mnfpanel',
	requires: [
        'FpMnf.view.mainform.MnfGrid',
		
		'FpMnf.view.mainform.WbGrid'
            ],
 layout: 'border',
 closable: false,
 initComponent: function() {
        
        Ext.apply(this,  {
		  
          items: [
        
        {
            region: 'center',
			xtype: 'mnfgrid'
			
        },
		{
			height: 300,
			split: true,
			region: 'south',
            xtype: 'wbgrid'
        }
    ]
    
    });

        this.callParent(arguments);
    } 
    
    
    
});