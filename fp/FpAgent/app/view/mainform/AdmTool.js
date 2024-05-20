Ext.define('FPAgent.view.mainform.AdmTool', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.admtool',
    items: [{
        xtype: 'buttongroup',
        hidden: true,
        itemId: 'admgroup',
        items: [{
            xtype: 'comboagent'
        }
        ],
        hidden: true,
        style: {
            marginLeft: '2px',
            marginRight: '20px'
        }
    }, ' ',
        {
            tooltip: FPAgent.lib.Translate.tr("AdmTool.list"),//'Список',
            text: FPAgent.lib.Translate.tr("AdmTool.list"),//'Список',
            iconCls: 'list',
            action: 'list',

            enableToggle: true,
            xtype: 'button'
        }, ' ', {
            tooltip: FPAgent.lib.Translate.tr("AdmTool.templ"),//'Шаблоны',
            text: FPAgent.lib.Translate.tr("AdmTool.templ"),//'Шаблоны',
            iconCls: 'templ',
            action: 'templ',

            enableToggle: true,
            xtype: 'button'
        }, ' ',
        '->',
        {
            tooltip: FPAgent.lib.Translate.tr("AdmTool.token"),
            text: FPAgent.lib.Translate.tr("AdmTool.token"),
            iconCls: 'key',
            action: 'token',
            xtype: 'button'
        }, ' ',
        {
            tooltip: FPAgent.lib.Translate.tr("AdmTool.tariffs"),//'Тарифы',
            text: FPAgent.lib.Translate.tr("AdmTool.tariffs"),//'Тарифы',
            iconCls: 'tariffs',
            action: 'tariffs',
            xtype: 'button',
            hidden: true
        }, {
            text: FPAgent.lib.Translate.tr("AdmTool.tariffs"),//'Тарифы',
            iconCls: 'tariffs',
            action: 'tariffsNew',
            xtype: 'button',
            menu: {
				xtype: 'menu',
                items: [{
                    text: "Золото",
                    action: 'tariff_Gold',
                    iconCls: 'goldMedal'
                }, {
                    text: "Серебро",
                    action: 'tariff_Silver',
                    iconCls: 'silverMedal'
                }, {
                    text: "Бронза",
                    action: 'tariff_Bronze',
                    iconCls: 'bronzeMedal'
                }, {
                    text: "Инструкция",
                    action: 'tariff_instruction',
                    iconCls: 'help'
                }]
            }
        }, ' ',
        {
            xtype: 'label',
            text: 'UserName'
        },
        ' ', ' ', ' ',
        {
            tooltip: FPAgent.lib.Translate.tr("AdmTool.help"),//'Помощь',
            iconCls: 'help',
            action: 'help',
            xtype: 'button'
        },
        {
            tooltip: FPAgent.lib.Translate.tr("AdmTool.logout"),//'Выход',
            iconCls: 'exit-user',
            action: 'logout',
            xtype: 'button'
        }, ' '
    ]
});
