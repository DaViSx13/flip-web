Ext.define('FPClient.view.wbs.WbsTotal', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.wbstotal',
	items : [{
			xtype : 'label',
			text : '',
			itemId : 'lab1'
		}, '->', {
			xtype : 'label',
			text : '',
			itemId : 'lab2'
		}, '-', {
			xtype : 'label',
			text : '',
			itemId : 'lab3'
		}
	]
});
