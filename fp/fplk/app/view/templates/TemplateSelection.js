Ext.define('fplk.view.templates.TemplateSelection', {
	extend : 'Ext.form.Panel',
	alias : 'widget.templateselection',
	dest: 'org',
	width: '100%',
	border: false,
	layout: 'hbox',
	items: [{
		xtype: 'combobox',
		flex: 1,
		fieldLabel : 'Из шаблона',
		store: 'TemplSt',
		displayField : 'templatename',
		valueField : 'id'
	}]
});
