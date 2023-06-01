Ext.define('FPAgent.view.users.UsersTool', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.userstool',
    items: [{
        text: FPAgent.lib.Translate.tr("UsersTool.new"),//'Новый пользователь',
        iconCls: 'adduser',
        action: 'new'
    }, {
        text: FPAgent.lib.Translate.tr("UsersTool.active"),//'Блокировать',
        iconCls: 'redusr',
        action: 'active'
    }, '-', {
        xtype: 'textfield',
        name: 'userSearch',
        emptyText: FPAgent.lib.Translate.tr("Users.UserSearch"),
        labelAlign: 'right'
    }, '-', {
        xtype: 'checkbox',
        boxLabel: FPAgent.lib.Translate.tr("Users.ShowHideUser"),
        name: 'showBlocked',
        labelAlign: 'right',
        value: false
    }]
});
