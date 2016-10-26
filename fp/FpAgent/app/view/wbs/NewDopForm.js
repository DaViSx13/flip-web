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
			fieldLabel : FPAgent.lib.Translate.tr("NewDopForm.wb_no"),//'Накладная',
			readOnly : true
		}, {
			xtype : 'datefield',
			name : 'dtd_txt',
			format : 'd.m.Y',
			fieldLabel : FPAgent.lib.Translate.tr("NewDopForm.dtd_txt"),//'РДД',
			readOnly : true,
			format : 'd.m.Y'
		}, {
			xtype : 'textfield',
			name : 'tar_a_ag',
			width : 233,
			fieldLabel : FPAgent.lib.Translate.tr("NewDopForm.tar_a_ag"),//'Доп. тариф',
			allowBlank : false
		}, {
			xtype : 'textareafield',
			width : 310,
			name : 'rem_ag',
			fieldLabel : FPAgent.lib.Translate.tr("NewDopForm.rem_ag"),//'Примечание'
		}, {
			xtype : 'textfield',
			name : 'interid',
			hidden : true
		}
	]
});
