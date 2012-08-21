Ext.define('FpMnf.view.orders.OrdGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.ordgrid',
	requires : ['FpMnf.view.orders.OrdTool', 'FpMnf.view.orders.OrdTotal'],
	initComponent : function () {
		Ext.apply(this, {
			store : 'OrdsSt',
			columns : [{
                            xtype: 'gridcolumn',
                            width: 47,
							
                            dataIndex: 'ROrdNum',
                            text: '№'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 150,
							
                            dataIndex: 'status',
                            text: 'Статус'
                        },
                        
						{
							xtype: 'datecolumn',   
							format:'d.m.Y',
							
                            width: 70,
                            dataIndex: 'datein',
							
                            text: 'Дата'
						},
                        {
                            xtype: 'gridcolumn',
                            width: 114,
							
                            dataIndex: 'ORGCity',
                            text: 'Город'
                        },
                        {
                            xtype: 'gridcolumn',
                            flex:1,
							
                            dataIndex: 'CName',
                            text: 'Отправитель'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 114,
							
                            dataIndex: 'DESTCity',
                            text: 'Город'
                        },
                        {
                            xtype: 'gridcolumn',
                            flex:1,
							
                            dataIndex: 'DName',
                            text: 'Получатель'
                        },
                        {
                            xtype: 'numbercolumn', 
							format:'0',
                            width: 41,
							
                            dataIndex: 'Packs',
                            text: 'Кол.'
                        },
                        {
                            xtype: 'numbercolumn', 
							format:'0.00',
                            width: 51,
							
                            dataIndex: 'Wt',
                            text: 'Вес'
                        },
                        {
                            xtype: 'numbercolumn', 
							format:'0.00',
                            width: 51,
							
                            dataIndex: 'VolWt',
                            text: 'Об. вес'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 70,
							
                            dataIndex: 'wb_no',
                            text: '№ накл.'
                        }
			],
			dockedItems : [{
					xtype : 'ordtool',
					dock : 'top'
				}, {
					xtype : 'ordtotal',
					dock : 'bottom'
				}
			]
		});
		this.callParent(arguments);
	}
});
