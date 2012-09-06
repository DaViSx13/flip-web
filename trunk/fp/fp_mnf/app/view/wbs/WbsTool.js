Ext.define('FpMnf.view.wbs.WbsTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.wbstool',
	requires : ['FpMnf.view.mainform.ComboMonth', 'FpMnf.view.mainform.NumYear', 'Ext.ButtonGroup'],
	
	items : [
			{
            xtype:'buttongroup',
            items: [{
				text : 'Исходящие',
				enableToggle : true,
				action : 'out'
				}, {
				text : 'Входящие',
				action : 'in',
				enableToggle : true
				}, {
				text : 'Все',
				enableToggle : true,
				action : 'all'
				}]
			},{
			xtype:'buttongroup',
            items: [
			{
			text : 'Внести ПОД',
			action : 'pod'
			},{
			text : 'Новая ИС',
			action : 'ex'
			}/*,{
			text : 'Доп. Тариф',
			action : 'dop'
			}*/

			]

			},
            '-',
            {
              xtype: 'textfield',
              name: 'filteredit'
            },
            {
			text : 'Фильтр',
			action : 'filter'
			},
				
		
		
		'->',
		'-', {
			xtype : 'numyear'
		}, '-', {
			xtype : 'combomonth'
		}
	]
});
