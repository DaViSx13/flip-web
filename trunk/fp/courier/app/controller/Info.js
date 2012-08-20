Ext.define('Courier.controller.Info', {
	extend: 'Ext.app.Controller',
	views: ['Main', 'Info'],
	models: ['Courier'],
	refs: [{
		ref: 'infoPanel',
		selector: 'info'
	}],
	init: function() {
		console.log('Initialized info controller');
		this.control({
			'info button[action=test]': {
				click: this.test
			}
		});
	},
	test: function(button) {
		console.log('BEGIN test function');
		//Ext.getStore('Courier').load();
		//console.log(this.getInfoView());
		//console.log(button);
		console.log('END test function');
	}
});