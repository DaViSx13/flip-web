Ext.define('FPAgent.view.orders.WbNoWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.wbnowin',
	requires : ['FPAgent.view.orders.WbNoForm'],
	title : 'Введите № накладной',
	layout : 'fit',
	autoShow : true,
	height : 95,
	width : 180,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'wbnoform'
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
