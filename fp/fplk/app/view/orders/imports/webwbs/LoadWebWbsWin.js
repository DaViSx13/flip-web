Ext.define('fplk.view.orders.imports.webwbs.LoadWebWbsWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.loadwebwbswin',
	requires : ['fplk.view.orders.imports.webwbs.LoadWebWbsForm'],
	title : 'Импорт накладных',
	layout : 'fit',
	autoShow : true,
	height : 290,
	width : 600,
	closable : false,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'loadwebwbsform'
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
