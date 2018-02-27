Ext.define('FPClient.view.webwbs.WebWbsGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.webwbsgrid',
	autoScroll : true,
	//requires : ['FPClient.view.mainform.TotalWb'],
	store : 'WebWbSt',
	columns : [{
			text : '№ Накладной',
			dataIndex : 'wb_no',
			width : 200
		}, {
			text : 'ORG',
			dataIndex : 'org',
			width : 50
		}, {
			text : 'Отправитель',
			dataIndex : 's_co',
			flex : 1
		}, {
			text : 'DEST',
			dataIndex : 'dest',
			width : 50
		}, {
			text : 'Получатель',
			dataIndex : 'r_co',
			flex : 1
		}/*, {
			text : 'Мест',
			xtype : 'numbercolumn',
			format : '0',
			dataIndex : 'shpcs',
			width : 50
		}, {
			text : 'Вес',
			xtype : 'numbercolumn',
			format : '0.00',
			dataIndex : 'shwt',
			width : 50
		}, {
			text : 'V вес',
			xtype : 'numbercolumn',
			format : '0.00',
			dataIndex : 'shvol_wt',
			width : 50
		}*/
	],
	dockedItems : [{
			xtype : 'webwbstool',
			dock : 'top'
		}
	]
});