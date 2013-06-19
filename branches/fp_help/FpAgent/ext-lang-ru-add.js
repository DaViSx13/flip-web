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
});
