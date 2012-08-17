Ext.define('FpMnf.view.mainform.MnfTool', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.mnftool',
	requires: [
       		'FpMnf.view.mainform.ComboMonth',
			'FpMnf.view.mainform.NumYear'
            ],
 
 initComponent: function() {
        
        Ext.apply(this,  {
		  
        items: [
		  {
			text: 'Исходящие',
			
			enableToggle: true,
			//toggleHandler: onItemToggle,
			action: 'out'
			//pressed: true
			},
			'-',
			{
			text: 'Входящие',
			action: 'in',
			enableToggle: true
			//toggleHandler: onItemToggle,
			//pressed: true
			
			},
			'-',
			{
			text: 'Все',
			enableToggle: true,
			action: 'all'
			},
			'-',
			'->',
			'-',
			{
			xtype: 'numyear'
			},
			'-',
			{
			 
			xtype: 'combomonth'
			}
		]
    
    });

        this.callParent(arguments);
    } 
    
    
    
});