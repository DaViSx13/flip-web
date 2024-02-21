Ext.define('fplk.view.users.UsersTool', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.userstool',
    items: [{
        text: 'Новый пользователь',
        iconCls: 'adduser',
        action: 'new'
    }, {
        text: 'Блокировать',
        iconCls: 'redusr',
        action: 'active'
    }, '-', {
        xtype: 'textfield',
        name: 'userSearch',
        emptyText: 'Поиск пользователя',
        labelAlign: 'right'
    }, '-', {
        xtype: 'checkbox',
        boxLabel: 'Показать блокированных',
        name: 'showBlocked',
        labelAlign: 'right',
        value: false
    }, '-', {
        text: "Импорт",
        action: "import",
        iconCls: "import"
    }]
});
