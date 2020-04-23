Ext.define('FPClient.view.orders.WbNoForm', {
	alias  : 'widget.wbnoform',
	extend : 'Ext.form.Panel',
	requires : ['Ext.grid.plugin.RowEditing',
				'Ext.grid.RowNumberer'],
	width  : 400,
	height : 300,
	layout : 'fit',
	bodyPadding : 5,
	items : [{
			xtype 	: 'gridpanel',
			flex    : 1,
			store	: 'WbNoSt',
			plugins:[{
				ptype			:'rowediting',
				clicksToEdit	: 2,
				pluginId		: "editRow"
			}],
			tbar:[{
				xtype	: 'button',
				text	: 'Добавить',
				action	: 'addRecord',
				flex	: 1
			}],
			columns: [{
				xtype		: 'rownumberer',
				header		: '№'
			}, {
				header		: 'Номер накладной',
				dataIndex	: 'wbNum',
				width		: '60%',
				editor		: {
								xtype 		: 'textfield',
								autoBlank	: false
							  }
			}, {
				header		: 'Стоимость',
				dataIndex	: 'cost',
				flex		: 1
			}, {
				xtype		: 'actioncolumn',
				width		: '5%',
				items		: [{
					xtype	: 'button',
					icon 	: 'resources/images/exit.gif',
					text	: 'Удалить',
					handler 	: function (grid, rowIndex) {
						let store = grid.getStore();
						store.removeAt(rowIndex);
					}
				}]
			}]
	}]
});
