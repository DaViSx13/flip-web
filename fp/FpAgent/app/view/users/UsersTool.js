Ext.define('FPAgent.view.users.UsersTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.userstool',
	items : [{
			text : FPAgent.lib.Translate.tr("UsersTool.new"),//'Новый пользователь',
			iconCls : 'adduser',
			action : 'new'
		}, {
			text : FPAgent.lib.Translate.tr("UsersTool.active"),//'Блокировать',
			iconCls : 'redusr',
			action : 'active'
		}
	]
});
