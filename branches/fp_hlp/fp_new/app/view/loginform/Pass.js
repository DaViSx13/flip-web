Ext.define('FpWeb.view.loginform.Pass', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.pass',
   
    fieldLabel: '������',
    inputType: 'password',
   //style: 'margin-top:15px',
    allowBlank: false,
    minLength: 8
    
    
});