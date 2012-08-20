Ext.define('FpMnf.view.orders.ComboCityDes', {
	extend : 'Ext.form.ComboBox',
	alias : 'widget.combocitydes',
	width: 337,
	//id:'iddest',
    name:'dest',
    fieldLabel: 'Город',
    labelAlign: 'top',
    displayField: 'fname',
    store: 'CityStDes',
    valueField: 'code',
	hideTrigger:true,
	allowBlank:false,
    minChars: 2
});
