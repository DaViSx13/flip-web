Ext.define('FPAgent.view.users.UsersGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.usersgrid',
	requires : ['FPAgent.view.users.UsersTool'],
	store : 'UsersSt',
	columns : [{
			text : FPAgent.lib.Translate.tr("UsersGrid.auser"),//'Логин',
			dataIndex : 'auser',
			flex : 1
		}, {
			text : FPAgent.lib.Translate.tr("UsersGrid.partname"),//'Пользователь',
			flex : 1,
			dataIndex : 'partname'
		}, {
			xtype : 'actioncolumn',
			text : FPAgent.lib.Translate.tr("UsersGrid.isblocked"),//'Доступ',
			align : 'center',
			width : 50,
			getClass : function (v, meta, rec) {
				if (rec.get('active') > 0) {
					this.items[0].tooltip = FPAgent.lib.Translate.tr("UsersGrid.block_no");//'Не блокирован';
					return 'gre-usr';
				} else {
					this.items[0].tooltip = FPAgent.lib.Translate.tr("UsersGrid.block_yes");//'Блокирован';
					return 'red-usr';
				}
			}
		}, {
			text : FPAgent.lib.Translate.tr("UsersGrid.partloc"),//'КОД',
			width : 50,
			dataIndex : 'partloc'
		}, {
			text : FPAgent.lib.Translate.tr("ComboCity"),//'Город',
			width : 150,
			dataIndex : 'rusname'
		}, {
			xtype : 'actioncolumn',
			text : FPAgent.lib.Translate.tr("UsersGrid.status"),//'Статус',
			align : 'center',
			width : 50,
			getClass : function (v, meta, rec) {
				if (rec.get('dateshtdn') > '') {
					this.items[0].tooltip = FPAgent.lib.Translate.tr("UsersGrid.status.tooltip")/*'Отношения прекращены: '*/ + rec.get('dateshtdn');
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
