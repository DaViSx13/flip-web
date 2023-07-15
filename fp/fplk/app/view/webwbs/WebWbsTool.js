Ext.define('fplk.view.webwbs.WebWbsTool', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.webwbstool',
    requires: [
        'fplk.view.mainform.ComboMonth',
        'fplk.view.mainform.NumYear'
    ],
    items: [{
        xtype: 'buttongroup',
        items:
            [{
                text: 'Все',
                iconCls: 'allbox',
                enableToggle: true,
                action: 'WebWbAll'
            }, {
                text: 'Внесена',
                enableToggle: true,
                iconCls: 'pod',
                action: 'WebWbAdded'
            }, {
                text: 'Не внесена',
                action: 'WebWbNotAdded',
                iconCls: 'exit-user',
                enableToggle: true
            }]
    }, {
        text: 'Печать веб накладной',
        action: 'printwb',
        iconCls: 'webwbprint'
    }, '-', {
        text: 'Экспорт в Excel',
        action: 'exp',
        iconCls: 'tariffs'
    },
        '->', '-', {
            xtype: 'combomonth'
    }]
});