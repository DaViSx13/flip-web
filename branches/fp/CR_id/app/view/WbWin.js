Ext.define('Courier.view.WbWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.wbwin',
	requires : ['Courier.view.WbForm'],
	title : 'Накладная',
	layout : 'fit',
	autoShow : true,
	height : 500,
	width : 600,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'wbform'
			}
		];
		this.buttons = [/*{
			text : 'Сохранить',
			action : 'save'
			}, */
			{
				text : 'Закрыть',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
