Ext.define('Courier.controller.Info', {
	extend: 'Ext.app.Controller',
	//requires: ['Ext.Date'],
	views: ['Main', 'Info'],
	models: ['Courier'],
    stores: ['Orders', 'Wbs'],
	refs: [{
		ref: 'infoPanel',
		selector: 'info'
	}],
	init: function() {
		console.log('Initialized info controller');
		this.control({
			'info button[action=test]': {
				click: this.test
			},
			'info': {
				render: this.test1
			}
		});
/*Ext.TaskManager.start({
			run: function(){console.log(this)},
			interval: 1000,
			// 10 Seconds
			scope: this
		});*/
	},
	test: function(button) {
		console.log('BEGIN test function');
		//Ext.getStore('Courier').load();
		//console.log(this.getInfoView());
		//console.log(button);
		//this.getInfoPanel().down('button').setText(Ext.Date.format(new Date(), 'H:i'));
		//console.log(this.refreshTask);
        //Ext.TaskManager.stop(this.refreshTask);
        this.getOrdersStore().load();
        this.getWbsStore().load();
		console.log('END test function');
	},
	test1: function() {
		console.log('BEGIN test1 function');
		//console.log(this.refreshTask)
		//Ext.TaskManager.start(this.refreshTask);
		//console.log(this.refreshTask)
		this.refreshTask = Ext.TaskManager.start({
			run: function() {
				this.getInfoPanel().down('button').setText(Ext.Date.format(new Date(), 'H:i:s'));
			},
			interval: 1000,
			// 10 Seconds
			scope: this
		});
		console.log('END test1 function');
	}/*,
	refreshTask: {
		//scope: this,
		run: function() {
			//this.getInfoPanel().down('button').setText(Ext.Date.format(new Date(), 'H:i'));
			console.log(this);
			//console.log('Timer tick');
		},
		interval: 1000,
		onError: function() {
			console.log('timer error')
		}
	}*/
});