Ext.define('FPAgent.view.users.UsersTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.userstool',
	items : [{
			text : 'Новый пользователь',
			iconCls : 'adduser',
			action : 'new'
		}, {
			text : 'Блокировать',
			iconCls : 'redusr',
			action : 'active'
		}
	]
});
