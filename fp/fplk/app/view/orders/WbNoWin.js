Ext.define('fplk.view.orders.WbNoWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.wbnowin',
	requires : ['fplk.view.orders.WbNoForm'],
	title : 'Список накладных',
	layout : 'fit',
	autoShow : true,
	height : 300,
	width : 300,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
			xtype : 'wbnoform'
		}
		];
		this.buttons = [{
			xtype	: 'button',
            text	: 'Просмотр накладной',
			action	: 'showWb'
		}, {
			text 	: 'Отмена',
			scope 	: this,
			handler : this.close
		}];
		this.callParent(arguments);
	}
});
