Ext.define('fplk.view.orders.OrdWinSber', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.ordwinsber',
	requires : ['fplk.view.orders.OrdFormSber', 'fplk.view.orders.LoadFileForm'],
	title : 'Новый заказ',
	layout : 'vbox',
	autoShow : true,
	height : 720,
	width : 770,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'ordformsber'
				
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
