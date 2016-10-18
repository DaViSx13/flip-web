Ext.define('FPAgent.view.orders.UseTemplWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.usetemplwin',
	requires : ['FPAgent.view.orders.UseTemplForm'],
	title : FPAgent.lib.Translate.tr("UseTemplWin.title"),//'Выберите шаблон',
	layout : 'fit',
	autoShow : true,
	height : 96,
	width : 210,
	closable : false,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'usetemplform'
			}
		];
		this.buttons = [{
				text : FPAgent.lib.Translate.tr("UseTemplWin.button.set"),//'Выбрать',
				action : 'set'
			}, {
				text : FPAgent.lib.Translate.tr("UseTemplWin.button.cancel"),//'Отмена',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
