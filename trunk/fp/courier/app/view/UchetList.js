Ext.define('Courier.view.UchetList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.uchetlist',
	//store : 'Uchets',
	columns : [{
			text : '№'//,
			//dataIndex : 'displayno'
		}, {
			text : 'Адрес'//,
			//dataIndex : 'aaddress'
		}, {
			text : 'Клиент'//,
			//dataIndex : 'client'
		}
	]
});
