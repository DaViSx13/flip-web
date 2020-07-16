Ext.define('fplk.view.orders.OrdWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.ordwin',
	requires : ['fplk.view.orders.OrdForm', 'fplk.view.orders.LoadFileForm'],
	title : 'Новый заказ',
	layout : 'vbox',
	autoShow : true,
	height : 650,
	width : 770,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'ordform'
				
			}/*,{
			xtype : 'loadfileform'
			}*/
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
