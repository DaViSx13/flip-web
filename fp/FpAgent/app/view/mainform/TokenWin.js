Ext.define('FPAgent.view.mainform.TokenWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.tokenwin',
	requires : ['FPAgent.view.mainform.TokenForm'],
	title : FPAgent.lib.Translate.tr("Ключ для АПИ"),
	layout : 'fit',
	autoShow : true,
	height : 100,
	width : 180,
	closable : false,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'tokenform'
			}
		];
		this.buttons = [{
				text : FPAgent.lib.Translate.tr("Новый ключ"),
				action : 'settoken'
			}, {
				text : FPAgent.lib.Translate.tr("Закрыть"),
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
