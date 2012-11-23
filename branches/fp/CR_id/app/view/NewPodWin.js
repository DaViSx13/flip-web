Ext.define('Courier.view.NewPodWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.newpodwin',
	requires : ['Courier.view.NewPodForm'],
	title : 'Подтверждение о доставке накладной',
	layout : 'fit',
	autoShow : true,
	height : 240,
	width : 350,
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
