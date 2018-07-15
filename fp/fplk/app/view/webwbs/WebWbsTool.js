Ext.define('fplk.view.webwbs.WebWbsTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.webwbstool',
	requires : ['fplk.view.mainform.ComboMonth', 'fplk.view.mainform.NumYear'/*, 'fplk.view.mainform.ComboAgent'*/],
	items : [
		{
			text : 'Печать веб накладной',			
			action : 'printwb',
			iconCls : 'webwbprint'
		},
	'->', '-', 
		{
			xtype : 'numyear'
		}, '-', {
			xtype : 'combomonth'
		}
	]
});
