Ext.define('Courier.controller.Info', {
	extend : 'Ext.app.Controller',
	views : ['Main', 'Info'],
	models : ['Courier'],
	stores : ['OrderAndWb', 'Uchets'],
	refs : [{
			ref : 'Info',
			selector : 'info'
		}
	],

	init : function () {
		this.control({
			'info' : {
				render : this.startRefresh
			}
		});
	},
	
	startRefresh : function () {
		this.refreshTask = Ext.TaskManager.start({
				run : function () {
					this.getOrderAndWbStore().load();
				},
				interval : 30000,
				scope : this
			});
	}
});
