Ext.define('FPAgent.view.mainform.AdmTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.admtool',
	items : [{
			xtype : 'buttongroup',
			hidden : true,
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
		},' ',			
			{
			tooltip : 'Список',
			text : 'Список',
			iconCls : 'list',
			action : 'list',
			
			enableToggle : true,
			xtype : 'button'
		},' ',{
			tooltip : 'Шаблоны',
			text : 'Шаблоны',
			iconCls : 'templ',
			action : 'templ',
			
			enableToggle : true,
			xtype : 'button'
		},' ',
		'->', {
			xtype : 'label',
			text : 'UserName'
		},
		' ', ' ', ' ',
		 {
			tooltip : 'Помощь',
			iconCls : 'help',
			action : 'help',
			xtype : 'button'
		},
		{
			tooltip : 'Выход',
			iconCls : 'exit-user',
			action : 'logout',
			xtype : 'button'
		}, ' '
	]
});
