Ext.define('FPAgent.view.mainform.ComboMonth', {
	extend : 'Ext.form.ComboBox',
	alias : 'widget.combomonth',
	hideLabel : true,
	store : 'aMonths',
	displayField : 'Name',
	valueField : 'lowName',
	value : Ext.Date.format(new Date(), 'm'),
	queryMode : 'local',
	editable : false,
	allowBlank : false,
	width : 135
});
