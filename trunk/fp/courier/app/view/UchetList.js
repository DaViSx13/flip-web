Ext.define('Courier.view.UchetList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.uchetlist',
	store : 'Uchets',
	requires : ['Courier.view.NewPodWin', 'Courier.view.Info'],
	viewConfig: {
            plugins: {
                ptype: 'gridviewdragdrop',
                dragGroup: 'UchetListDDGroup',
                dropGroup: 'UchetListDDGroup'
            }
			},
	columns : [{
			itemId : '0',
			text : 'Статус'
			
		}, {
			text : '№',
			itemId : '1',
			dataIndex : 'displayno'
		}, {
			text : 'Адрес',
			itemId : '2',
			flex : 1,
			dataIndex : 'aaddress'
		}, {
			text : 'Клиент',
			itemId : '3',
			dataIndex : 'client'
		}, {
			text : 'С',
			itemId : '4',
			dataIndex : 'timeb'
		}, {
			text : 'До',
			itemId : '5',
			dataIndex : 'timee'
		}, {
			text : 'В пути'
		}, {
			text : 'Выполнено'
		}, {
			text : 'ПОД',
			dataIndex : 'tdd',
			itemId : 'pod'
		}, {
			text : 'Количество'
		}, {
			dataIndex : 'rectype',
			text : 'Тип'
		}
	],
	dockedItems : [{
			xtype : 'info',
			dock : 'top'
		}
	]
});
