Ext.define('FPClient.view.webwbs.WebWbsTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.webwbstool',
	requires : ['FPClient.view.mainform.ComboMonth', 'FPClient.view.mainform.NumYear'/*, 'FPClient.view.mainform.ComboAgent'*/],
	items : [
		{
			text : 'Печать веб накладной',			
			action : 'printwb',
			iconCls : 'webwbprint'
		},'-', {
			text : 'Экспорт в Excel',
			action : 'exportWebWbsExcel',
			iconCls : 'excel'
		},
	'->', '-', {
			xtype : 'combomonth'
		}
	]
});
