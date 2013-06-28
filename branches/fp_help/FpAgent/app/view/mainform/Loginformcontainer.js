Ext.define('FPAgent.view.mainform.Loginformcontainer', {
	extend : 'Ext.container.Container',
	alias : 'widget.loginformcontainer',
	requires : ['FPAgent.view.mainform.Loginform'],
	layout : {
		type : 'hbox',
		align : 'middle'
	},
	items : [{
			flex : 1,
			xtype : 'container'
		}, {
			flex : 1,
			xtype : 'container',
			minWidth : 270,
			layout : {
				type : 'vbox'
			},
			items : [{
					xtype : 'loginform'
				}
			]
		}, {
			width : 270,
			height : '100%',
			xtype : 'container',
			layout : {
				type : 'vbox',
				pack : 'end'
			},
			items : [{
					xtype : 'panel',
					title : 'ФлипПост WEB - список изменений',
					width : 240,
					height : 250,
					autoScroll : true,
					bodyPadding : 5,
					loader : {
						url : 'help/fpWeb.txt',
						autoLoad : true,
						renderer : 'html'
					}
				}
			]
		}
	]
});
