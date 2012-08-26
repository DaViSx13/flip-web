Ext.define('FpMnf.view.orders.ComboCity', {
	extend : 'Ext.form.ComboBox',
	alias : 'widget.combocity',
	width : 337,
	fieldLabel : 'Город',
	labelAlign : 'top',
	displayField : 'fname',
	valueField : 'code',
	hideTrigger : true,
	allowBlank : false,
	minChars : 2
});
