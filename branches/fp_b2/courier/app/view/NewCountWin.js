Ext.define('Courier.view.NewCountWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.newcountwin',
	requires : ['Courier.view.NewCountForm'],
	title : 'Количество',
	layout : 'fit',
	autoShow : true,
	height : 170,
	width : 290,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'newcountform'
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
