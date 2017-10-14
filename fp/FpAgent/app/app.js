Ext.application({
	name : 'FPAgent',
	requires : ['Ext.util.Cookies', 'FPAgent.lib.Translate', 'FPAgent.lib.Miscutils'],
	controllers : ['MnfCont', 'OrdsCont', 'WbsCont', 'Loginform', 'ViewExCont', 'TemplCont', 'UsersCont'],
	autoCreateViewport : false
});
