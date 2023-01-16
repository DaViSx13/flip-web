Ext.define('FPAgent.view.orders.OrdWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.ordwin',
	requires : ['FPAgent.view.orders.OrdForm', 'FPAgent.view.orders.LoadFileForm'],
	title : FPAgent.lib.Translate.tr("OrdWin.title"),//'Новый заказ',
	layout : 'vbox',
	autoShow : true,
	height : 690,
	width : 770,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'ordform'
				
			},{
			xtype : 'loadfileform'
			}
		];
		this.buttons = [{
				text : FPAgent.lib.Translate.tr("OrdWin.button.save"),//'Сохранить',
				action : 'save'
			}, {
				text : FPAgent.lib.Translate.tr("OrdWin.button.cancel"),//'Отмена',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
