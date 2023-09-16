Ext.define('FPAgent.view.wbs.WbsTool', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.wbstool',
    requires: ['FPAgent.view.mainform.ComboMonth', 'FPAgent.view.mainform.NumYear', 'FPAgent.view.mainform.ComboAgent'],
    items: [{
        xtype: 'buttongroup',
        items: [{
            text: FPAgent.lib.Translate.tr("WbsTool.out"),//'Входящие',
            enableToggle: true,
            iconCls: 'outbox',
            action: 'out'
        }, {
            text: FPAgent.lib.Translate.tr("WbsTool.in"),//'Исходящие',
            action: 'in',
            iconCls: 'inbox',
            enableToggle: true
        }, {
            text: FPAgent.lib.Translate.tr("WbsTool.all"),//'Все',
            iconCls: 'allbox',
            enableToggle: true,
            action: 'all'
        }, {
            text: FPAgent.lib.Translate.tr("WbsTool.overdue"),//'Просрочено',
            iconCls: 'overduebox',
            enableToggle: true,
            action: 'overdue'
        }
        ]
    }, {
        xtype: 'buttongroup',
        items: [{
            text: FPAgent.lib.Translate.tr("WbsTool.pod"),//'Внести ПОД',
            iconCls: 'newpod',
            action: 'pod'
        }, {
            text: FPAgent.lib.Translate.tr("WbsTool.ex"),//'Новая ИС',
            iconCls: 'newex',
            action: 'ex'
        }, {
            text: FPAgent.lib.Translate.tr("WbsTool.excel"),//'Экспорт в Excel',
            iconCls: 'excel',
            action: 'excel'
        }, {
            text: FPAgent.lib.Translate.tr("WbsTool.import"),//'Импорт ПОД',
            iconCls: 'import',
            action: 'import'
        }
        ]
    }, '-', {
        xtype: 'textfield',
        width: 120,
        emptyText: FPAgent.lib.Translate.tr("WbsTool.filteredit"),//'№ накладной',
        name: 'filteredit'
    }, ' ', {
        text: FPAgent.lib.Translate.tr("WbsTool.filter"),//'Фильтр',
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
