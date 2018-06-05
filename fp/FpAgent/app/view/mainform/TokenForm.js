Ext.define('FPAgent.view.mainform.TokenForm', {
	alias : 'widget.tokenform',
	extend : 'Ext.form.Panel',
	width : 180,
	height : 70,
	layout : {
		type : 'vbox'
	},
	bodyPadding : 5,
	items : [
	{
        xtype: 'textfield',
        name: 'atoken',     
        msgTarget: 'side',
        readOnly: true,
        anchor: '100%',
		selectOnFocus: true,		
		width : 155
    }	
	]
});

