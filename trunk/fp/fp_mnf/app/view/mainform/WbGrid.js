Ext.define('FpMnf.view.mainform.WbGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.wbgrid',
	autoScroll: true,
 
 initComponent: function() {
        
        Ext.apply(this,  {
		  
          columns: [{
                text: '№ Накладной',
                width: 200               
                
            }, {
                text: 'РДД',
                width: 200               
                
            },
			{
                text: 'ORG',
                
                width: 50
            }, {
                text: 'Отправитель',
                
                flex: 1
            }, {
                text: 'DEST',
                
                width: 50
            }, {
                text: 'Получатель',
                
                flex: 1
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
			]
    
    });

        this.callParent(arguments);
    } 
    
    
    
});