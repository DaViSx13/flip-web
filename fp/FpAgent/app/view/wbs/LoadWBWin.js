Ext.define('FPAgent.view.wbs.LoadWBWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.loadwbwin',
	requires : ['FPAgent.view.wbs.LoadWBForm'],
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
				xtype : 'loadwbform'
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
