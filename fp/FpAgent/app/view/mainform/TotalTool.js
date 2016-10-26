Ext.define('FPAgent.view.mainform.TotalTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.totaltool',
	items : ['->', {
			xtype : 'label',
			text : FPAgent.lib.Translate.tr("TotalTool.label")//'Количество манифестов: '
		}
	]
});
