Ext.define('fplk.view.users.imports.ImportUsersWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.importUserWin',
	requires : ['fplk.view.users.imports.ImportUsersForm'],
	title : 'Импорт пользователей',
	layout : 'fit',
	autoShow : true,
	height : 210,
	width : 580,
	closable : false,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'importuserform'
			}
		];
		this.buttons = [{
				text : 'Импортировать',
				action : 'imp'
			}, {
				text : 'Отмена',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
