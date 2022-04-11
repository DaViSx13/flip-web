Ext.define('fplk.view.other.TemplateCombobox', {
	extend : 'Ext.form.ComboBox',
	alias : 'widget.templatecombobox',
	stores: [
		'TemplSt'
	],
	store: 'TemplSt',
	displayField : 'templatename',
	fieldLabel : 'Из шаблона',
	labelAlign : 'top'
});
