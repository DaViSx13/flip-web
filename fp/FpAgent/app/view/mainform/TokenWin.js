Ext.define('FPAgent.view.mainform.TokenWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.tokenwin',
	requires : ['FPAgent.view.mainform.TokenForm'],
	title : FPAgent.lib.Translate.tr("LoadWBWin.title"),//'Импорт информации о доставке',
	layout : 'fit',
	autoShow : true,
	height : 270,
	width : 500,
	closable : false,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'tokenform'
			}
		];
		this.buttons = [{
				text : FPAgent.lib.Translate.tr("LoadWBWin.imp"),//'Импортировать',
				action : 'imp'
			}, {
				text : FPAgent.lib.Translate.tr("LoadWBWin.cancel"),//'Отмена',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
