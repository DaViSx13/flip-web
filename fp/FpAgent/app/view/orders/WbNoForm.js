Ext.define('FPAgent.view.orders.WbNoForm', {
	alias : 'widget.wbnoform',
	extend : 'Ext.form.Panel',
	requires : ['Ext.grid.plugin.RowEditing',
				'Ext.grid.RowNumberer'],
	width  : 400,
	height : 300,
	layout : 'fit',
	bodyPadding : 5,
	items : [{
		xtype 	: 'gridpanel',
		viewConfig: {
			stripeRows: false,
			getRowClass: function(record) {
				if (record.get('isdeleted') == 1) {
					return "colorDeleted-row"
				}
			}
		},
		flex    : 1,
		store	: 'WbNoSt',
		plugins:[{
			ptype			:'rowediting',
			clicksToEdit	: 0,
			pluginId		: "editRow"
		}],
		tbar:[{
				iconCls: 'add',
				text: 'Добавить',
				action: 'addRecord',
				iconAlign: 'left'
		}, {
				iconCls: 'eyeOpened',
				text: 'Показать удаленные',
				action: 'showDeleted',
				iconAlign: 'left'
		}, {
				text : FPAgent.lib.Translate.tr("OrdTool.action.wbview"),//'Просмотр накладной',
				iconCls : 'wbview',
				action : 'wbview'
		}],
		columns: [{
			xtype		: 'rownumberer',
			header		: '№'
		}, {
			header		: 'Номер накладной',
			dataIndex	: 'web_num',
			width		: '60%',
			editor		: {
				xtype 		: 'textfield',
				autoBlank	: false
			}
		}, {
			header		: 'Стоимость',
			dataIndex	: 'cost',
			flex		: 1,
			editor		: {
				xtype 		: 'numberfield',
				autoBlank	: false
			}
		}, {
			xtype		: 'actioncolumn',
			width		: '5%',
			renderer	: function(value, meta, record) {
				let isDel = record.get('isdeleted');

				return (isDel == 0)
					   ? '<img src="resources/images/exit.gif" />'
					   : '<img src="resources/images/restore.png" width="15" height="15"/>';
			},

			items		: [{
				xtype	: 'button',
				text	: 'Удалить',
			}]
		}]
	}]
});
