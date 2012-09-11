Ext.define('FpMnf.view.orders.OrdTotal', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.ordtotal',
	items : ['->', {
			xtype : 'label',
			text : 'Количество заказов: '
		}
	]
});
