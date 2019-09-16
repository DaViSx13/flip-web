Ext.define('FPAgent.view.orders.OrdExWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.ordexwin',
	requires : ['FPAgent.view.orders.OrdExGrid', 'FPAgent.view.orders.OrdExForm'],
	title : FPAgent.lib.Translate.tr("ViewExWin.title"),//'Просмотр исключений',
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
			}
		]
		this.callParent(arguments);
	}
});
