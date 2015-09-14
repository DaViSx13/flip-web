Ext.define('FPAgent.view.wbs.LoadWBForm', {
	alias : 'widget.loadwbform',
	extend : 'Ext.form.Panel',
	width : 500,
	height : 200,
	layout : {
		type : 'vbox'
	},
	bodyPadding : 5,
	items : [
	{
        xtype: 'filefield',
        name: 'uploadFile',
        fieldLabel: 'Файл формата .xls; .xlsx до 1 Мб.',
        labelWidth: 200,
        msgTarget: 'side',
        allowBlank: false,
        anchor: '100%',
		width : 450,
        buttonText: 'Выбрать'
    },
	{
		xtype:'fieldset',
		name:'uploadcomments',
		html :   ' Загружаемый файл должен быть в формате *.xls или *.xlsx, размером до 1 Мб,<br>'
				+' количество строк до 1000. Данные в файле должны представлять собой<br> '
				+' таблицу из 3 столбцов, с заголовком :<br> номер накладной, дата в формате ДД:ММ:ГГГГ ЧЧ:ММ:СС,<br> '
				+' получатель(до 14 символов).<br> '
				+' <a href="srv/import/Example_import_POD.xlsx" target="_blank" download>Пример файл для импорта ПОД</a><br>',
        columnWidth: 0.5,
        title: 'Правила загрузки файла',
        collapsible: true,
        defaultType: 'textfield'
	}
	]
});

