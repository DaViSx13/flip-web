Ext.define('Courier.view.UchetList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.uchetlist',
	store : 'Uchets',
	requires : ['Courier.view.NewPodWin', 'Courier.view.Info'],
	viewConfig: {
            plugins: {
                ptype: 'gridviewdragdrop',
				dragText: 'Перетащите для сортировки',
				/*
                dragGroup: 'UchetListDDGroup',
                dropGroup: 'UchetListDDGroup'*/
            },
			getRowClass: function(record, index) {
							if (record.get('isview') == 1){
							var ret ='rec-';
							} else {
							var ret ='rec-notview-';
							}
							if (record.get('isredy') == 1 || record.get('tdd')) {
									ret=ret+'gray';
									return ret;
							} else if ((!record.get('tdd') && record.get('rectype')==1)  || record.get('ordstatus')=='Готов' || record.get('rectype')==2) {
									ret=ret+'green';
									return ret;
							} else if (record.get('ordstatus')=='Не готов') {
									ret=ret+'red';
									return ret;
							}
			}
			
			
			},
	columns : [{
			itemId : '0',
			text : 'Статус',
			dataIndex : 'ordstatus'
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
			xtype: 'actioncolumn',
			text : 'В пути',
			itemId: 'inway',
			items : [{
						
						getClass : function (v, meta, rec) {
						
							if (rec.get('inway') > 0 && !rec.get('tdd') && rec.get('isredy')==0) {
								this.items[0].tooltip = 'Едем сюда';
								return 'ex-ch';
							} else {
							this.items[0].tooltip = 'Не определено';
							return 'ex-unch';
							}
						},
						handler : function (grid, rowIndex, colIndex, node, e, record, rowNode) {
							var action = 'set_way_action';
							this.fireEvent('item_way_click', this, action, grid, rowIndex, colIndex, record, node);
						}
					}
				]
			
		}, {
			xtype: 'actioncolumn',
			text: 'Выполнено',
			itemId: 'isredy',
			items : [{
						
						getClass : function (v, meta, rec) {
						
							if (rec.get('isredy') > 0 && (rec.get('rectype') == 0 || rec.get('rectype') == 2)) {
								this.items[0].tooltip = 'Выполнено';
								return 'ex-ch';
							} else if (rec.get('isredy') < 1 && (rec.get('rectype') == 0 || rec.get('rectype') == 2)) {
							this.items[0].tooltip = 'Не выполнено';
							return 'ex-unch';
							}
						},
						handler : function (grid, rowIndex, colIndex, node, e, record, rowNode) {
							var action = 'set_redy_action';
							this.fireEvent('item_redy_click', this, action, grid, rowIndex, colIndex, record, node);
						}
					}
				]
	  
		}, {
			text : 'ПОД',
			dataIndex : 'tdd',
			itemId : 'pod'
		}, {
			text : 'Количество',
			dataIndex : 'packs'
		}, {
			dataIndex : 'rectype',
			text : 'Тип',
			xtype : 'numbercolumn',
			format : '0'
		}
	],
	
	dockedItems : [{
			xtype : 'info',
			dock : 'top'
		}
	]
});
