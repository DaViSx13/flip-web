Ext.define('FpMnf.view.mainform.TotalTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.totaltool',
	initComponent : function () {
		Ext.apply(this, {
			items : ['->', {
					xtype : 'label',
					text : 'Количество манифестов: '
				}
			]
		});
		this.callParent(arguments);
	}
});
