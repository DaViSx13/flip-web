Ext.define('FPAgent.view.orders.LoadFileForm', {
	alias : 'widget.loadfileform',
	extend : 'Ext.form.Panel',
	width : 760,
	height : 38,
	layout : {
		type : 'hbox'
	},
	bodyPadding : 5,
	items : [
	{
		//x : 10,
		//y : 560,
        xtype: 'filefield',
        name: 'uploadFile',
        fieldLabel: FPAgent.lib.Translate.tr("LoadFileForm.uploadFile.fieldLabel"),//'Файл формата .xls, .pdf, .doc до 1 Мб.',
        labelWidth: 230,
        msgTarget: 'side',
        allowBlank: false,
		hidden :true,
        anchor: '100%',
		width : 740,
        buttonText: FPAgent.lib.Translate.tr("LoadFileForm.uploadFile.buttonText")//'Выбрать'
    },{
			xtype : 'label',
			name:'urlf',
			anchor: '100%',
			hidden :true,
			margin: '0 70 0 10',
			text : ''
	},{
		xtype: 'button',
		text : FPAgent.lib.Translate.tr("LoadFileForm.button.delete"),//'Удалить',
		action : 'delete',
		hidden :true		
		}
	]
});
