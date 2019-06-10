Ext.define('FPAgent.view.wbs.ExportWbWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.exportwbwin',
	requires : ['FPAgent.view.wbs.ExportWbForm'],
	title : FPAgent.lib.Translate.tr("NewDopWin.title"),//'Заявка на доп. тариф',
	layout : 'fit',
	autoShow : true,
	height : 250,
	width : 340,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'exportwbform'
			}
		];
		this.buttons = [{
				text : FPAgent.lib.Translate.tr("NewDopWin.save"),//'Сохранить',
				action : 'excel'
			}, {
				text : FPAgent.lib.Translate.tr("NewDopWin.cancel"),//'Отмена',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
