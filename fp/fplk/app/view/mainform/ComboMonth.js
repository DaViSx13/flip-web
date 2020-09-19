Ext.define('fplk.view.mainform.ComboMonth', {
	extend : 'Ext.form.Panel',
	alias : 'widget.combomonth',
	hideLabel : true,
	allowBlank : false,
	name: 'periodPanel',
	bodyStyle: 'background:transparent; border:none',
	layout: "hbox",
	width : 378,
	items:[{
		xtype: "label",
		text: "Период: ",
		margin: "3 10 0 0"
	}, {
		xtype: 'datefield',
		anchor: '100%',
		name: 'fromDate',
		format: 'd.m.Y',
		width: 110,
		value: Ext.Date.add(new Date(), Ext.Date.DAY, -7),
		maxValue: Ext.Date.add(new Date(), Ext.Date.MONTH, 1)
	}, {
		xtype: 'datefield',
		width: 110,
		margin: "0 0 0 10",
		format: 'd.m.Y',
		anchor: '100%',
		name: 'toDate',
		value: new Date(),
		maxValue: Ext.Date.add(new Date(), Ext.Date.MONTH, 1)
	}, {
		xtype: 'button',
		margin: "0 0 0 10",
		width: 80,
		name: 'periodRefresh',
		text: 'Обновить'
	}]
});
