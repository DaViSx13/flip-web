Ext.define('FPAgent.view.mainform.TokenWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.tokenwin',
	requires : ['FPAgent.view.mainform.TokenForm'],
	title : FPAgent.lib.Translate.tr("TokenWin.token_form_name"),
	layout : 'fit',
	autoShow : true,
	height : 100,
	width : 250,
	closable : false,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'tokenform'
			}
		];
		this.buttons = [{
				text : FPAgent.lib.Translate.tr("OrdTool.action.new"),
				action : 'settoken'
			}, {
				text : FPAgent.lib.Translate.tr("ViewWbWin.button.close"),
				scope : this,
				handler : this.close
			}, {
				text : FPAgent.lib.Translate.tr("AdmTool.help"),
				scope : this,
				iconCls : 'help',
			    action : 'help'
			}
		];
		this.callParent(arguments);
	}
});
