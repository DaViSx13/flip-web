Ext.define('FPAgent.view.wbs.NewPodForm', {
	alias : 'widget.newpodform',
	extend : 'Ext.form.Panel',
	layout : {
		type : 'vbox'
	},
	bodyPadding : 10,
	items : [{
			xtype : 'textfield',
			name : 'wb_no',
			fieldLabel : FPAgent.lib.Translate.tr("NewPodForm.wb_no"),//'Накладная',
			readOnly : true
		}, {
			xtype : 'datefield',
			name : 'dtd_txt',
			format : 'd.m.Y',
			fieldLabel : FPAgent.lib.Translate.tr("NewPodForm.dtd_txt"),//'РДД',
			readOnly : true,
			format : 'd.m.Y'
		}, {
			xtype : 'datefield',
			name : 'p_d_in',
			fieldLabel : FPAgent.lib.Translate.tr("NewPodForm.p_d_in"),//'Дата',
			format : 'd.m.Y',
			startDay : 1,
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'tdd',
			fieldLabel : FPAgent.lib.Translate.tr("NewPodForm.tdd"),//'Время',
			vtype: 'time',
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'rcpn',
			width : 233,
			fieldLabel : FPAgent.lib.Translate.tr("NewPodForm.rcpn"),//'Получатель',
			allowBlank : false
		}
	]
});
