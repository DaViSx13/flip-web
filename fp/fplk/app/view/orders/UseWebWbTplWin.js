Ext.define('fplk.view.orders.UseWebWbTplWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.usewebwbtplwin',
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
				action : 'setwb'
			}, {
				text : 'Отмена',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
