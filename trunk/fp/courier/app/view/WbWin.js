Ext.define('Courier.view.WbWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.wbwin',
	requires : ['Courier.view.WbForm'],
	title : 'Подтверждение о доставке накладной',
	layout : 'fit',
	autoShow : true,
	height : 350,
	width : 290,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'wbform'
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
