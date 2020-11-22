Ext.define('fplk.view.orders.OrdExWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.ordexwin',
	requires : ['fplk.view.orders.OrdExGrid', 'fplk.view.orders.OrdExForm'],
	title : 'Просмотр исключений',
	layout : 'border',
	autoShow : true,
	height : 300,
	width : 650,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'ordexgrid',
				region : 'center',
				flex : 2
			}, {
				xtype : 'ordexform',
				split : true,
				region : 'south',
				flex : 1
			}];
		this.callParent(arguments);
	}
});
