Ext.define('FPAgent.view.orders.OrdClientTotal', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.ordclienttotal',
	items : ['->', {
			xtype : 'label',
			text : FPAgent.lib.Translate.tr("OrdTotal.label")//'Количество заказов: '
		}
	]
});
