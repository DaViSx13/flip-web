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

    logonUser: function(button,view) {
     var NewForm = Ext.create('FpWeb.view.mainform.MainPanel');
     var MyViewport = button.up('viewport');
     
      MyViewport.removeAll(true);
      MyViewport.add(NewForm);
    
        // console.log(test.title);
    },
});

