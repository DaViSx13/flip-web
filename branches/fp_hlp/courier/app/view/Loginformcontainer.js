Ext.define('Courier.view.Loginformcontainer', {
	extend: 'Ext.container.Container',
	alias: 'widget.loginformcontainer',
	layout: {
		type: 'vbox',
		align: 'center',
		pack: 'center'
	},
	items: [{
		xtype: 'loginform'
	}]
});