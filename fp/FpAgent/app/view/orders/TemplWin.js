Ext.define('FPAgent.view.orders.TemplWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.templwin',
	requires : ['FPAgent.view.orders.TemplForm'],
	title : FPAgent.lib.Translate.tr("TemplWin.title"),//'Новый шаблон',
	layout : 'vbox',
	autoShow : true,
	height : 500,
	width : 770,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'templform'				
			}
		];
		this.buttons = [{
				text : FPAgent.lib.Translate.tr("TemplWin.button.save"),//'Сохранить',
				action : 'save'
			}, {
				text : FPAgent.lib.Translate.tr("TemplWin.button.cancel"),//'Отмена',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
