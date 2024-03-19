Ext.define('FPClient.view.users.imports.ImportUsersForm', {
	alias : 'widget.importuserform',
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
        labelWidth: 250,
        msgTarget: 'side',
        allowBlank: false,
        anchor: '100%',
		width : 550,
        buttonText: 'Выбрать'
    },
	{
		xtype:'fieldset',
		width: 550,
		name:'uploadcomments',
		html :  ' Загружаемый файл должен быть в формате *.xls, *.xlsx или *.csv, размером до 1 Мб,<br> '
				+' количество строк до 1000. Данные в файле должны представлять собой таблицу<br> '
				+' из 4 столбцов с заголовками и повторять поля формы ввода нового пользователея:<br> '
				+' Логин, Пароль, CACC, id Агента.<br> '
				+' <a href="srv/import/Example_import_users.xlsx" target="_blank" download>Пример файл для импорта пользователей</a><br> ',
        columnWidth: 0.5,
        title: 'Правила загрузки файла',
        collapsible: true,
        defaultType: 'textfield'
	}
	]
});

