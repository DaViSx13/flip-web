Ext.define('FpMnf.view.mainform.TotalWb', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.totalwb',
	initComponent : function () {
		Ext.apply(this, {
			items : ['->', {
					xtype : 'label',
					text : '',
					itemId : 'lab1'
				}, '-', {
					xtype : 'label',
					text : '',
					itemId : 'lab2'
				}, '-', {
					xtype : 'label',
					text : '',
					itemId : 'lab3'
				}, '-', {
					xtype : 'label',
					text : '',
					itemId : 'lab4'
				}
			]
		});
		this.callParent(arguments);
	}
});
