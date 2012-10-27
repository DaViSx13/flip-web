Ext.define('Courier.view.OrderWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.orderwin',
	requires : ['Courier.view.OrderForm'],
	title : 'Заказ',
	layout : 'fit',
	autoShow : true,
	height : 450,
	width : 280,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'orderform'
			}
		];
		this.buttons = [/*{
				text : 'Сохранить',
				action : 'save'
			}, */{
				text : 'Закрыть',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
