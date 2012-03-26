Ext.define('FpWeb.controller.Login', {
    extend: 'Ext.app.Controller',
    views: ['loginform.ShowForm', 'mainform.MainPanel'],



    init: function() {
        this.control({
            
            'showform button[action=logon]': {
                click: this.logonUser
            }
        });
    },

    logonUser: function() {
        
        var view = Ext.create('FpWeb.view.mainform.MainPanel').setVisible(true);//Ext.widget('mainpanel');
     
        view.down('form').show();
         console.log(view.down('form').title);
    },
});

