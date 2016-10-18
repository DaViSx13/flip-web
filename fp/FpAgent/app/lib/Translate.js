Ext.define('FPAgent.lib.Translate', {
	singleton : true,
	requires : ['Ext.util.Cookies'],
	currentLocale : "en",

	tr : function (stringID) {
		var locString;
		for (var i = 0; i < this.data.length; i++) {
			if (this.data[i].stringID == stringID) {
				locString = this.data[i];
				break;
			};
		}

		var cookieLocale = Ext.util.Cookies.get("myLang");
		if (cookieLocale) {
			this.currentLocale = cookieLocale;
		} else {
			this.currentLocale = 'ru';
			console.log('test');
		}

		return locString ? locString[this.currentLocale] : stringID;
	},

	data : [
  {
    "stringID": "ComboCity",
    "ru": "Город",
    "en": ""
  },
  {
    "stringID": "Loginform.user",
    "ru": "Пользователь",
    "en": ""
  },
  {
    "stringID": "Loginform.password",
    "ru": "Пароль",
    "en": ""
  },
  {
    "stringID": "Loginform.login",
    "ru": "Вход",
    "en": ""
  },
  {
    "stringID": "Loginform.title",
    "ru": "Вход в ФлипПост WEB",
    "en": ""
  },
  {
    "stringID": "OrdGrid.status",
    "ru": "Статус",
    "en": ""
  },
  {
    "stringID": "OrdGrid.datein",
    "ru": "Дата",
    "en": ""
  },
  {
    "stringID": "OrdGrid.orgcity",
    "ru": "Город",
    "en": ""
  },
  {
    "stringID": "OrdGrid.cname",
    "ru": "Отправитель",
    "en": ""
  },
  {
    "stringID": "OrdGrid.destcity",
    "ru": "Город",
    "en": ""
  },
  {
    "stringID": "OrdGrid.dname",
    "ru": "Получатель",
    "en": ""
  },
  {
    "stringID": "OrdGrid.packs",
    "ru": "Кол.",
    "en": ""
  },
  {
    "stringID": "OrdGrid.wt",
    "ru": "Вес",
    "en": ""
  },
  {
    "stringID": "OrdGrid.volwt",
    "ru": "Об. вес",
    "en": ""
  },
  {
    "stringID": "OrdGrid.wb_no",
    "ru": "№ накл.",
    "en": ""
  },
  {
    "stringID": "OrdGrid.fs.Org",
    "ru": "Отправитель",
    "en": ""
  },
  {
    "stringID": "OrdGrid.cname",
    "ru": "Название клиента",
    "en": ""
  },
  {
    "stringID": "OrdGrid.address",
    "ru": "Адрес",
    "en": ""
  },
  {
    "stringID": "OrdGrid.contname",
    "ru": "Контактное лицо",
    "en": ""
  },
  {
    "stringID": "OrdGrid.contphone",
    "ru": "Телефон",
    "en": ""
  },
  {
    "stringID": "OrdGrid.orgrems",
    "ru": "Примечание",
    "en": ""
  },
  {
    "stringID": "OrdGrid.fs.dest",
    "ru": "Получатель",
    "en": ""
  },
  {
    "stringID": "OrdGrid.dname",
    "ru": "Название клиента",
    "en": ""
  },
  {
    "stringID": "OrdGrid.dadr",
    "ru": "Адрес",
    "en": ""
  },
  {
    "stringID": "OrdGrid.dcontname",
    "ru": "Контактное лицо",
    "en": ""
  },
  {
    "stringID": "OrdGrid.dcontphone",
    "ru": "Телефон",
    "en": ""
  },
  {
    "stringID": "OrdGrid.destrems",
    "ru": "Примечание",
    "en": ""
  },
  {
    "stringID": "OrdGrid.fs.date",
    "ru": "Дата приезда курьера",
    "en": ""
  },
  {
    "stringID": "OrdGrid.courdate",
    "ru": "Дата",
    "en": ""
  },
  {
    "stringID": "OrdGrid.courtimef",
    "ru": "Время с",
    "en": ""
  },
  {
    "stringID": "OrdGrid.courtimet",
    "ru": "Время до",
    "en": ""
  },
  {
    "stringID": "OrdGrid.fs.cargo",
    "ru": "Информация о грузе",
    "en": ""
  },
  {
    "stringID": "OrdGrid.type",
    "ru": "Тип груза",
    "en": ""
  },
  {
    "stringID": "OrdGrid.packs",
    "ru": "Число мест",
    "en": ""
  },
  {
    "stringID": "OrdGrid.wt",
    "ru": "Вес",
    "en": ""
  },
  {
    "stringID": "OrdGrid.volwt",
    "ru": "Объемный вес",
    "en": ""
  },
  {
    "stringID": "OrdGrid.desc",
    "ru": "*по умолчанию оплата заказчиком (агентом, размещающим заказ), в случае другой оплаты - просьба указывать это в примечании (отправитель/получатель, сумма)",
    "en": ""
  },
  {
    "stringID": "LoadFileForm.uploadFile.fieldLabel",
    "ru": "Файл формата .xls, .pdf, .doc до 1 Мб.",
    "en": ""
  },
  {
    "stringID": "LoadFileForm.uploadFile.buttonText",
    "ru": "Выбрать",
    "en": ""
  },
  {
    "stringID": "LoadFileForm.button.delete",
    "ru": "Удалить",
    "en": ""
  },
  {
    "stringID": "LoadOrdersForm.uploadcomments.html",
    "ru": "Загружаемый файл должен быть в формате *.xls, *.xlsx или *.csv, размером до 1 Мб,<br>количество строк до 1000. Данные в файле должны представлять собой таблицу<br> из 20 столбцов с заголовками и повторять поля формы ввода нового заказа:<br> Город отправителя, Наименование отправителя, Адрес отправителя,<br> Контакт отправителя, Телефон отправителя, Почта отправителя, Описание отправителя,<br> \t Город получателя, Название получателя, Адрес получателя, Контакт получателя,<br> Телефон получателя, Почта получателя, Описание получателя, Количество, Вес,<br> Объемный вес, Дата приезда курьера, Время от, Время до.<br> <a href=\"srv/import/Example_import_AgOrders.xlsx\" target=\"_blank\" download>Пример файл для импорта заказов</a><br>",
    "en": ""
  },
  {
    "stringID": "LoadOrdersForm.uploadcomments.title",
    "ru": "Правила загрузки файла",
    "en": ""
  },
  {
    "stringID": "LoadOrdersForm.title",
    "ru": "Импорт информации о заказах",
    "en": ""
  },
  {
    "stringID": "LoadOrdersForm.button.imp",
    "ru": "Импортировать",
    "en": ""
  },
  {
    "stringID": "LoadOrdersForm.button.cancel",
    "ru": "Отмена",
    "en": ""
  },
  {
    "stringID": "OrdTool.action.new",
    "ru": "Новый",
    "en": ""
  },
  {
    "stringID": "OrdTool.action.newtpl",
    "ru": "Из шаблона",
    "en": ""
  },
  {
    "stringID": "OrdTool.action.view",
    "ru": "Просмотр",
    "en": ""
  },
  {
    "stringID": "OrdTool.action.edit",
    "ru": "Редактировать",
    "en": ""
  },
  {
    "stringID": "OrdTool.action.excel",
    "ru": "Экспорт в Excel",
    "en": ""
  },
  {
    "stringID": "OrdTool.action.import",
    "ru": "Импорт из Excel",
    "en": ""
  },
  {
    "stringID": "OrdTool.action.wbno",
    "ru": "№ накладной",
    "en": ""
  },
  {
    "stringID": "OrdTool.action.wbview",
    "ru": "Просмотр накладной",
    "en": ""
  },
  {
    "stringID": "OrdTotal.label",
    "ru": "Количество заказов:",
    "en": ""
  },
  {
    "stringID": "OrdWin.title",
    "ru": "Новый заказ",
    "en": ""
  },
  {
    "stringID": "OrdWin.button.save",
    "ru": "Сохранить",
    "en": ""
  },
  {
    "stringID": "OrdWin.button.cancel",
    "ru": "Отмена",
    "en": ""
  },
  {
    "stringID": "TemplForm.templatename",
    "ru": "Название шаблона",
    "en": ""
  },
  {
    "stringID": "TemplForm.fs.org",
    "ru": "Отправитель",
    "en": ""
  },
  {
    "stringID": "TemplForm.cname",
    "ru": "Название клиента",
    "en": ""
  },
  {
    "stringID": "TemplForm.address",
    "ru": "Адрес",
    "en": ""
  },
  {
    "stringID": "TemplForm.contname",
    "ru": "Контактное лицо",
    "en": ""
  },
  {
    "stringID": "TemplForm.contphone",
    "ru": "Телефон",
    "en": ""
  },
  {
    "stringID": "TemplForm.orgrems",
    "ru": "Примечание",
    "en": ""
  },
  {
    "stringID": "TemplForm.fs.dest",
    "ru": "Получатель",
    "en": ""
  },
  {
    "stringID": "TemplForm.dname",
    "ru": "Название клиента",
    "en": ""
  },
  {
    "stringID": "TemplForm.dadr",
    "ru": "Адрес",
    "en": ""
  },
  {
    "stringID": "TemplForm.dcontname",
    "ru": "Контактное лицо",
    "en": ""
  },
  {
    "stringID": "TemplForm.dcontphone",
    "ru": "Телефон",
    "en": ""
  },
  {
    "stringID": "TemplForm.destrems",
    "ru": "Примечание",
    "en": ""
  },
  {
    "stringID": "TemplGrid.templatename",
    "ru": "Наименование",
    "en": ""
  },
  {
    "stringID": "TemplTool.newtpl",
    "ru": "Новый",
    "en": ""
  },
  {
    "stringID": "TemplTool.edittpl",
    "ru": "Редактировать",
    "en": ""
  },
  {
    "stringID": "TemplTool.deltpl",
    "ru": "Удалить",
    "en": ""
  },
  {
    "stringID": "TemplWin.title",
    "ru": "Новый шаблон",
    "en": ""
  },
  {
    "stringID": "TemplWin.button.save",
    "ru": "Сохранить",
    "en": ""
  },
  {
    "stringID": "TemplWin.button.cancel",
    "ru": "Отмена",
    "en": ""
  },
  {
    "stringID": "UseTemplWin.title",
    "ru": "Выберите шаблон",
    "en": ""
  },
  {
    "stringID": "UseTemplWin.button.set",
    "ru": "Выбрать",
    "en": ""
  },
  {
    "stringID": "UseTemplWin.button.cancel",
    "ru": "Отмена",
    "en": ""
  },
  {
    "stringID": "ViewWbWin.title",
    "ru": "Просмотр накладной",
    "en": ""
  },
  {
    "stringID": "ViewWbWin.button.close",
    "ru": "Закрыть",
    "en": ""
  },
  {
    "stringID": "WbNoWin.title",
    "ru": "Введите № накладной",
    "en": ""
  },
  {
    "stringID": "WbNoWin.button.save",
    "ru": "Сохранить",
    "en": ""
  },
  {
    "stringID": "WbNoWin.button.cancel",
    "ru": "Отмена",
    "en": ""
  },
  {
    "stringID": "AdmTool.list",
    "ru": "Список",
    "en": ""
  },
  {
    "stringID": "AdmTool.templ",
    "ru": "Шаблоны",
    "en": ""
  },
  {
    "stringID": "AdmTool.tariffs",
    "ru": "Тарифы",
    "en": ""
  },
  {
    "stringID": "AdmTool.help",
    "ru": "Помощь",
    "en": ""
  },
  {
    "stringID": "AdmTool.logout",
    "ru": "Выход",
    "en": ""
  },
  {
    "stringID": "ComboAgent.fieldLabel",
    "ru": "Выберите Агента",
    "en": ""
  },
  {
    "stringID": "Loginformcontainer.title",
    "ru": "ФлипПост WEB - список изменений",
    "en": ""
  }
]

}, function () {
	__ = function (stringID) {
		return FPAgent.lib.Translate.tr(stringID);
	}
});
