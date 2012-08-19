Ext.define('FpMnf.view.orders.OrdWin', {
	extend : 'Ext.Window',
    extend: 'Ext.window.Window',
    alias : 'widget.ordwin',

    requires: ['Ext.form.Panel'],

    title : 'Edit User',
    layout: 'fit',
    autoShow: true,
    height: 120,
    width: 280,
	modal: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',

                items: [
                    {
                        xtype: 'textfield',
                        name : 'name',
                        fieldLabel: 'Name'
                    },
                    {
                        xtype: 'textfield',
                        name : 'email',
                        fieldLabel: 'Email'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});
