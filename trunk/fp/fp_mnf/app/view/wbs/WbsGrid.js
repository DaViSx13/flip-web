Ext.define('FpMnf.view.wbs.WbsGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.wbsgrid',
	requires : ['FpMnf.view.wbs.WbsTool'/*, 'FpMnf.view.mainform.TotalTool'*/],
	store : 'WbsStore',
	loadMask: true,
    selModel: {
            pruneRemoved: false
        },
    viewConfig: {
            trackOver: false
        },
	columns : [{
			xtype: 'actioncolumn',
			text : 'ИС',
			//dataIndex : 'is_ex',
			width: 50,
            items: [
			{
			icon: 'resources/images/new.gif',
			tooltip: 'Новое ИС',
			handler: function(grid, rowIndex, colIndex) {
                        
                        Ext.Msg.alert('ИС', 'Новая ИС');
                    }
			},
			{
			getClass: function(v, meta, rec) {          // Or return a class from a function
                        if (rec.get('is_ex') > 0) {
                         //console.log(rec.get('is_ex'));  
						   this.items[1].tooltip = 'Посмотреть ИС';
                            return 'ex-col';
                        }
			
			},
			handler: function(grid, rowIndex, colIndex) {
                        
                        Ext.Msg.alert('ИС', 'Посмотреть ИС');
                    }
			
			}
			]			
		},{
			text : 'Накладная',
			dataIndex : 'wb_no'
		},{
			text : 'Принято',
			dataIndex : 'd_acc_txt'
		},{
			text : 'Доставлено',
			dataIndex : 'dod_txt'
		},{
			text : 'Получил',
			dataIndex : 'rcpn'
		},{
			text : 'Подтв.',
			dataIndex : 'p_d_in_txt'
		},{
			text : 'ORG',
			dataIndex : 'org'
		},{
			text : 'DEST',
			dataIndex : 'dest'
		},{
			text : 'Услуга',
			dataIndex : 't_srv'
		},{
			text : 'Отправитель',
			dataIndex : 's_co'
		},{
			text : 'Получатель',
			dataIndex : 'r_co'
		},{
			text : 'Вес',
			dataIndex : 'wt',
			xtype : 'numbercolumn',
			format : '0.00'
		},{
			text : 'Об.вес',
			xtype : 'numbercolumn',
			format : '0.00',
			dataIndex : 'vol_wt'
		},{
		text:'Тариф Флип',
		columns : [{
			text : 'баз.',
			xtype : 'numbercolumn',
			format : '0.00',
			dataIndex : 'tar_flip_b'
		},{
			text : 'доп.',
			xtype : 'numbercolumn',
			format : '0.00',
			dataIndex : 'tar_flip_a'
		},{
			text : 'Всего',
			xtype : 'numbercolumn',
			format : '0.00',
			dataIndex : 'tar_flip_t'
		},{
			text : 'прим.',
			dataIndex : 'rem_flip'
		}]
		},{
		text:'Тариф Аг',
		columns : [{
			text : 'баз.',
			xtype : 'numbercolumn',
			format : '0.00',
			dataIndex : 'tar_ag_b'
		},{
			text : 'доп.',
			xtype : 'numbercolumn',
			format : '0.00',
			dataIndex : 'tar_ag_a'
		},{
			text : 'Всего',
			xtype : 'numbercolumn',
			format : '0.00',
			dataIndex : 'tar_ag_t'
		},{
			text : 'прим.',
			dataIndex : 'rem_ag'
		}]
		}
	],
	dockedItems : [{
			xtype : 'wbstool',
			dock : 'top'
		}/*, {
			xtype : 'totaltool',
			dock : 'bottom'
		}*/
	]
});
