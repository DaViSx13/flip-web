Ext.define('Courier.view.Info', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.info',
	//title: 'infopanel',
	items : [{
			xtype : 'label',
			text : ''
		}, '-', {
			text : 'test',
			action : 'test'
		}, {
			xtype : 'textareafield',
			grow : true,
			growMax : 100,
			name : 'message',
			fieldLabel : 'Message',
			//anchor : '100%'
			flex : 1
		},
		'->', {
			xtype : 'label',
			itemId : 'count',
			text : ''
		}
		
	]
});
