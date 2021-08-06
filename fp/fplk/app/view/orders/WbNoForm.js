Ext.define('fplk.view.orders.WbNoForm', {
	alias : 'widget.wbnoform',
	extend : 'Ext.form.Panel',
	requires : ['Ext.grid.plugin.RowEditing',
		'Ext.grid.RowNumberer'],
	width  : 300,
	height : 300,
	layout : 'fit',
	bodyPadding : 5,
	items : [{
		xtype 	: 'gridpanel',
		flex    : 1,
		store	: 'WbNoSt',
		plugins:[{
			ptype			:'rowediting',
			clicksToEdit	: 0,
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
			header		: '№',
			width		: '20%'
		}, {
			header		: 'Номер накладной',
			dataIndex	: 'wbnum',
			width		: '79%',
			editor		: {
				xtype 		: 'textfield',
				autoBlank	: false
			}
		}]
	}]
});

