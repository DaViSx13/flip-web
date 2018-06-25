Ext.define('FPClient.controller.ViewExCont', {
	extend : 'Ext.app.Controller',
	views : ['wbs.ViewExWin', 'wbs.ViewExForm', 'wbs.ViewExGrid'],
	refs : [{
			ref : 'ViewExForm',
			selector : 'viewexform'
		}
	],
	init : function () {
		this.control({
			'viewexgrid' : {
				selectionchange : this.viewRem
			}
		});
	},
	viewRem : function (mod, rec) {
		if (rec[0]) {
			this.getViewExForm().getForm().loadRecord(rec[0]);
		}
	}
});
