Ext.Loader.setConfig({
    enabled: true
});
Ext.application({
    name: 'FpMnf',
    //appFolder: "app",
    controllers: ['MnfCont', 'OrdsCont', 'OrdFormCont'],
    autoCreateViewport: true

    // controllers: ['MnfCont']
    //launch: function() {  console.log('app');       }
});