Ext.define('fplk.view.users.UsersGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.usersgrid',
	requires : ['fplk.view.users.UsersTool', 'Ext.grid.RowNumberer'],
	store : 'UsersSt',
	columns : [{
		xtype: 'rownumberer',
		resizable:true,
		width: 30
	} , {
			xtype : 'actioncolumn',
			text : 'Доступ',
			align : 'center',
			width : 50,
			getClass : function (v, meta, rec) {
				if (rec.get('active') > 0) {
					this.items[0].tooltip = 'Не блокирован';
					return 'gre-usr';
				} else {
					this.items[0].tooltip = 'Блокирован';
					return 'red-usr';
				}
			}
		}, {
			text : 'Логин',
			width : 200,
			dataIndex : 'auser'
		},// {
			/*text : 'Клиент',
			columns : [*/{
					text : 'LOC',
					width : 50,
					dataIndex : 'loc'
				}, {
					text : 'Город',
					width : 150,
					dataIndex : 'c_city'
				}, {
					text : 'Компания',
					width : 300,
					dataIndex : 'c_name'
				}
			//]
		/*}, {
			text : 'Агент',
			columns : [{
					text : 'LOC',
					width : 50,
					dataIndex : 'partloc'
				}, {
					text : 'Агент',
					width : 300,
					dataIndex : 'partname'
				}
			]
		}*/

	],
	dockedItems : [{
			xtype : 'userstool',
			dock : 'top'
		}
	]
});
