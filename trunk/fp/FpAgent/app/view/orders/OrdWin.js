Ext.define('FPAgent.view.orders.OrdWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.ordwin',
	requires : ['FPAgent.view.orders.OrdForm'],
	title : 'Новый заказ',
	layout : 'fit',
	autoShow : true,
	height : 620,
	width : 770,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'ordform'
				
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
