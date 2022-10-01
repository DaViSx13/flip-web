Ext.define('FPClient.view.orders.TemplWinImport', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.templwinimport',
	requires : ['FPClient.view.orders.TemplFormImport'],
	title : 'Импорт шаблонов',
	layout : 'vbox',
	autoShow : true,
	height : 220,
	width : 500,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'templformimport'
			}
		];
		this.buttons = [{
				text : 'Импорт',
				action : 'import'
			}, {
				text : 'Отмена',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
