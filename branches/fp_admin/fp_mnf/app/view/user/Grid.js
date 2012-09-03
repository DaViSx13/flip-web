Ext.define('FpMnf.view.user.Grid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.usersgrid',
	store : 'Users',
	columns : [{
			text : 'Login',
			dataIndex : 'login',
            menuDisabled: true
		}, {
			text : 'Агент',
			dataIndex : 'agentname',
            menuDisabled: true
		}, {
			text : 'Активен',
			dataIndex : 'active',
            menuDisabled: true
		}
    ]
});
