Ext.define('FPAgent.view.mainform.AdmTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.admtool',
	items : [{
			xtype : 'buttongroup',
			itemId : 'admgroup',
			items : [{
					xtype : 'comboagent'
				}
			],
			hidden : true,
			style : {
				marginLeft : '2px',
				marginRight : '20px'
			}
		},
		'->', {
			xtype : 'label',
			text : 'UserName'
		},
		' ', ' ', ' ', {
			tooltip : 'Разлогиниться',
			iconCls : 'exit-user',
			action : 'logout',
			xtype : 'button'
		}, ' '
	]
});
