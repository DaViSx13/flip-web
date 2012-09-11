Ext.define('FpMnf.view.mainform.MainPanel', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.mainpanel',
	requires : ['FpMnf.view.mainform.AdmTool'],
	activeTab : 1,
	margins : '5 5 5 5',
	items : [{
			xtype : 'wbsgrid',
			title : 'Накладные'
		}, {
			xtype : 'ordgrid',
			title : 'Заказы'
		}, {
			xtype : 'mnfpanel',
			title : 'Манифесты'
		}/*, {
			tabConfig : {
				style : {
					marginBottom : '0px',
					marginLeft : '400px',
					marginTop : '2px'
				},
				
				xtype : 'label'
			}
		}, {
			tabConfig : {
				style : {
					height : '18px',
					marginBottom : '0px',
					marginLeft : '20px',
					marginTop : '0px'
				},
				tooltip : 'Разлогиниться',
				iconCls : 'exit-user',
				action : 'logout',
				xtype : 'button'
			}
		}*/
	],
	dockedItems : [{
			xtype : 'admtool',
			dock : 'top'
		}
	]
});
