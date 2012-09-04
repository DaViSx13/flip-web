Ext.define('FpMnf.controller.Users', {
	extend : 'Ext.app.Controller',
	views : ['user.Grid', 'user.Edit'],
	models : ['User'],
	stores : ['Users'],
	init : function () {
		this.control({
			'usersgrid' : {
				activate : function(){this.getUsersStore().load()},
                itemdblclick: this.editUser
			},
            'useredit button[action=save]': {
                click: this.updateUser
            }
		});
    },
    editUser: function(grid, record) {
        var view = Ext.widget('useredit');
        view.down('form').loadRecord(record);
    },
    updateUser: function(button) {
    //console.log('update');
    var win    = button.up('window'),
        form   = win.down('form'),
        record = form.getRecord(),
        values = form.getValues();

    record.set(values);
    win.close();
    this.getUsersStore().sync();
    }
});
