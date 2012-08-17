Ext.define('FpMnf.view.mainform.WbGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.wbgrid',
	autoScroll: true,
 
 initComponent: function() {
        
        Ext.apply(this,  {
		  store: 'WbSt',
          columns: [{
                text: '№ Накладной',
				dataIndex: 'wb_no',
                width: 200               
                
            }, {
                text: 'РДД',
				dataIndex: 'dtd',
                width: 200               
                
            },
			{
                text: 'ORG',
                dataIndex: 'org',
                width: 50
            }, {
                text: 'Отправитель',
                
                flex: 1
            }, {
                text: 'DEST',
                dataIndex: 'dest',
                width: 50
            }, {
                text: 'Получатель',
                
                flex: 1
            },{
                text: 'Мест',
				dataIndex: 'shpcs',
                width: 50
            },{
                text: 'Вес',
				dataIndex: 'shwt',
                width: 50
            },{
                text: 'V вес',
				dataIndex: 'shvol_wt',
                width: 50
            }
			]
    
    });

        this.callParent(arguments);
    } 
    
    
    
});