Ext.define('FpMnf.view.orders.OrdTotal', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.ordtotal',
	initComponent : function () {
		Ext.apply(this, {
			items : ['->', {
					xtype : 'label',
					text : 'Количество заказов: '
				}
			]
		});
		this.callParent(arguments);
	}
});
