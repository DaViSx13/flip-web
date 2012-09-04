﻿Ext.define('Courier.controller.UchetList', {
	extend : 'Ext.app.Controller',
	views : ['UchetList', 'Info'],
	models : ['Courier'],
	stores : ['Orders', 'Wbs', 'Uchets'],
	refs : [{
			ref : 'infoPanel',
			selector : 'info'
		}
	],
	init : function () {
		console.log('Initialized UchetList controller');
		this.getWbsStore().on({
			scope : this,
			load : this.makeUchetList
		});
		this.getOrdersStore().on({
			scope : this,
			load : this.makeUchetList
		});
	},
	makeUchetList : function (store, records, success) {
		console.log('wbs store loaded');
		if (success) {
			this.getUchetsStore().add(records);
			/*store.each(function () {
				console.log(this.getData())
			})*/
		}
	}
});
