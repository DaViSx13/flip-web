Ext.define('FPClient.view.orders.TemplWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.templwin',
	requires : ['FPClient.view.orders.TemplForm'],
	title : 'Новый шаблон',
	layout : 'vbox',
	autoShow : true,
	height : 500,
	width : 390,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'templform'				
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
