Ext.define('fplk.view.webwbs.WbWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.wbwin',
	requires : ['fplk.view.webwbs.WbForm'],
	title : 'Новая веб накладная',
	layout : 'vbox',
	autoShow : true,
	height : 650,
	width : 770,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'wbform'
				
			}/*,{
			xtype : 'loadfileform'
			}*/
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
