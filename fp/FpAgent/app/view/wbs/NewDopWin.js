Ext.define('FPAgent.view.wbs.NewDopWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.newdopwin',
	requires : ['FPAgent.view.wbs.NewDopForm'],
	title : FPAgent.lib.Translate.tr("NewDopWin.title"),//'Заявка на доп. тариф',
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
				text : FPAgent.lib.Translate.tr("NewDopWin.save"),//'Сохранить',
				action : 'save'
			}, {
				text : FPAgent.lib.Translate.tr("NewDopWin.cancel"),//'Отмена',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
