Ext.define('FpMnf.view.wbs.ViewExGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.viewexgrid',
	autoScroll : true,
	store : 'ViewExStore',
	columns : [{
			text : '№ Накладной',
			dataIndex : 'wbno'
		}, {
			text : 'Код',
			dataIndex : 'excode'
		}, {
			text : 'Трек',
			dataIndex : 'loc'
		}, {
			text : 'Описание',
			flex: 1,
			dataIndex : 'exdesc'
		}, {
			text : 'Дата события',
			/*xtype : 'datecolumn',
			format : 'd.m.Y H:i',*/
			dataIndex : 'raised_txt'
		}
	]
});
