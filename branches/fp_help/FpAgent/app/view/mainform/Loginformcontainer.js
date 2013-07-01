Ext.define('FPAgent.view.mainform.Loginformcontainer', {
	extend : 'Ext.container.Container',
	alias : 'widget.loginformcontainer',
	requires : ['FPAgent.view.mainform.Loginform'],
	layout : {
		type : 'vbox',
		align : 'center',
		pack : 'center'
	},
	items : [
	{xtype : 'container',
	layout : {
		type : 'vbox',
		align : 'center',
		pack : 'end'
	},
	flex : 1,
	items:[
			{
					xtype : 'loginform'
				}
				]
				},
			{ xtype : 'container',
			flex : 1,
			
			layout : {
		type : 'vbox',
		align : 'center',
		pack : 'end'
	},
			items: [
			{
					xtype : 'panel',
					title : 'ФлипПост WEB - список изменений',
					width : 350,
					height : 240,
					//autoScroll : true,
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
