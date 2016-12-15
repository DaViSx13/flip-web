Ext.define('FPAgent.view.wbs.NewExWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.newexwin',
	requires : ['FPAgent.view.wbs.NewExForm'],
	title : FPAgent.lib.Translate.tr("NewExWin.title"),//'Новое исключение',
	layout : 'fit',
	autoShow : true,
	height : 340,
	width : 380,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'newexform'
			}
		];
		this.buttons = [{
				text : FPAgent.lib.Translate.tr("NewExWin.save"),//'Сохранить',
				action : 'save'
			}, {
				text : FPAgent.lib.Translate.tr("NewExWin.cancel"),//'Отмена',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
