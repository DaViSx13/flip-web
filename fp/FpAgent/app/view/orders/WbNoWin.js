Ext.define('FPAgent.view.orders.WbNoWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.wbnowin',
	requires : ['FPAgent.view.orders.WbNoForm'],
	title : FPAgent.lib.Translate.tr("WbNoWin.title"),//'Введите № накладной',
	layout : 'fit',
	autoShow : true,
	height : 95,
	width : 180,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'wbnoform'
			}
		];
		this.buttons = [{
				text : FPAgent.lib.Translate.tr("WbNoWin.button.save"),//'Сохранить',
				action : 'save'
			}, {
				text : FPAgent.lib.Translate.tr("WbNoWin.button.cancel"),//'Отмена',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
