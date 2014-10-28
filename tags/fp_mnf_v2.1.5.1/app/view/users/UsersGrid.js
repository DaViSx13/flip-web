Ext.define('FPAgent.view.users.UsersGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.usersgrid',
	requires : ['FPAgent.view.users.UsersTool'],
	store : 'UsersSt',
	columns : [{
			text : 'Логин',
			dataIndex : 'auser',
			flex : 1
		}, {
			text : 'Пользователь',
			flex : 1,
			dataIndex : 'partname'
		}, {
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
			text : 'КОД',
			width : 50,
			dataIndex : 'partloc'
		}, {
			text : 'Город',
			width : 150,
			dataIndex : 'rusname'
		}, {
			xtype : 'actioncolumn',
			text : 'Статус',
			align : 'center',
			width : 50,
			getClass : function (v, meta, rec) {
				if (rec.get('dateshtdn') > '') {
					this.items[0].tooltip = 'Отношения прекращены: ' + rec.get('dateshtdn');
					return 'cut';
				}
			}
		}
	],
	dockedItems : [{
			xtype : 'userstool',
			dock : 'top'
		}
	]
});
