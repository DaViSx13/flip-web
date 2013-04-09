Ext.Loader.setConfig({
 enabled: true   
});
Ext.application({
    name: 'FpWeb',
    appFolder: "app",
    autoCreateViewport: true,
    controllers: [
        'Login'
    ]
  //  launch: function() {         }
});