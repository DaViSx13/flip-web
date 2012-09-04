Ext.define('Courier.view.UchetList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.uchetlist',
	store : 'Uchets',
	rbar : [{
			xtype : 'button',
			text : 'Button 1'
		}
	],
	columns : [{
			text : '№',
			dataIndex : 'displayno',
			menuDisabled : true
		}, {
			text : 'Адрес',
			dataIndex : 'aaddress',
			menuDisabled : true
		}, {
			text : 'Клиент',
			dataIndex : 'client',
			menuDisabled : true
		}
	]
});
