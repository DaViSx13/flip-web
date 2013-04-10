Ext.define('FPAgent.view.mainform.Loginformcontainer', {
	extend : 'Ext.container.Container',
	alias : 'widget.loginformcontainer',
	requires : ['FPAgent.view.mainform.Loginform'],
	layout : {
		type : 'vbox',
		align : 'center',
		pack : 'center'
	},
	items : [{
			xtype : 'loginform'
		}
	]
});
