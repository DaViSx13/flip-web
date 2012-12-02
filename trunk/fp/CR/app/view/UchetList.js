Ext.define('Courier.view.UchetList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.uchetlist',
	store : 'LocStore', //'Uchets',
	requires : ['Courier.view.NewPodWin', 'Courier.view.Info', 'Courier.view.Actions'],
	viewConfig : {
		getRowClass : function (record, index) {
			if (record.get('isview') == 1) {
				var ret = 'rec-';
			} else {
				var ret = 'rec-notview-';
			}
			
			if (record.get('isredy') == 1 || record.get('tdd')) {
				ret = ret + 'gray';
			} else if ((!record.get('tdd') && record.get('rectype') == 1) || record.get('ordstatus') != 'Не готов' || record.get('rectype') == 2) {
				ret = ret + 'green';
			} else if (record.get('ordstatus') == 'Не готов') {
				ret = ret + 'red';
			}
			
			return ret;
		}
	},
	columns : [{
			itemId : '0',
			text : 'Статус',
			menuDisabled : true,
			dataIndex : 'ordstatus'
		}, {
			xtype : 'actioncolumn',
			width : 33,
			menuDisabled : true,
			//text : 'Еду',
			itemId : 'acash',
			items : [{
					getClass : function (v, meta, rec) {
						if (rec.get('acash') > 0) {
							return 'ex-baks';
						}
					}
				}
			]
		}, {
			text : '№',
			menuDisabled : true,
			itemId : '1',
			dataIndex : 'displayno'
		}, {
			text : 'Адрес',
			menuDisabled : true,
			itemId : '2',
			flex : 1,
			dataIndex : 'aaddress',
			tdCls : 'wrap'
		}, {
			text : 'Клиент',
			menuDisabled : true,
			itemId : '3',
			dataIndex : 'client',
			tdCls : 'wrap'
		}, {
			text : 'С',
			itemId : '4',
			width : 60,
			menuDisabled : true,
			dataIndex : 'timeb'
		}, {
			text : 'До',
			itemId : '5',
			width : 60,
			menuDisabled : true,
			dataIndex : 'timee'
		}, {
			xtype : 'actioncolumn',
			width : 33,
			menuDisabled : true,
			text : 'Еду',
			itemId : 'inway',
			items : [{
					
					getClass : function (v, meta, rec) {
						
						if (rec.get('inway') > 0 && !rec.get('tdd') && rec.get('isredy') == 0) {
							//this.items[0].tooltip = 'Едем сюда';
							return 'ex-ch';
						} else if (rec.get('inway') < 1 && !rec.get('tdd') && rec.get('isredy') == 0) {
							//this.items[0].tooltip = 'Не определено';
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
			xtype : 'actioncolumn',
			width : 33,
			menuDisabled : true,
			text : 'Ок',
			itemId : 'isredy',
			items : [{
					
					getClass : function (v, meta, rec) {
						
						if (rec.get('isredy') > 0 && (rec.get('rectype') == 0 || rec.get('rectype') == 2)) {
							//this.items[0].tooltip = 'Выполнено';
							return 'ex-ch';
						} else if (rec.get('isredy') < 1 && (rec.get('rectype') == 0 || rec.get('rectype') == 2)) {
							//this.items[0].tooltip = 'Не выполнено';
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
			width : 60,
			menuDisabled : true,
			itemId : 'pod'
		}, {
			text : 'Кол.',
			width : 35,
			menuDisabled : true,
			dataIndex : 'packs',
			itemId : 'packs'
		}
	],
	
	dockedItems : [{
			xtype : 'actions',
			dock : 'left'
		}, {
			xtype : 'info',
			dock : 'top'
		}
	]
});
