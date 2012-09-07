Ext.define('FpMnf.view.orders.OrdTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.ordtool',
	requires : ['FpMnf.view.mainform.ComboMonth', 'FpMnf.view.mainform.NumYear', 'FpMnf.view.mainform.ComboAgent'],
	items : [{
			text : 'Новый',
			action : 'new'
		}, '-', {
			text : 'Просмотр',
			action : 'view'
		}, '-', {
			text : 'Редактировать',
			action : 'edit'
		}, '-',/* {
			xtype : 'buttongroup',
			itemId : 'admgroup',
			items : [
			{xtype : 'comboagent'}
			],
			hidden : true,
			style : {
				marginLeft : '20px',
				marginRight : '20px'
			}
		}, */'->', '-', {
			xtype : 'numyear'
		}, '-', {
			xtype : 'combomonth'
		}
	]
});
