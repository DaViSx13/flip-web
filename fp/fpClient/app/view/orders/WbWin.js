Ext.define('FPClient.view.orders.WbWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.wbwin',
	requires : ['FPClient.view.orders.WbForm'],
	title : 'Новая веб накладная',
	layout : 'vbox',
	autoShow : true,
	height : 500,
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
