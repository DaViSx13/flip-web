Ext.define('FPAgent.view.wbs.ViewExWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.viewexwin',
	requires : ['FPAgent.view.wbs.ViewExGrid', 'FPAgent.view.wbs.ViewExForm'],
	title : 'Просмотр исключений',
	layout : 'border',
	autoShow : true,
	height : 300,
	width : 550,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'viewexgrid',
				region : 'center',
				flex : 2
			}, {
				xtype : 'viewexform',
				split : true,
				region : 'south',
				flex : 1
			}
		]
		this.callParent(arguments);
	}
});
