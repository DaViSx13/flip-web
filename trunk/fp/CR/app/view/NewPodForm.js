Ext.define('Courier.view.NewPodForm', {
	alias : 'widget.newpodform',
	extend : 'Ext.form.Panel',
	layout : {
		type : 'vbox'
	},
	bodyPadding : 10,
	items : [{
			xtype : 'label',
			itemId : 'wb_no'/*,
			fieldLabel : 'Накладная',
			readOnly : true*/
		}, {
			xtype : 'textfield',
			name : 'wb_no',
			hidden : true
			//format : 'd.m.Y',
			//fieldLabel : 'РДД',
			//readOnly : true,
			//format : 'd.m.Y'
		}/*, {
			xtype : 'datefield',
			name : 'p_d_in',
			fieldLabel : 'Дата',
			format : 'd.m.Y',
			startDay : 1,
			allowBlank : false
		}*/, {
			xtype : 'timefield',
			name : 'tdd',
			fieldLabel : 'Время',
			format : 'H:i',
			minValue : '8:00',
			maxValue : '20:00',
			hideTrigger : true,
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'rcpn',
			width : 233,
			fieldLabel : 'Получатель',
			allowBlank : false
		}
	]
});
