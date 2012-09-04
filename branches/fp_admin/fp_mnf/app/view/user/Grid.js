Ext.define('FpMnf.view.user.Grid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.usersgrid',
	store : 'Users',
	columns : [{
			text : 'Код города',
			dataIndex : 'partloc',
            menuDisabled: true
		},{
			text : 'Login',
			dataIndex : 'login',
            menuDisabled: true
		}, {
			text : 'Агент',
			dataIndex : 'partname',
            width: 200,
            menuDisabled: true
		}, {
			xtype: 'booleancolumn',
            text : 'Активен',
			dataIndex : 'active',
            menuDisabled: true
		}
    ]
});
