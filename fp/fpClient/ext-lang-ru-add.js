/**
 * Russian translation additional
 * By dvs  (utf-8 encoding)
 * 21 August 2012
 */
Ext.onReady(function () {
	//defaults settings
	Ext.define('Ext.my.grid.column.Column', {
		override : 'Ext.grid.column.Column',
		menuDisabled : true
	});

	Ext.define("Ext.locale.ru.grid.View", {
		override : "Ext.grid.View",
		loadingText : "Загрузка..."
	});

	// custom Vtype for vtype:'time'
	var timeTest = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/i;
	Ext.apply(Ext.form.field.VTypes, {
		//  vtype validation function
		time: function(val, field) {
			return timeTest.test(val);
		},
		// vtype Text property: The error text to display when the validation function returns false
		timeText: 'Время должно быть в формате "ЧЧ:ММ".',
		// vtype Mask property: The keystroke filter mask
		timeMask: /[\d\s:]/i
	});	
});
