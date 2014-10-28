Ext.define('FPAgent.view.wbs.NewDopForm', {
	alias : 'widget.newdopform',
	extend : 'Ext.form.Panel',
	layout : {
		type : 'vbox'
	},
	bodyPadding : 10,
	items : [{
			xtype : 'textfield',
			name : 'wb_no',
			fieldLabel : 'Накладная',
			readOnly : true
		}, {
			xtype : 'datefield',
			name : 'dtd_txt',
			format : 'd.m.Y',
			fieldLabel : 'РДД',
			readOnly : true,
			format : 'd.m.Y'
		}, {
			xtype : 'textfield',
			name : 'tar_a_ag',
			width : 233,
			fieldLabel : 'Доп. тариф',
			allowBlank : false
		}, {
			xtype : 'textareafield',
			width : 310,
			name : 'rem_ag',
			fieldLabel : 'Примечание'
		}, {
			xtype : 'textfield',
			name : 'interid',
			hidden : true
		}
	]
});
