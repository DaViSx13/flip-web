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
        fieldLabel: 'Файл формата .csv до 1 Мб.',
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
		html :   ' Загружаемый файл должен быть в формате *.csv, размером до 1 Мб,<br>'
				+' количество строк до 1000. Данные в файле должны представлять собой<br> '
				+' таблицу из 3 столбцов, без заголовка :<br> номер накладной, дата в формате ДД:ММ:ГГГГ ЧЧ:ММ,<br> '
				+' получатель(до 14 символов), разделенные ";".<br> '
				+' Получить файл с такими параметрами  можно, например, из Excel.<br>'
				+' Для этого необходимо сформировать табличку и выбрать:<br>'
				+' "сохранить как" -> "другие форматы".<br> '
				+' тип файла: "CSV(разделители - запятые)(*.csv)".',

        columnWidth: 0.5,
        title: 'Правила загрузки файла',
        collapsible: true,
        defaultType: 'textfield'
	}
	]
});

