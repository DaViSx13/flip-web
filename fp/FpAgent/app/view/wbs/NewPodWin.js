Ext.define('FPAgent.view.wbs.NewPodWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.newpodwin',
	requires : ['FPAgent.view.wbs.NewPodForm'],
	title : FPAgent.lib.Translate.tr("NewPodWin.title"),//'Подтверждение о доставке накладной',
	layout : 'fit',
	autoShow : true,
	height : 220,
	width : 300,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'newpodform'
			}
		];
		this.buttons = [{
				text : FPAgent.lib.Translate.tr("NewPodWin.save"),//'Сохранить',
				action : 'save'
			}, {
				text : FPAgent.lib.Translate.tr("NewPodWin.cancel"),//'Отмена',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
