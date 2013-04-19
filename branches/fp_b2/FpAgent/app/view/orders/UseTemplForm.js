Ext.define('FPAgent.view.orders.UseTemplForm', {
	alias : 'widget.usetemplform',
	extend : 'Ext.form.Panel',
	//width : 758,
	//height : 38,
	layout : {
		type : 'hbox'
	},
	bodyPadding : 5,
	items : [{
			xtype : 'combobox',
			enableKeyEvents : true,
			name : 'tplname',
			queryMode : 'local',
			store : 'TemplSt',
			displayField : 'templatename',
			valueField : 'id',
			forceSelection : true,
			allowBlank : false,
			width : 185			
		}
	]
});