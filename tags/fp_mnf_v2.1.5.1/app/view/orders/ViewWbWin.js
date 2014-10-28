Ext.define('FPAgent.view.orders.ViewWbWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.viewwbwin',
	requires : ['FPAgent.view.orders.ViewWbForm'],
	title : 'Просмотр накладной',
	layout : 'fit',
	autoShow : true,
	height : 600,
	width : 763,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'viewwbform',
				styleHtmlContent : true,
				styleHtmlCls : 'wbtemplate'
			}
		];
		this.buttons = [{
				text : 'Закрыть',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
