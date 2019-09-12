Ext.define('FPAgent.controller.OrdExCont', {
	extend : 'Ext.app.Controller',
	views : ['orders.OrdExWin', 'orders.OrdExForm', 'orders.OrdExGrid'],
	refs : [{
			ref : 'OrdExForm',
			selector : 'ordexform'
		}
	],
	init : function () {
		this.control({
			'ordexgrid' : {
				selectionchange : this.viewRem
			}
		});
	},
	viewRem : function (mod, rec) {
		if (rec[0]) {
			this.getOrdExForm().getForm().loadRecord(rec[0]);
		}
	}
});
