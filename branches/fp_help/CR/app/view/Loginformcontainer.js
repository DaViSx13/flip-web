Ext.define('Courier.view.Loginformcontainer', {
	extend : 'Ext.container.Container',
	alias : 'widget.loginformcontainer',
	layout : {
		type : 'vbox',
		align : 'center'
		,padding: 20
		//,pack : 'center'
	},
	items : [{
			xtype : 'loginform'
		}
	]
});
