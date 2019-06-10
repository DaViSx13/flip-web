Ext.define('FPAgent.view.orders.ExportWbForm', {
	alias : 'widget.exportwbform',
	extend : 'Ext.form.Panel',
	width : 758,
	height : 38,
	layout : {
		type : 'hbox'
	},
	bodyPadding : 5,
	items : [{
        xtype: 'datefield',
        anchor: '100%',
        fieldLabel: 'С',
        name: 'from_date',
		format: 'd.m.Y',
        maxValue: new Date(),  // limited to the current date or prior
		value: new Date()-1
    }, {
        xtype: 'datefield',
        anchor: '100%',
        fieldLabel: 'до',
        name: 'to_date',
		format: 'd.m.Y',
		maxValue: new Date();
        value: new Date()  // defaults to today
    }
	]
});
