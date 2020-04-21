Ext.define('fplk.view.mainform.TarifWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.tarifwin',
	requires : ['fplk.view.mainform.TarifForm'],
	title : 'Расчет стоимости доставки',
	layout : 'fit',
	autoShow : true,
	height : 230,
	width : 750,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'tarifform'
			}
		];
		this.buttons = [{
				text : 'Рассчитать',
				action : 'calculate'
			}, {
				text : 'Закрыть',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
