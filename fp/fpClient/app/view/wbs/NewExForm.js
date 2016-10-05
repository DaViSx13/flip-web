Ext.define('FPClient.view.wbs.NewExForm', {
	alias : 'widget.newexform',
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
			xtype : 'textfield',
			name : 'exLoc',
			width : 233,
			fieldLabel : 'Код места происшествия',
			allowBlank : false
		}, {
			xtype : 'datefield',
			name : 'exRaised',
			fieldLabel : 'Дата события',
			startDay : 1,
			format : 'd.m.Y',
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'exRaisedTime',
			fieldLabel : 'Время события',
			vtype: 'time',
			allowBlank : false
		}, {
			xtype : 'datefield',
			name : 'exRptd',
			fieldLabel : 'Дата отчета о событии',
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
			fieldLabel : 'Код ИС',
			store : 'ExCodeStore'
		}, {
			xtype : 'textareafield',
			width : 340,
			name : 'exContent',
			fieldLabel : 'Содержание происшествия'
		}
	]
});
