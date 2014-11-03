Ext.define('FPAgent.view.wbs.LoadWBWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.loadwbwin',
	requires : ['FPAgent.view.wbs.LoadWBForm'],
	title : 'Импорт информации о доставке',
	layout : 'fit',
	autoShow : true,
	height : 270,
	width : 500,
	closable : false,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'loadwbform'
			}
		];
		this.buttons = [{
				text : 'Импортировать',
				action : 'imp'
			}, {
				text : 'Отмена',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
