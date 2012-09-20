Ext.define('FpWeb.view.loginform.UserName', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.username',
   
   
    fieldLabel: 'Пользователь',
    allowBlank: false,
    minLength: 6,
    
    
});