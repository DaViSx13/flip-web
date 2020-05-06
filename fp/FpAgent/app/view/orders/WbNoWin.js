Ext.define('FPAgent.view.orders.WbNoWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.wbnowin',
	requires : ['FPAgent.view.orders.WbNoForm'],
	title : FPAgent.lib.Translate.tr("WbNoWin.title"),//'Введите № накладной',
	title : 'Список накладных',
	layout : 'fit',
	autoShow : true,
	height : 300,
	width : 400,
	closable: false,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'wbnoform'
			}
		];
		this.buttons = [{
			xtype	: 'label',
			text	: 'Синхронизаия',
			name	: 'webNoStatusBar',
			hidden	: true,
			flex	: 1,
			height	: '100%'
		}, {
				text : 'Закрыть',
				action : 'syncData'
			}
		];
		this.callParent(arguments);
	}
});
