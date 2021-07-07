Ext.define('fplk.view.orders.UseTemplWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.usetemplwin',
	requires : ['fplk.view.orders.UseTemplForm'],
	title : 'Выберите шаблон',
	layout : 'fit',
	autoShow : true,
	height : 96,
	width : 510,
	closable : false,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'usetemplform'
			}
		];
		this.buttons = [{
				text : 'Выбрать',
				action : 'set'
			}, {
				text : 'Отмена',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
