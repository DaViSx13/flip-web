Ext.define('FPAgent.view.mainform.NumYear', {
	extend : 'Ext.form.field.Number',
	alias : 'widget.numyear',
	value : Ext.Date.format(new Date(), 'Y'),
	minValue : 2011,
	width : 80,
	editable : false,
	maxValue : 2020
});
