Ext.Loader.setConfig({
	enabled : true
});
Ext.application({
	name : 'FpMnf',
	controllers : ['MnfCont', 'OrdsCont'],
	autoCreateViewport : true
});
