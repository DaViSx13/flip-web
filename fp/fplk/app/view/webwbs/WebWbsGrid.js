Ext.define('fplk.view.webwbs.WebWbsGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.webwbsgrid',
	autoScroll : true,
	multiSelect: true,
	//requires : ['fplk.view.mainform.TotalWb'],
	viewConfig : {
		enableTextSelection: true
	},
	store : 'WebWbSt',
	columns : [{
			text : '№ Накладной',
			dataIndex : 'wb_no',
			width : 80
		}, {
			text : 'Дата',
			format : 'd.m.Y',
			xtype : 'datecolumn',
			dataIndex : 'orderdate',
			width : 150
		}, {
			text : 'ORG',
			dataIndex : 'org',
			width : 150
		}, {
			text : 'Отправитель',
			dataIndex : 's_co',
			flex : 1
		}, {
			text : 'DEST',
			dataIndex : 'dest',
			width : 150
		}, {
			text : 'Получатель',
			dataIndex : 'r_co',
			flex : 1
		}, {
			text : 'Заказ',
			xtype : 'numbercolumn',
			format : '0',
			dataIndex : 'ord_no',
			width : 50
		}, {
			text : 'Вес',
			xtype : 'numbercolumn',
			format : '0.00',
			dataIndex : 'wt',
			width : 50
		}, {
			text : 'V вес',
			xtype : 'numbercolumn',
			format : '0.00',
			dataIndex : 'vol_wt',
			width : 50
		}
	],
	dockedItems : [{
			xtype : 'webwbstool',
			dock : 'top'
		}, {
			xtype : 'webwbstotal',
			dock : 'bottom'
		}
	]
});