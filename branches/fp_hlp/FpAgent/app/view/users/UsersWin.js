Ext.define('FPAgent.view.users.UsersWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.userswin',
	requires : ['FPAgent.view.users.UsersForm'],
	title : 'Добавить пользователя',
	layout : 'fit',
	autoShow : true,
	height : 280,
	width : 280,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'usersform'
			}
		];
		this.buttons = [{
				text : 'Сохранить',
				action : 'save'
			}, {
				text : 'Отмена',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
