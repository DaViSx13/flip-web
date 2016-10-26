Ext.define('FPAgent.view.mainform.WbGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.wbgrid',
	autoScroll : true,
	requires : ['FPAgent.view.mainform.TotalWb'],
	store : 'WbSt',
	columns : [{
			text : FPAgent.lib.Translate.tr("WbGrid.wb_no"),//'№ Накладной',
			dataIndex : 'wb_no',
			width : 200
		}, {
			text : FPAgent.lib.Translate.tr("WbGrid.dtd"),//'РДД',
			dataIndex : 'dtd',
			xtype : 'datecolumn',
			format : 'd.m.Y',
			width : 200
		}, {
			text : 'ORG',
			dataIndex : 'org',
			width : 50
		}, {
			text : FPAgent.lib.Translate.tr("WbGrid.s_co"),//'Отправитель',
			dataIndex : 's_co',
			flex : 1
		}, {
			text : 'DEST',
			dataIndex : 'dest',
			width : 50
		}, {
			text : FPAgent.lib.Translate.tr("WbGrid.r_co"),//'Получатель',
			dataIndex : 'r_co',
			flex : 1
		}, {
			text : FPAgent.lib.Translate.tr("WbGrid.shpcs"),//'Мест',
			xtype : 'numbercolumn',
			format : '0',
			dataIndex : 'shpcs',
			width : 50
		}, {
			text : FPAgent.lib.Translate.tr("WbGrid.shwt"),//'Вес',
			xtype : 'numbercolumn',
			format : '0.00',
			dataIndex : 'shwt',
			width : 50
		}, {
			text : FPAgent.lib.Translate.tr("WbGrid.shvol_wt"),//'V вес',
			xtype : 'numbercolumn',
			format : '0.00',
			dataIndex : 'shvol_wt',
			width : 50
		}
	],
	dockedItems : [{
			xtype : 'totalwb',
			dock : 'bottom'
		}
	]
});
