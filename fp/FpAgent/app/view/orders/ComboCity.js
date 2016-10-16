Ext.define('FPAgent.view.orders.ComboCity', {
	extend : 'Ext.form.ComboBox',
	alias : 'widget.combocity',
	width : 337,
	fieldLabel : FPAgent.lib.Translate.tr("ComboCity"),//'Город',
	labelAlign : 'top',
	displayField : 'fname',
	valueField : 'code',
	hideTrigger : true,
	allowBlank : false,
	minChars : 2
});
