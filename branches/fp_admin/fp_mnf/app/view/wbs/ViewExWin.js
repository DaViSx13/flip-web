Ext.define('FpMnf.view.wbs.ViewExWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.viewexwin',
	requires : ['FpMnf.view.wbs.ViewExGrid'],
	title : 'Просмотр исключений',
	layout : 'fit',
	autoShow : true,
	height : 300,
	width : 550,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'viewexgrid'
			}
		]
		this.callParent(arguments);
	}
});
