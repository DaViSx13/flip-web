Ext.define('FPAgent.view.orders.LoadOrdersWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.loadorderswin',
	requires : ['FPAgent.view.orders.LoadOrdersForm'],
	title : 'Импорт информации о заказах',
	layout : 'fit',
	autoShow : true,
	height : 290,
	width : 600,
	closable : false,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'loadordersform'
			}
		];
		this.buttons = [{
				text : 'Импортировать',
				action : 'imp'
			}, {
				text : 'Отмена',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
