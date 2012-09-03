Ext.define('FpMnf.view.wbs.NewDopWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.newdopwin',
	requires : ['FpMnf.view.wbs.NewDopForm'],
	title : 'Заявка на доп. тариф',
	layout : 'fit',
	autoShow : true,
	height : 250,
	width : 340,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'newdopform'
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
