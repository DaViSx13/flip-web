Ext.define('FPAgent.view.wbs.ViewExGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.viewexgrid',
	autoScroll : true,
	store : 'ViewExStore',
	columns : [{
			text : FPAgent.lib.Translate.tr("ViewExGrid.wbno"),//'№ Накладной',
			dataIndex : 'wbno'
		}, {
			text : FPAgent.lib.Translate.tr("ViewExGrid.excode"),//'Код',
			dataIndex : 'excode'
		}, {
			text : FPAgent.lib.Translate.tr("ViewExGrid.loc"),//'Трек',
			dataIndex : 'loc'
		}, {
			text : FPAgent.lib.Translate.tr("ViewExGrid.exdesc"),//'Описание',
			flex : 1,
			dataIndex : 'exdesc'
		}, {
			text : FPAgent.lib.Translate.tr("ViewExGrid.raised_txt"),//'Дата события',
			dataIndex : 'raised_txt'
		}
	]
});
