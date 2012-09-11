Ext.define('FpMnf.view.wbs.ViewExForm', {
	alias : 'widget.viewexform',
	extend : 'Ext.form.Panel',
	layout : {
		type : 'fit'
	},
	bodyPadding : 0,
	items : [{
			xtype : 'textareafield',
			name : 'ofvers'
		}
	]
});
