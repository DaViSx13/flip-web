Ext.define('FPClient.view.mainform.AdmTool', {
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
		'->',
		{
			tooltip : 'Пакетный расчет',
			text : 'Пакетный расчет',
			iconCls : 'calc',
			action : 'showGroupClac',
			xtype : 'button'
		},
		' ',
		{
			tooltip : 'Тарифы',
			text : 'Тарифы',
			iconCls : 'excel',
			action : 'tariffs',
			xtype : 'button'
		},' ', {
			xtype : 'label',
			text : 'UserName'
		},
		' ', ' ', ' ',
		 {
			tooltip : 'Помощь',
			iconCls : 'help',
			action : 'help',
			xtype : 'button',
			hidden: true
		},
		{
			tooltip : 'Выход',
			iconCls : 'exit-user',
			action : 'logout',
			xtype : 'button'
		}, ' '
	]
});
