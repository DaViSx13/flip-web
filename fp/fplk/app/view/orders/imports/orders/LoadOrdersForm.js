Ext.define('fplk.view.orders.imports.orders.LoadOrdersForm', {
	alias : 'widget.loadordersform',
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
		name:'uploadcomments',
		html :  ' Загружаемый файл должен быть в формате *.xls, *.xlsx или *.csv, размером до 1 Мб,<br> '
				+' количество строк до 1000. Данные в файле должны представлять собой таблицу<br> '
				+' из 22 столбцов с заголовками и повторять поля формы ввода нового заказа:<br> ' 
				+' Город отправителя, Наименование отправителя, Адрес отправителя,<br> '
				+' Контакт отправителя, Телефон отправителя, Почта отправителя, Описание отправителя,<br> '
				+' Город получателя, Название получателя, Адрес получателя, Контакт получателя,<br> '
				+' Телефон получателя, Почта получателя, Описание получателя, Количество, Вес,<br> '
				+' Объемный вес, Тип отправления, Описание содержимого, Страховая сумма, Тип оплаты, Плательщик.<br> '
				+' <a href="srv/import/Example_import_Orders.xls" target="_blank" download>Пример файл для импорта заказов</a><br> ',
        columnWidth: 0.5,
        title: 'Правила загрузки файла',
        collapsible: true,
        defaultType: 'textfield'
	}
	]
});

