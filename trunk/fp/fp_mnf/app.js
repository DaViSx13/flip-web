Ext.Loader.setConfig({
    enabled: true
});
Ext.application({
    name: 'FpMnf',
    //appFolder: "app",
    controllers: ['MnfCont', 'OrdsCont'],
    autoCreateViewport: true

    // controllers: ['MnfCont']
    //launch: function() {  console.log('app');       }
});