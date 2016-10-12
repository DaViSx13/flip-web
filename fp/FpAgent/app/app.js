Ext.application({
	name : 'FPAgent',
	requires : ['Ext.util.Cookies', 'FPAgent.lib.Translate'],
	controllers : ['MnfCont', 'OrdsCont', 'WbsCont', 'Loginform', 'ViewExCont', 'TemplCont', 'UsersCont'],
	autoCreateViewport : false
});
