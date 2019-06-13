Ext.define('FPAgent.view.wbs.ExportWbWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.exportwbwin',
	requires : ['FPAgent.view.wbs.ExportWbForm'],
	title : FPAgent.lib.Translate.tr("OrdTool.action.excel"),//'Экспорт в файл Excel',
	layout : 'fit',
	autoShow : true,
	height : 130,
	width : 230,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'exportwbform'
			}
		];
		this.buttons = [{
				text : FPAgent.lib.Translate.tr("OrdTool.action.excel"),//'Сохранить',
				iconCls : 'excel',
				action : 'exp'
			}, {
				text : FPAgent.lib.Translate.tr("NewDopWin.cancel"),//'Отмена',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
