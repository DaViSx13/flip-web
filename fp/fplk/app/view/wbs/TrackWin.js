Ext.define('fplk.view.wbs.TrackWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.trackwin',	
	title : 'Трек накладной',
	requires : ['fplk.view.wbs.TrackGrid'],
	layout : 'fit',
	autoShow : true,
	height : 200,
	width : 800,
	resizable : true,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'trackgrid'
			}
		];		
		this.callParent(arguments);
	}
});
