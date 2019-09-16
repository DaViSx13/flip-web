Ext.define('FPClient.view.wbs.TrackGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.trackgrid',
	autoScroll : true,
	store : 'TrackSt',
	columns : [{
			text : '№',
			width : 30,
			dataIndex : 'id'
		}, {
			text : 'Информация отслеживания',
			flex : 2,
			dataIndex : 'trackinfo'
		}, {
			text : 'Время',
			dataIndex : 'atime'
		}, {
			text : 'Статус',	
			flex : 1,			
			dataIndex : 'astatus'
		}, {
			text : 'Локация',
			flex : 1,
			dataIndex : 'aloc'
		}
	]
});
