Ext.define('FPAgent.view.mainform.TokenForm', {
	alias : 'widget.tokenform',
	extend : 'Ext.form.Panel',
	width : 490,
	height : 70,
	layout : {
		type : 'vbox'
	},
	bodyPadding : 5,
	items : [
	{
        xtype: 'field',
        name: 'uploadFile',
        //fieldLabel: FPAgent.lib.Translate.tr("Ключ для АПИ"),//'Файл формата .xls; .xlsx; .csv до 1 Мб.',
        //labelWidth: 230,
        msgTarget: 'side',
        allowBlank: false,
        anchor: '100%',
		width : 480
    }	
	]
});

