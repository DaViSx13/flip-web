Ext.define('FpMnf.view.wbs.NewPodWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.newpodwin',
	requires : ['FpMnf.view.wbs.NewPodForm'],
	title : 'Подтверждение о доставке накладной',
	layout : 'fit',
	autoShow : true,
	height : 220,
	width : 290,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'newpodform'
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
