Ext.define('FpMnf.view.wbs.NewPodForm', {
	alias : 'widget.newpodform',
	extend : 'Ext.form.Panel',
	
	//height : 210,
	//width : 265,
	layout : {
		type : 'vbox'
	},
	bodyPadding : 10,
	items : [{
			xtype : 'textfield',
			name : 'wb_no',
			fieldLabel : 'Накладная',
			readOnly : true
			//allowBlank : false
		}, {
			xtype : 'datefield',
			name : 'dtd_txt',
			format : 'd.m.Y',
			fieldLabel : 'РДД',
			readOnly : true,
			format : 'd.m.Y'
		},
		{
			xtype : 'datefield',
			name : 'p_d_in',
			fieldLabel : 'Дата',
			format : 'd.m.Y',
			startDay : 1,
			allowBlank : false
		}, {
			xtype : 'timefield',
			name : 'tdd',
			fieldLabel : 'Время',
			format : 'H:i',
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'rcpn',
			fieldLabel : 'Получатель',
			//labelAlign : 'top',
			allowBlank : false
		}
		
	]
});
