Ext.define('FpMnf.view.orders.ComboCityOrg', {
	extend : 'Ext.form.ComboBox',
	alias : 'widget.combocityorg',
	width: 337,
	//id: 'idorg',
    name: 'org',
    fieldLabel: 'Город',
	labelAlign: 'top',
    displayField: 'fname',
    store: 'CityStOrg',
    valueField: 'code',
	typeAhead: true,
	allowBlank:false,
	triggerAction : 'query',
	selectOnFocus:true,	
	hideTrigger:true,
	minChars: 2
});
