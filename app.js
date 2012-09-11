Ext.application({
	name : 'FpMnf',
	controllers : ['MnfCont', 'OrdsCont','WbsCont', 'Loginform', 'ViewExCont'],
	autoCreateViewport : false,
	 launch: function() {
		//defaults settings
		Ext.define('Ext.my.grid.column.Column', {
			override: 'Ext.grid.column.Column',
			menuDisabled: true
		});		
		
	}
});
