Ext.define('FPAgent.view.wbs.NewExForm', {
	alias : 'widget.newexform',
	extend : 'Ext.form.Panel',
	layout : {
		type : 'vbox'
	},
	bodyPadding : 10,
	items : [{
			xtype : 'textfield',
			name : 'wb_no',
			fieldLabel : FPAgent.lib.Translate.tr("NewExForm.wb_no"),//'Накладная',
			readOnly : true
		}, {
			xtype : 'textfield',
			name : 'exLoc',
			width : 233,
			fieldLabel : FPAgent.lib.Translate.tr("NewExForm.exLoc"),//'Код места происшествия',
			allowBlank : false
		}, {
			xtype : 'datefield',
			name : 'exRaised',
			fieldLabel : FPAgent.lib.Translate.tr("NewExForm.exRaised"),//'Дата события',
			startDay : 1,
			format : 'd.m.Y',
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'exRaisedTime',
			fieldLabel : FPAgent.lib.Translate.tr("NewExForm.exRaisedTime"),//'Время события',
			vtype: 'time',
			allowBlank : false
		}, {
			xtype : 'datefield',
			name : 'exRptd',
			fieldLabel : FPAgent.lib.Translate.tr("NewExForm.exRptd"),//'Дата отчета о событии',
			startDay : 1,
			format : 'd.m.Y',
			allowBlank : false
		}, {
			xtype : 'combobox',
			width : 340,
			name : 'exCode',
			displayField : 'exdesc',
			valueField : 'excode',
			allowBlank : false,
			forceSelection : true,
			editable : false,
			fieldLabel : FPAgent.lib.Translate.tr("NewExForm.exCode"),//'Код ИС',
			store : 'ExCodeStore'
		}, {
			xtype : 'textareafield',
			width : 340,
			name : 'exContent',
			fieldLabel : FPAgent.lib.Translate.tr("NewExForm.exContent"),//'Содержание происшествия'
		}
	]
});
