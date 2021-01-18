Ext.define('fplk.view.orders.TemplFormImport', {
	alias : 'widget.templformimport',
	extend : 'Ext.form.Panel',
		width : 500,
    	height : 220,
    	layout : {
    		type : 'vbox'
    	},
    	bodyPadding : 5,
	bodyPadding : 10,
	items : [{
                xtype: 'panel',
                width: '100%',
                border: false,
                height: 30,
                layout: 'hbox',
                items:[{
                            xtype: 'filefield',
                            name: 'uploadFile',
                            fieldLabel: 'Файл для импорта',
                            labelWidth: 150,
                            buttonText: 'Выбрать'
                        }, {
                            xtype: 'button',
                            name: 'TmplExcel',
                            text: 'Шаблон',
                            margin: '0 0 0 5',
                            iconCls : 'help',
                            action: 'excelTmlExcel',
                            width: 80
                        }]},
                {
                    xtype: 'fieldset',
                    width: 450,
                    html: 'Загружаемый файл должен быть в формате *.xls, *.xlsx или *.csv, <br>'
                          + ' размером до 1 Мб, количество строк до 1000. Данные в файле <br> '
                          + ' должны представлять собой таблицу из 6 столбцов, с заголовком :<br> Наименование шаблона, Название компании получателя,<br>'
                          +' Контактное лицо получателя, Телефон контактого лица получателя, <br> '
                          + 'Адрес получателя, Город доставки получателя<br> '
                }]
});
