Ext.define('fplk.view.orders.TemplWinImport', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.templwinimport',
	requires : ['fplk.view.orders.TemplFormImport'],
	title : 'Импорт шаблонов',
	layout : 'vbox',
	autoShow : true,
	height : 200,
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
