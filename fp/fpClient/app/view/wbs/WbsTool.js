Ext.define('FPClient.view.wbs.WbsTool', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.wbstool',
    requires: ['FPClient.view.mainform.ComboMonth', 'FPClient.view.mainform.NumYear', 'FPClient.view.mainform.ComboAgent'],
    items: [{
        xtype: 'buttongroup',
        hidden: true,
        items: [{
            text: 'Входящие',
            enableToggle: true,
            iconCls: 'outbox',
            action: 'out'
        }, {
            text: 'Исходящие',
            action: 'in',
            iconCls: 'inbox',
            enableToggle: true
        }, {
            text: 'Все',
            iconCls: 'allbox',
            enableToggle: true,
            action: 'all'
        }, {
            text: 'Просрочено',
            iconCls: 'overduebox',
            enableToggle: true,
            action: 'overdue'
        }
        ]
    }, {
        xtype: 'buttongroup',
        items: [{
            text: 'Внести ПОД',
            hidden: true,
            iconCls: 'newpod',
            action: 'pod'
        }, {
            text: 'Новая ИС',
            hidden: true,
            iconCls: 'newex',
            action: 'ex'
        }, {
            text: 'Экспорт в Excel',
            iconCls: 'excel',
            action: 'excel'
        }, {
            text: 'Импорт ПОД',
            hidden: true,
            iconCls: 'import',
            action: 'import'
        }
        ]
    }, '-', {
        xtype: 'textfield',
        width: 120,
        emptyText: '№ накладной',
        name: 'filteredit'
    }, ' ', {
        text: 'Фильтр',
        iconCls: 'filter',
        action: 'filter'
    }, ' ', {
        text: 'Трэк',
        iconCls: 'track',
        action: 'track'
    }, '->', '-', {
        xtype: 'combomonth'
    }
    ]
});
