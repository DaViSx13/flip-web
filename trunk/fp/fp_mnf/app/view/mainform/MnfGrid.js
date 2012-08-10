Ext.define('FpMnf.view.mainform.MnfGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mnfgrid',
	requires: [
       		'FpMnf.view.mainform.MnfTool'
            ],
 
 initComponent: function() {
        
        Ext.apply(this,  {
		  
          columns: [
			{
                text: 'Номер',
                
                width: 200
            },
			{
                text: 'Перевозчик',
                
                flex: 1
            },
			{
                text: 'Отправлено',
               // dataIndex: 'title',
                width: 200
                
            }, {
                text: 'РДП',
                //dataIndex: 'author',
                //hidden: true,
                width: 200
            }, {
                text: 'Доставлено',
                //dataIndex: 'pubDate',
                
                width: 200
            },{
                text: 'ORG',
                width: 50
            },{
                text: 'DEST',
                width: 50
            },{
                text: 'Мест',
                width: 50
            },{
                text: 'Вес',
                width: 50
            },{
                text: 'V вес',
                width: 50
            }
			],
			dockedItems:[{
                xtype: 'mnftool',
                dock: 'top'
            }]
    
    });

        this.callParent(arguments);
    } 
    
    
    
});