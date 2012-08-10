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
			//enableToggle: true,
			//toggleHandler: onItemToggle,
			pressed: true
			},
			'-',
			{
			text: 'Входящие'
			//enableToggle: true,
			//toggleHandler: onItemToggle,
			//pressed: true
			},
			'-',
			{
			text: 'Все'
			
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