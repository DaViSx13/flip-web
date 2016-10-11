Ext.application({
	name : 'FPAgent',
	controllers : ['MnfCont', 'OrdsCont', 'WbsCont', 'Loginform', 'ViewExCont', 'TemplCont', 'UsersCont'],
	requires: ['FPAgent.lib.Translate'],
	autoCreateViewport : false
});
