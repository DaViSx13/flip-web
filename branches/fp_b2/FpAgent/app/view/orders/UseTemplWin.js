Ext.define('FPAgent.view.orders.UseTemplWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.usetemplwin',
	requires : ['FPAgent.view.orders.UseTemplForm'],
	title : 'Введите № накладной',
	layout : 'fit',
	autoShow : true,
	height : 95,
	width : 180,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'usetemplform'
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
