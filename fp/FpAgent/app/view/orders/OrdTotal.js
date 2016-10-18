Ext.define('FPAgent.view.orders.OrdTotal', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.ordtotal',
	items : ['->', {
			xtype : 'label',
			text : FPAgent.lib.Translate.tr("OrdTotal.label")//'Количество заказов: '
		}
	]
});
