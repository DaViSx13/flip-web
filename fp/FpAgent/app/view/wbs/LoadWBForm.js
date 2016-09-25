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
        fieldLabel: 'Файл формата .xls; .xlsx; .csv до 1 Мб.',
        labelWidth: 230,
        msgTarget: 'side',
        allowBlank: false,
        anchor: '100%',
		width : 450,
        buttonText: 'Выбрать'
    },
	{
		xtype:'fieldset',
		name:'uploadcomments',
		html :   ' Загружаемый файл должен быть в формате *.xls, *.xlsx или *.csv, <br>'
				+' размером до 1 Мб, количество строк до 1000. Данные в файле <br> '
				+' должны представлять собой таблицу из 3 столбцов, с заголовком :<br> номер накладной, дата в формате ДД:ММ:ГГГГ ЧЧ:ММ,<br> '
				+' получатель(до 14 символов).<br> '
				+' <a href="srv/import/Example_import_POD.xlsx" target="_blank" download>Пример файл для импорта ПОД</a><br>',
        columnWidth: 0.5,
        title: 'Правила загрузки файла',
        collapsible: true,
        defaultType: 'textfield'
	}
	]
});

