Ext.define('FPClient.view.orders.TemplTool', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.templtool',
    items: [{
        text: 'Новый',
        iconCls: 'newdoc',
        action: 'newtpl'
    }, '-', {
        text: 'Редактировать',
        iconCls: 'editdoc',
        action: 'edittpl'
    }, '-', {
        xtype: 'textfield',
        emptyText: "Наименование",
        name: "filterByName"
    }, '-', {
        text: 'Удалить',
        iconCls: 'deldoc',
        action: 'deltpl'
    }, '-', {
        text: "Импорт",
        iconCls: 'import',
        action: "importFromExcel"
    }, '-', {
        text: 'Экспорт в Excel',
        iconCls: 'excel',
        action: 'export'
    }]
});
