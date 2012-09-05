Ext.define('FpMnf.view.mainform.Loginformcontainer', {
	extend : 'Ext.container.Container',
	alias : 'widget.loginformcontainer',
	requires : ['FpMnf.view.mainform.Loginform'],
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
