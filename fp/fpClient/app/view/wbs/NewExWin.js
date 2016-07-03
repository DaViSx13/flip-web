Ext.define('FPClient.view.wbs.NewExWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.newexwin',
	requires : ['FPClient.view.wbs.NewExForm'],
	title : 'Новое исключение',
	layout : 'fit',
	autoShow : true,
	height : 340,
	width : 370,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'newexform'
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
