Ext.define('fplk.view.orders.TemplWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.templwin',
	requires : ['fplk.view.orders.TemplForm'],
	title : 'Новый шаблон',
	layout : 'vbox',
	autoShow : true,
	height : 520,
	width : 770,
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
