Ext.define('Courier.view.Info', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.info',
	title: 'infopanel',
	items: [{
		html: 'разное инфо123123'
	},
	{
		xtype: 'button',
		text: 'бутон',
		action: 'test'
	}]
});