Ext.define('FPAgent.lib.Translate', {
    singleton: true,
    requires: ['Ext.util.Cookies'],
    currentLocale: "en",

    tr: function (stringID) {
        var locString;
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].stringID == stringID) {
                locString = this.data[i];
                break;
            }
            ;
        }

        var cookieLocale = Ext.util.Cookies.get("myLang");
        if (cookieLocale) {
            this.currentLocale = cookieLocale;
        } else {
            this.currentLocale = 'ru';
        }

        return locString ? locString[this.currentLocale] : stringID;
    },

    data: [
        {
            "stringID": "ComboCity",
            "ru": "Город",
            "en": "City"
        },
        {
            "stringID": "MainPanel.ClientOrders",
            "ru": "Клиентские заказы",
            "en": "Client's orders"
        },
        {
            "stringID": "Loginform.user",
            "ru": "Пользователь",
            "en": "User"
        },
        {
            "stringID": "Loginform.password",
            "ru": "Пароль",
            "en": "Password"
        },
        {
            "stringID": "Loginform.login",
            "ru": "Вход",
            "en": "Login"
        },
        {
            "stringID": "Loginform.title",
            "ru": "Вход в ФлипПост.Агент",
            "en": "Login in FlipPost.Agent"
        },
        {
            "stringID": "OrdGrid.status",
            "ru": "Статус",
            "en": "Status"
        },
        {
            "stringID": "OrdGrid.datein",
            "ru": "Дата",
            "en": "Date"
        },
        {
            "stringID": "OrdGrid.orgcity",
            "ru": "Город",
            "en": "City"
        },
        {
            "stringID": "OrdGrid.cname",
            "ru": "Отправитель",
            "en": "Sender"
        },
        {
            "stringID": "OrdGrid.destcity",
            "ru": "Город",
            "en": "City"
        },
        {
            "stringID": "OrdGrid.dname",
            "ru": "Получатель",
            "en": "Recipient"
        },
        {
            "stringID": "OrdGrid.packs",
            "ru": "Кол.",
            "en": "Pcs."
        },
        {
            "stringID": "OrdGrid.wt",
            "ru": "Вес",
            "en": "Wt."
        },
        {
            "stringID": "OrdGrid.volwt",
            "ru": "Об. вес",
            "en": "Vol. Wt."
        },
        {
            "stringID": "OrdGrid.wb_no",
            "ru": "№ накл.",
            "en": "№ waybill"
        },
        {
            "stringID": "OrdGrid.fs.Org",
            "ru": "Отправитель",
            "en": "Sender"
        },
        {
            "stringID": "OrdGrid.cname",
            "ru": "Название клиента",
            "en": "Client name"
        },
        {
            "stringID": "OrdGrid.address",
            "ru": "Адрес",
            "en": "Address"
        },
        {
            "stringID": "OrdGrid.contname",
            "ru": "Контактное лицо",
            "en": "Contact"
        },
        {
            "stringID": "OrdGrid.contphone",
            "ru": "Телефон",
            "en": "Phone"
        },
        {
            "stringID": "OrdGrid.orgrems",
            "ru": "Примечание",
            "en": "Note"
        },
        {
            "stringID": "OrdGrid.fs.dest",
            "ru": "Получатель",
            "en": "Recipient"
        },
        {
            "stringID": "OrdGrid.dname",
            "ru": "Название клиента",
            "en": "Client name"
        },
        {
            "stringID": "OrdGrid.dadr",
            "ru": "Адрес",
            "en": "Address"
        },
        {
            "stringID": "OrdGrid.dcontname",
            "ru": "Контактное лицо",
            "en": "Contact"
        },
        {
            "stringID": "OrdGrid.dcontphone",
            "ru": "Телефон",
            "en": "Phone"
        },
        {
            "stringID": "OrdGrid.destrems",
            "ru": "Примечание",
            "en": "Note"
        },
        {
            "stringID": "OrdGrid.fs.date",
            "ru": "Дата приезда курьера",
            "en": "Courier arrival date"
        },
        {
            "stringID": "OrdGrid.courdate",
            "ru": "Дата",
            "en": "Date"
        },
        {
            "stringID": "OrdGrid.courtimef",
            "ru": "Время с",
            "en": "Time from"
        },
        {
            "stringID": "OrdGrid.courtimet",
            "ru": "Время до",
            "en": "Time to"
        },
        {
            "stringID": "OrdGrid.fs.cargo",
            "ru": "Информация о грузе",
            "en": "Cargo info"
        },
        {
            "stringID": "OrdGrid.type",
            "ru": "Тип груза",
            "en": "Cargo type"
        },
        {
            "stringID": "OrdGrid.packs",
            "ru": "Число мест",
            "en": "Place count"
        },
        {
            "stringID": "OrdGrid.wt",
            "ru": "Вес",
            "en": "Wt."
        },
        {
            "stringID": "OrdGrid.volwt",
            "ru": "Объемный вес",
            "en": "Vol. Wt."
        },
        {
            "stringID": "OrdGrid.desc",
            "ru": "*по умолчанию оплата заказчиком (агентом, размещающим заказ), в случае другой оплаты - просьба указывать это в примечании (отправитель/получатель, сумма)",
            "en": "*default payment by the customer (agent, places an order), in the case of other payment - please indicate this in note (sender / recipient, amount)"
        },
        {
            "stringID": "LoadFileForm.uploadFile.fieldLabel",
            "ru": "Файл формата .xls, .pdf, .doc до 1 Мб.",
            "en": "File format .xls, .pdf, .doc; limit 1 Mb."
        },
        {
            "stringID": "LoadFileForm.uploadFile.buttonText",
            "ru": "Выбрать",
            "en": "Select"
        },
        {
            "stringID": "LoadFileForm.button.delete",
            "ru": "Удалить",
            "en": "Delete"
        },
        {
            "stringID": "LoadOrdersForm.uploadcomments.html",
            "ru": "Загружаемый файл должен быть в формате *.xls, *.xlsx или *.csv, размером до 1 Мб,<br>количество строк до 1000. Данные в файле должны представлять собой таблицу<br> из 20 столбцов с заголовками и повторять поля формы ввода нового заказа:<br> Город отправителя, Наименование отправителя, Адрес отправителя,<br> Контакт отправителя, Телефон отправителя, Почта отправителя, Описание отправителя,<br> \t Город получателя, Название получателя, Адрес получателя, Контакт получателя,<br> Телефон получателя, Почта получателя, Описание получателя, Количество, Вес,<br> Объемный вес, Дата приезда курьера, Время от, Время до.<br> <a href=\"srv/import/Example_import_AgOrders.xlsx\" target=\"_blank\" download>Пример файл для импорта заказов</a><br>",
            "en": "The uploaded file must be in the format * .xls, * .xlsx, or * .csv, up to 1 MB, <br> number of rows to 1000. The data in the file must be a table <br> of 20 columns with headers and repeating fields form to enter a new order: the sender <br> city, sender's name, sender's address, <br> Contact the sender, the sender's phone, the sender's mail, the sender description, <br> City recipient, recipient name, address of the recipient, the recipient's contact, <br> recipient's phone, address of the recipient, the recipient description, quantity, weight, volume <br> weight arrival Date courier, from time, to time. <br> <a href = \"srv/import /Example_import_AgOrders.xlsx\" target =  \"_blank\" download> Example file to import orders </a> <br>"
        },
        {
            "stringID": "LoadOrdersForm.uploadcomments.title",
            "ru": "Правила загрузки файла",
            "en": "File download rules"
        },
        {
            "stringID": "LoadOrdersForm.title",
            "ru": "Импорт информации о заказах",
            "en": "Imports order information"
        },
        {
            "stringID": "LoadOrdersForm.button.imp",
            "ru": "Импортировать",
            "en": "Import"
        },
        {
            "stringID": "LoadOrdersForm.button.cancel",
            "ru": "Отмена",
            "en": "Cancel"
        },
        {
            "stringID": "OrdTool.action.new",
            "ru": "Новый",
            "en": "New"
        },
        {
            "stringID": "OrdTool.action.newtpl",
            "ru": "Из шаблона",
            "en": "From template"
        },
        {
            "stringID": "OrdTool.action.view",
            "ru": "Просмотр",
            "en": "Browsing"
        },
        {
            "stringID": "OrdTool.action.edit",
            "ru": "Редактировать",
            "en": "Edit"
        },
        {
            "stringID": "OrdTool.action.excel",
            "ru": "Экспорт в Excel",
            "en": "Exports to Excel"
        },
        {
            "stringID": "OrdTool.action.import",
            "ru": "Импорт из Excel",
            "en": "Imports from Excel"
        },
        {
            "stringID": "OrdTool.action.wbno",
            "ru": "№ накладной",
            "en": "№ waybill"
        },
        {
            "stringID": "OrdTool.action.wbview",
            "ru": "Просмотр накладной",
            "en": "Browsing waybill"
        },
        {
            "stringID": "OrdTotal.label",
            "ru": "Количество заказов:",
            "en": "The number of orders"
        },
        {
            "stringID": "OrdWin.title",
            "ru": "Новый заказ",
            "en": "New order"
        },
        {
            "stringID": "OrdWin.button.save",
            "ru": "Сохранить",
            "en": "Save"
        },
        {
            "stringID": "OrdWin.button.cancel",
            "ru": "Отмена",
            "en": "Cancel"
        },
        {
            "stringID": "TemplForm.templatename",
            "ru": "Название шаблона",
            "en": "Template title"
        },
        {
            "stringID": "TemplForm.fs.org",
            "ru": "Отправитель",
            "en": "Sender"
        },
        {
            "stringID": "TemplForm.cname",
            "ru": "Название клиента",
            "en": "Client name"
        },
        {
            "stringID": "TemplForm.address",
            "ru": "Адрес",
            "en": "Address"
        },
        {
            "stringID": "TemplForm.contname",
            "ru": "Контактное лицо",
            "en": "The contact person"
        },
        {
            "stringID": "TemplForm.contphone",
            "ru": "Телефон",
            "en": "Phone"
        },
        {
            "stringID": "TemplForm.orgrems",
            "ru": "Примечание",
            "en": "Comment"
        },
        {
            "stringID": "TemplForm.fs.dest",
            "ru": "Получатель",
            "en": "Recipient"
        },
        {
            "stringID": "TemplForm.dname",
            "ru": "Название клиента",
            "en": "Client name"
        },
        {
            "stringID": "TemplForm.dadr",
            "ru": "Адрес",
            "en": "Address"
        },
        {
            "stringID": "TemplForm.dcontname",
            "ru": "Контактное лицо",
            "en": "The contact person"
        },
        {
            "stringID": "TemplForm.dcontphone",
            "ru": "Телефон",
            "en": "Phone"
        },
        {
            "stringID": "TemplForm.destrems",
            "ru": "Примечание",
            "en": "Comment"
        },
        {
            "stringID": "TemplGrid.templatename",
            "ru": "Наименование",
            "en": "Name"
        },
        {
            "stringID": "TemplTool.newtpl",
            "ru": "Новый",
            "en": "New"
        },
        {
            "stringID": "TemplTool.edittpl",
            "ru": "Редактировать",
            "en": "Edit"
        },
        {
            "stringID": "TemplTool.deltpl",
            "ru": "Удалить",
            "en": "Delete"
        },
        {
            "stringID": "TemplWin.title",
            "ru": "Новый шаблон",
            "en": "New template"
        },
        {
            "stringID": "TemplWin.button.save",
            "ru": "Сохранить",
            "en": "Save"
        },
        {
            "stringID": "TemplWin.button.cancel",
            "ru": "Отмена",
            "en": "Cancel"
        },
        {
            "stringID": "UseTemplWin.title",
            "ru": "Выберите шаблон",
            "en": "Select template"
        },
        {
            "stringID": "UseTemplWin.button.set",
            "ru": "Выбрать",
            "en": "Select"
        },
        {
            "stringID": "UseTemplWin.button.cancel",
            "ru": "Отмена",
            "en": "Cancel"
        },
        {
            "stringID": "ViewWbWin.title",
            "ru": "Просмотр накладной",
            "en": "Browsing waybill"
        },
        {
            "stringID": "ViewWbWin.button.close",
            "ru": "Закрыть",
            "en": "Close"
        },
        {
            "stringID": "ViewWbWin.button.print",
            "ru": "Печать",
            "en": "Print"
        },
        {
            "stringID": "WbNoWin.title",
            "ru": "Введите № накладной",
            "en": "Enter the waybill №"
        },
        {
            "stringID": "WbNoWin.button.save",
            "ru": "Сохранить",
            "en": "Save"
        },
        {
            "stringID": "WbNoWin.button.cancel",
            "ru": "Отмена",
            "en": "Cancel"
        },
        {
            "stringID": "AdmTool.list",
            "ru": "Список",
            "en": "List"
        },
        {
            "stringID": "AdmTool.templ",
            "ru": "Шаблоны",
            "en": "Templates"
        },
        {
            "stringID": "AdmTool.tariffs",
            "ru": "Тарифы",
            "en": "Tariffs"
        },
        {
            "stringID": "AdmTool.help",
            "ru": "Помощь",
            "en": "Help"
        },
        {
            "stringID": "AdmTool.logout",
            "ru": "Выход",
            "en": "Exit"
        },
        {
            "stringID": "ComboAgent.fieldLabel",
            "ru": "Выберите Агента",
            "en": "Select agent"
        },
        {
            "stringID": "Loginformcontainer.title",
            "ru": "ФлипПост WEB - список изменений",
            "en": "FlipPost WEB - list of changes"
        },
        {
            "stringID": "MainPanel.wbsgrid",
            "ru": "Накладные",
            "en": "Waybills"
        },
        {
            "stringID": "MainPanel.mnfpanel",
            "ru": "Манифесты",
            "en": "Manifests"
        },
        {
            "stringID": "MainPanel.ordspanel",
            "ru": "Заказы",
            "en": "Orders"
        },
        {
            "stringID": "MainPanel.usersgrid",
            "ru": "Пользователи",
            "en": "Users"
        },
        {
            "stringID": "MnfGrid.mnfrefno",
            "ru": "Манифест",
            "en": "Manifest"
        },
        {
            "stringID": "MnfGrid.shpd",
            "ru": "Отправлено",
            "en": "Sent"
        },
        {
            "stringID": "MnfGrid.dtarr",
            "ru": "РДП",
            "en": "CAD"
        },
        {
            "stringID": "MnfGrid.darr",
            "ru": "Доставлено",
            "en": "Delivered"
        },
        {
            "stringID": "MnfGrid.bpcs",
            "ru": "Мест",
            "en": "Places"
        },
        {
            "stringID": "MnfGrid.bwt",
            "ru": "Вес",
            "en": "Wt."
        },
        {
            "stringID": "MnfGrid.bvwt",
            "ru": "V вес",
            "en": "V wt"
        },
        {
            "stringID": "MnfGrid.descr",
            "ru": "Перевозчик",
            "en": "Carrier"
        },
        {
            "stringID": "MnfTool.out",
            "ru": "Входящие",
            "en": "Inbox"
        },
        {
            "stringID": "MnfTool.in",
            "ru": "Исходящие",
            "en": "Outbox"
        },
        {
            "stringID": "MnfTool.all",
            "ru": "Все",
            "en": "All"
        },
        {
            "stringID": "TotalTool.label",
            "ru": "Количество манифестов:",
            "en": "Amount manifests:"
        },
        {
            "stringID": "WbGrid.wb_no",
            "ru": "№ Накладной",
            "en": "№ waybill"
        },
        {
            "stringID": "WbGrid.dtd",
            "ru": "РДД",
            "en": "CAD"
        },
        {
            "stringID": "WbGrid.s_co",
            "ru": "Отправитель",
            "en": "Sender"
        },
        {
            "stringID": "WbGrid.r_co",
            "ru": "Получатель",
            "en": "Recipient"
        },
        {
            "stringID": "WbGrid.shpcs",
            "ru": "Мест",
            "en": "Places"
        },
        {
            "stringID": "WbGrid.shwt",
            "ru": "Вес",
            "en": "Wt."
        },
        {
            "stringID": "WbGrid.shvol_wt",
            "ru": "V вес",
            "en": "V wt"
        },
        {
            "stringID": "UsersForm.auser",
            "ru": "Пользователь",
            "en": "User"
        },
        {
            "stringID": "UsersForm.passfirst",
            "ru": "Новый пароль",
            "en": "New password"
        },
        {
            "stringID": "UsersForm.passsecond",
            "ru": "Повторно пароль",
            "en": "Password again"
        },
        {
            "stringID": "UsersForm.agents",
            "ru": "Выберите Агента",
            "en": "Select agent"
        },
        {
            "stringID": "UsersGrid.auser",
            "ru": "Логин",
            "en": "Login"
        },
        {
            "stringID": "UsersGrid.partname",
            "ru": "Пользователь",
            "en": "User"
        },
        {
            "stringID": "UsersGrid.isblocked",
            "ru": "Доступ",
            "en": "Access"
        },
        {
            "stringID": "UsersGrid.block_no",
            "ru": "Не блокирован",
            "en": "Not blocked"
        },
        {
            "stringID": "UsersGrid.block_yes",
            "ru": "Блокирован",
            "en": "Blocked"
        },
        {
            "stringID": "UsersGrid.partloc",
            "ru": "КОД",
            "en": "COD"
        },
        {
            "stringID": "UsersGrid.status",
            "ru": "Статус",
            "en": "Status"
        },
        {
            "stringID": "UsersGrid.status.tooltip",
            "ru": "Отношения прекращены:",
            "en": "Relationship terminated:"
        },
        {
            "stringID": "UsersTool.new",
            "ru": "Новый пользователь",
            "en": "New user"
        },
        {
            "stringID": "UsersTool.active",
            "ru": "Блокировать",
            "en": "Block"
        },
        {
            "stringID": "UsersWin.title",
            "ru": "Добавить пользователя",
            "en": "Add user"
        },
        {
            "stringID": "UsersWin.button.save",
            "ru": "Сохранить",
            "en": "Save"
        },
        {
            "stringID": "UsersWin.button.cancel",
            "ru": "Отмена",
            "en": "Cancel"
        },
        {
            "stringID": "LoadWBForm.uploadFile.fieldLabel",
            "ru": "Файл в формате *.xls, *.xlsx или *.csv",
            "en": "File format *.xls, *.xlsx, or *.csv"
        },
        {
            "stringID": "LoadWBForm.uploadFile.buttonText",
            "ru": "Выбрать",
            "en": "Select"
        },
        {
            "stringID": "LoadWBForm.uploadcomments.html",
            "ru": "Загружаемый файл должен быть в формате *.xls, *.xlsx или *.csv, <br> размером до 1 Мб, количество строк до 1000. Данные в файле <br> должны представлять собой таблицу из 3 столбцов, с заголовком :<br> номер накладной, дата в формате ДД.ММ.ГГГГ ЧЧ:ММ,<br> получатель(до 14 символов).<br> <a href=\"srv/import/Example_import_POD.xlsx\" target=\"_blank\" download>Пример файл для импорта ПОД</a><br>",
            "en": "The uploaded file must be in the format *.xls, *.xlsx, or *.csv, <br> up to 1 MB, the number of rows to 1000. The data in the file <br> should be a table of 3 columns, with the headline: <br > invoice number, the date in the format DD.MM.YYYY HH:. MM, <br> the recipient (up to 14 characters) <br><a href=\"srv/import/Example_import_POD.xlsx\" target=\"_blank\" download> Example file to import POD</a> <br>"
        },
        {
            "stringID": "LoadWBForm.uploadcomments.title",
            "ru": "Правила загрузки файла",
            "en": "File download rules"
        },
        {
            "stringID": "LoadWBWin.title",
            "ru": "Импорт информации о доставке",
            "en": "Import shipping information"
        },
        {
            "stringID": "LoadWBWin.imp",
            "ru": "Импортировать",
            "en": "Import"
        },
        {
            "stringID": "LoadWBWin.cancel",
            "ru": "Отмена",
            "en": "Cancel"
        },
        {
            "stringID": "NewDopForm.wb_no",
            "ru": "Накладная",
            "en": "Waybill"
        },
        {
            "stringID": "NewDopForm.dtd_txt",
            "ru": "РДД",
            "en": "CAD"
        },
        {
            "stringID": "NewDopForm.tar_a_ag",
            "ru": "Доп. тариф",
            "en": "A tariff"
        },
        {
            "stringID": "NewDopForm.rem_ag",
            "ru": "Примечание",
            "en": "Comment"
        },
        {
            "stringID": "NewDopWin.title",
            "ru": "Заявка на доп. тариф",
            "en": "An application for A tariff"
        },
        {
            "stringID": "NewDopWin.save",
            "ru": "Сохранить",
            "en": "Save"
        },
        {
            "stringID": "NewDopWin.cancel",
            "ru": "Отмена",
            "en": "Cancel"
        },
        {
            "stringID": "NewExForm.wb_no",
            "ru": "Накладная",
            "en": "Waybill"
        },
        {
            "stringID": "NewExForm.exLoc",
            "ru": "Код места происшествия",
            "en": "Event place code"
        },
        {
            "stringID": "NewExForm.exRaised",
            "ru": "Дата события",
            "en": "Event date"
        },
        {
            "stringID": "NewExForm.exRptd",
            "ru": "Дата отчета о событии",
            "en": "Date of event report"
        },
        {
            "stringID": "NewExForm.exRaisedTime",
            "ru": "Время события",
            "en": "Event time"
        },
        {
            "stringID": "NewExForm.exCode",
            "ru": "Код ИС",
            "en": "Code EX"
        },
        {
            "stringID": "NewExForm.exContent",
            "ru": "Содержание происшествия",
            "en": "Event content"
        },
        {
            "stringID": "NewExWin.title",
            "ru": "Новое исключение",
            "en": "New exception"
        },
        {
            "stringID": "NewExWin.save",
            "ru": "Сохранить",
            "en": "Save"
        },
        {
            "stringID": "NewExWin.cancel",
            "ru": "Отмена",
            "en": "Cancel"
        },
        {
            "stringID": "NewPodForm.wb_no",
            "ru": "Накладная",
            "en": "Waybill"
        },
        {
            "stringID": "NewPodForm.dtd_txt",
            "ru": "РДД",
            "en": "CAD"
        },
        {
            "stringID": "NewPodForm.p_d_in",
            "ru": "Дата",
            "en": "Date"
        },
        {
            "stringID": "NewPodForm.tdd",
            "ru": "Время",
            "en": "Time"
        },
        {
            "stringID": "NewPodForm.rcpn",
            "ru": "Получатель",
            "en": "Recipient"
        },
        {
            "stringID": "NewPodWin.title",
            "ru": "Подтверждение о доставке накладной",
            "en": "Confirmation of delivery waybill"
        },
        {
            "stringID": "NewPodWin.save",
            "ru": "Сохранить",
            "en": "Save"
        },
        {
            "stringID": "NewPodWin.cancel",
            "ru": "Отмена",
            "en": "Cancel"
        },
        {
            "stringID": "ViewExGrid.wbno",
            "ru": "№ Накладной",
            "en": "№ waybill"
        },
        {
            "stringID": "ViewExGrid.excode",
            "ru": "Код",
            "en": "Code"
        },
        {
            "stringID": "ViewExGrid.loc",
            "ru": "Трек",
            "en": "Track"
        },
        {
            "stringID": "ViewExGrid.exdesc",
            "ru": "Описание",
            "en": "Comment"
        },
        {
            "stringID": "ViewExGrid.raised_txt",
            "ru": "Дата события",
            "en": "Event date"
        },
        {
            "stringID": "ViewExWin.title",
            "ru": "Просмотр исключений",
            "en": "Exceptions viewing"
        },
        {
            "stringID": "WbsGrid.exaction",
            "ru": "ИС",
            "en": "EX"
        },
        {
            "stringID": "WbsGrid.exaction.tooltip",
            "ru": "Посмотреть ИС",
            "en": "EX viewing"
        },
        {
            "stringID": "WbsGrid.wb_no",
            "ru": "Накладная",
            "en": "Waybill"
        },
        {
            "stringID": "WbsGrid.d_acc",
            "ru": "Принято",
            "en": "Accepted"
        },
        {
            "stringID": "WbsGrid.dod_txt",
            "ru": "Доставлено",
            "en": "Added"
        },
        {
            "stringID": "WbsGrid.rcpn",
            "ru": "Получил",
            "en": "Received"
        },
        {
            "stringID": "WbsGrid.p_d_in",
            "ru": "Подтв.",
            "en": "Confirm"
        },
        {
            "stringID": "WbsGrid.t_srv",
            "ru": "Услуга",
            "en": "Service"
        },
        {
            "stringID": "WbsGrid.s_co",
            "ru": "Отправитель",
            "en": "Sender"
        },
        {
            "stringID": "WbsGrid.r_co",
            "ru": "Получатель",
            "en": "Recipient"
        },
        {
            "stringID": "WbsGrid.wt",
            "ru": "Вес",
            "en": "Wt."
        },
        {
            "stringID": "WbsGrid.vol_wt",
            "ru": "Об.вес",
            "en": "Vol. Wt."
        },
        {
            "stringID": "WbsGrid.tar_flip",
            "ru": "Тариф Флип",
            "en": "Tariff Flip"
        },
        {
            "stringID": "WbsGrid.tar_flip_b",
            "ru": "баз.",
            "en": "base"
        },
        {
            "stringID": "WbsGrid.tar_flip_a",
            "ru": "доп.",
            "en": "addit."
        },
        {
            "stringID": "WbsGrid.tar_flip_tr",
            "ru": "ТР",
            "en": "TR"
        },
        {
            "stringID": "WbsGrid.tar_flip_t",
            "ru": "Всего",
            "en": "Total"
        },
        {
            "stringID": "WbsGrid.rem_flip",
            "ru": "прим.",
            "en": "desc"
        },
        {
            "stringID": "WbsGrid.tar_ag",
            "ru": "Тариф Аг",
            "en": "Tariff Ag"
        },
        {
            "stringID": "WbsGrid.tar_ag_b",
            "ru": "баз.",
            "en": "base"
        },
        {
            "stringID": "WbsGrid.tar_ag_a",
            "ru": "доп.",
            "en": "addit."
        },
        {
            "stringID": "WbsGrid.tar_ag_tr",
            "ru": "ТР",
            "en": "TR"
        },
        {
            "stringID": "WbsGrid.tar_ag_t",
            "ru": "Всего",
            "en": "Total"
        },
        {
            "stringID": "WbsGrid.rem_ag",
            "ru": "прим.",
            "en": "desc"
        },
        {
            "stringID": "WbsGrid.req_tar_a",
            "ru": "Заявка",
            "en": "Request"
        },
        {
            "stringID": "WbsTool.out",
            "ru": "Входящие",
            "en": "Inbox"
        },
        {
            "stringID": "WbsTool.in",
            "ru": "Исходящие",
            "en": "Outbox"
        },
        {
            "stringID": "WbsTool.all",
            "ru": "Все",
            "en": "All"
        },
        {
            "stringID": "WbsTool.overdue",
            "ru": "Просрочено",
            "en": "Overdue"
        },
        {
            "stringID": "WbsTool.pod",
            "ru": "Внести ПОД",
            "en": "Enter POD"
        },
        {
            "stringID": "WbsTool.ex",
            "ru": "Новая ИС",
            "en": "New EX"
        },
        {
            "stringID": "WbsTool.excel",
            "ru": "Экспорт в Excel",
            "en": "Exports to Excel"
        },
        {
            "stringID": "WbsTool.import",
            "ru": "Импорт ПОД",
            "en": "Import POD"
        },
        {
            "stringID": "WbsTool.filteredit",
            "ru": "№ накладной",
            "en": "№ waybill"
        },
        {
            "stringID": "WbsTool.filter",
            "ru": "Фильтр",
            "en": "Filter"
        },
        {
            "stringID": "Refresh",
            "ru": "Обновите страницу",
            "en": "Refresh"
        },
        {
            "stringID": "Error",
            "ru": "Ошибка!",
            "en": "Error!"
        },
        {
            "stringID": "ServerdDown",
            "ru": "Сервер недоступен!",
            "en": "Server is not available!"
        },
        {
            "stringID": "Alert",
            "ru": "Внимание!",
            "en": "Alert!"
        },
        {
            "stringID": "WbLate.part1",
            "ru": "У Вас есть просроченные накладные в количестве",
            "en": "You have overdue waybills in the amount of"
        },
        {
            "stringID": "WbLate.part2",
            "ru": "шт.!<br/>Для просмотра информации по накладным перейдите в закладку \"Накладные\" и нажмите вкладку \"Просрочено",
            "en": "pcs.! <br/> To view the information on the invoices go to the tab \"Waybill\" and click \"Expired\" tab"
        },
        {
            "stringID": "MnfCont.MnfCount",
            "ru": "Количество манифестов:",
            "en": "Count manifest"
        },
        {
            "stringID": "MnfCont.WbCount",
            "ru": "Количество накладных:",
            "en": "Count waybill"
        },
        {
            "stringID": "MnfCont.ShpcsCount",
            "ru": "Количество мест:",
            "en": "Number of packages:"
        },
        {
            "stringID": "MnfCont.Shwt",
            "ru": "Общий вес:",
            "en": "Total weight:"
        },
        {
            "stringID": "MnfCont.Shvol_wt",
            "ru": "Общий V вес:",
            "en": "Total V weight:"
        },
        {
            "stringID": "OrdsCont.ImportOk",
            "ru": "Импортирование завершено успешно!",
            "en": "Importing completed successfully!"
        },
        {
            "stringID": "OrdsCont.ImportError",
            "ru": "Ошибка импорта!",
            "en": "Import error!"
        },
        {
            "stringID": "OrdsCont.WbSaveError",
            "ru": "Номер накладной не сохранен!",
            "en": "Waybill number is not saved!"
        },
        {
            "stringID": "OrdsCont.WbNumEmptyHead",
            "ru": "Нет номера накладной!",
            "en": "No waybill number!"
        },
        {
            "stringID": "OrdsCont.WbNumEmptyBody",
            "ru": "Откорректируйте информацию",
            "en": "Correct information"
        },
        {
            "stringID": "OrdsCont.OrderAlertBody",
            "ru": "Выберите заказ с введенным номером накладной!",
            "en": "Select the order with entered waybill number!"
        },
        {
            "stringID": "OrdsCont.WbEmpty",
            "ru": "Накладная не введена в систему!",
            "en": "Waybill has not been entered into the system!"
        },
        {
            "stringID": "OrdsCont.AlertExportBody",
            "ru": "Выберите заказ для экспорта",
            "en": "Select an order for export"
        },
        {
            "stringID": "DenyAccess",
            "ru": "Запрещено!",
            "en": "Forbidden!"
        },
        {
            "stringID": "OrdsCont.TemplateEmpty",
            "ru": "У Вас нет шаблонов!",
            "en": "You have no templates!"
        },
        {
            "stringID": "OrdsCont.ErrorOrderEdit",
            "ru": "Редактировать можно только заявленные заказы",
            "en": "You can edit only declared orders"
        },
        {
            "stringID": "OrdsCont.GetOrderEdit",
            "ru": "Выберите заказ для редактирования",
            "en": "Select an order for editing"
        },
        {
            "stringID": "OrdsCont.GetOrderView",
            "ru": "Выберите заказ для просмотра",
            "en": "Select an order to view"
        },
        {
            "stringID": "OrdsCont.CityError",
            "ru": "Ошибка ввода города",
            "en": "Failed entering the city"
        },
        {
            "stringID": "OrdsCont.CitySenderError",
            "ru": "Неверно введен город Отправителя! Выберите город из выпадающего списка.",
            "en": "City Sender incorrectly entered! Select a city from the dropdown list."
        },
        {
            "stringID": "OrdsCont.CityRecipientError",
            "ru": "Неверно введен город Получателя! Выберите город из выпадающего списка.",
            "en": "City Recipient incorrectly entered! Select a city from the dropdown list."
        },
        {
            "stringID": "OrdsCont.OrderSave",
            "ru": "Заказ сохранен!",
            "en": "Order saved!"
        },
        {
            "stringID": "OrdsCont.FileNotSave",
            "ru": "Файл не сохранен!",
            "en": "File is not saved!"
        },
        {
            "stringID": "OrdsCont.OrderNotSave",
            "ru": "Заказ не сохранен!",
            "en": "Order is not saved!"
        },
        {
            "stringID": "OrdsCont.FieldIsEmptyHead",
            "ru": "Не все поля заполнены",
            "en": "Not all fields are specifid"
        },
        {
            "stringID": "OrdsCont.FieldIsEmptyBody",
            "ru": "Откорректируйте информацию",
            "en": "Correct information"
        },
        {
            "stringID": "OrdsCont.OrdersCount",
            "ru": "Количество заказов:",
            "en": "The number of orders:"
        },
        {
            "stringID": "TemplCont.DeleteOkHead",
            "ru": "Успешное удаление!",
            "en": "Successful removal!"
        },
        {
            "stringID": "TemplCont.DeleteOkBody",
            "ru": "Шаблон удален:",
            "en": "Template deleted:"
        },
        {
            "stringID": "TemplCont.DeleteErrorBody",
            "ru": "Не удалось удалить шаблон:",
            "en": "Template is NOT deleted:"
        },
        {
            "stringID": "TemplCont.GetTemplateDeleteBody",
            "ru": "Выберите шаблон для удаления",
            "en": "Select a template to delete"
        },
        {
            "stringID": "TemplCont.GetTemplateEditBody",
            "ru": "Выберите шаблон для редактирования",
            "en": "Select a template for editing"
        },
        {
            "stringID": "TemplCont.TemplateSaveOkHead",
            "ru": "Шаблон сохранен!",
            "en": "The template is saved!"
        },
        {
            "stringID": "TemplCont.TemplateSaveOkBody",
            "ru": "Сохранение шаблона заказа прошло успешно",
            "en": "Saving order template was successful"
        },
        {
            "stringID": "TemplCont.TemplateSaveErrorHead",
            "ru": "Ошибка сохранения",
            "en": "Error saving"
        },
        {
            "stringID": "TemplCont.TemplateSaveErrorBody",
            "ru": "Шаблон заказа не сохранен!",
            "en": "Order template is not saved!"
        },
        {
            "stringID": "WbsCont.NotEditTarif",
            "ru": "Для этой накладной нельзя редактировать Доп. тариф",
            "en": "For this invoice can not edit additional tariff"
        },
        {
            "stringID": "WbsCont.Sum",
            "ru": "Всего:",
            "en": "Total:"
        },
        {
            "stringID": "WbsCont.Wt",
            "ru": "Вес:",
            "en": "Wt:"
        },
        {
            "stringID": "WbsCont.VolWt",
            "ru": "V вес:",
            "en": "Vol. Wt.:"
        },
        {
            "stringID": "WbsCont.s_flip_b",
            "ru": "тар флип баз:",
            "en": "tar flip b:"
        },
        {
            "stringID": "WbsCont.s_flip_a",
            "ru": "тар флип доп:",
            "en": "tar flip a:"
        },
        {
            "stringID": "WbsCont.s_flip_tr",
            "ru": "тар флип ТР:",
            "en": "tar flip TR:"
        },
        {
            "stringID": "WbsCont.s_flip_t",
            "ru": "тар флип всего:",
            "en": "tar flip t:"
        },
        {
            "stringID": "WbsCont.s_ag_b",
            "ru": "тар аг баз:",
            "en": "tar ag b:"
        },
        {
            "stringID": "WbsCont.s_ag_a",
            "ru": "тар аг доп:",
            "en": "tar ag a:"
        },
        {
            "stringID": "WbsCont.s_ag_tr",
            "ru": "тар аг ТР:",
            "en": "tar ag TR:"
        },
        {
            "stringID": "WbsCont.s_ag_t",
            "ru": "тар аг всего:",
            "en": "tar ag t:"
        },
        {
            "stringID": "WbsCont.SavePod",
            "ru": "ПОД сохранено!",
            "en": "POD is saved!"
        },
        {
            "stringID": "WbsCont.NotSavePod",
            "ru": "ПОД не сохранено!",
            "en": "POD is not saved!"
        },
        {
            "stringID": "WbsCont.SaveEx",
            "ru": "Происшествие сохранено!",
            "en": "The incident is saved!"
        },
        {
            "stringID": "WbsCont.NotSaveEx",
            "ru": "Происшествие не сохранено!",
            "en": "The incident was not saved!"
        },
        {
            "stringID": "WbsCont.SaveTarif",
            "ru": "Доп. тариф сохранен!",
            "en": "The additional tariff is saved!"
        },
        {
            "stringID": "WbsCont.NotSaveTarif",
            "ru": "Доп. тариф не сохранен!",
            "en": "The additional tariff is NOT saved!"
        },
        {
            "stringID": "WbsCont.ImportOk",
            "ru": "Импортирование завершено успешно!",
            "en": "Importing completed successfully!"
        },
        {
            "stringID": "WbsCont.ImportError",
            "ru": "Ошибка импорта!",
            "en": "Import failed!"
        },
        {
            "stringID": "WbsCont.GetWb",
            "ru": "Выберите накладную",
            "en": "Select the waybill"
        },
        {
            "stringID": "WbsCont.NotWbPod",
            "ru": "Для этой накладной нельзя внести ПОД, т.к. она не является для вас входящей или еще не сформирован манифест.",
            "en": "For this invoice can not add POD"
        },
        {
            "stringID": "aMonths.January",
            "ru": "Январь",
            "en": "January"
        },
        {
            "stringID": "aMonths.February",
            "ru": "Февраль",
            "en": "February"
        },
        {
            "stringID": "aMonths.March",
            "ru": "Март",
            "en": "March"
        },
        {
            "stringID": "aMonths.April",
            "ru": "Апрель",
            "en": "April"
        },
        {
            "stringID": "aMonths.May",
            "ru": "Май",
            "en": "May"
        },
        {
            "stringID": "aMonths.June",
            "ru": "Июнь",
            "en": "June"
        },
        {
            "stringID": "aMonths.July",
            "ru": "Июль",
            "en": "July"
        },
        {
            "stringID": "aMonths.August",
            "ru": "Август",
            "en": "August"
        },
        {
            "stringID": "aMonths.September",
            "ru": "Сентябрь",
            "en": "September"
        },
        {
            "stringID": "aMonths.October",
            "ru": "Октябрь",
            "en": "October"
        },
        {
            "stringID": "aMonths.November",
            "ru": "Ноябрь",
            "en": "November"
        },
        {
            "stringID": "aMonths.December",
            "ru": "Декабрь",
            "en": "December"
        },
        {
            "stringID": "LoadOrdersForm.uploadFile.fieldLabel",
            "ru": "Файл формата .xls; .xlsx; .csv до 1 Мб.",
            "en": "File format  .xls; .xlsx; .csv; max size 1 Mb."
        },
        {
            "stringID": "LoadOrdersForm.uploadFile.buttonText",
            "ru": "Выбрать",
            "en": "Select"
        },
        {
            "stringID": "UsersCont.IsBlocked",
            "ru": "Блокировать",
            "en": "Blocked"
        },
        {
            "stringID": "UsersCont.IsNotBlocked",
            "ru": "Разблокировать",
            "en": "Unblocked"
        },
        {
            "stringID": "UsersCont.SelectRecord",
            "ru": "Выберите запись",
            "en": "Select record"
        },
        {
            "stringID": "UsersCont.RecordNotSelect",
            "ru": "Запись не выбрана",
            "en": "Record is not selected"
        },
        {
            "stringID": "UsersCont.UserEdit",
            "ru": "Редактирование пользователя:",
            "en": "User Edit:"
        },
        {
            "stringID": "UsersCont.Record blocked",
            "ru": "Запись блокирована",
            "en": "Record is blocked"
        },
        {
            "stringID": "UsersCont.UnblockedRecord",
            "ru": "Разблокируйте запись перед внесением корректировок",
            "en": "Unblocked record before edit record"
        },
        {
            "stringID": "UsersCont.SelectRecordForEdit",
            "ru": "Выберите запись для редактирования",
            "en": "Select record for edit"
        },
        {
            "stringID": "UsersCont.SaveChanges",
            "ru": "Сохранить изменения?",
            "en": "Changes are saved?"
        },
        {
            "stringID": "UsersCont.Agent",
            "ru": "Агент:",
            "en": "Agent:"
        },
        {
            "stringID": "UsersCont.Login",
            "ru": "Логин:",
            "en": "Login:"
        },
        {
            "stringID": "UsersCont.PassNotIdent",
            "ru": "Пароли не совпадают",
            "en": "Passwords do not match"
        },
        {
            "stringID": "UsersCont.InsertIdentPass",
            "ru": "Введите идентичные пароли",
            "en": "Enter identical passwords"
        },
        {
            "stringID": "WbsGrid.ag_cash",
            "ru": "оплата",
            "en": "cash"
        },
        {
            "stringID": "WbsGrid.flip_cash",
            "ru": "оплата",
            "en": "cash"
        },
        {
            "stringID": "WbsCont.s_ag_cash",
            "ru": "тар аг оплата:",
            "en": "tar ag cash:"
        },
        {
            "stringID": "WbsCont.s_flip_cash",
            "ru": "тар флип оплата:",
            "en": "tar flip cash:"
        },
        {
            "stringID": "AdmTool.token",
            "ru": "Ключ",
            "en": "Token"
        },
        {
            "stringID": "TokenWin.token_form_name",
            "ru": "Ключ для АПИ",
            "en": "Token for API"
        },
        {
            "stringID": "MnfGrid.masterwbno",
            "ru": "Мастер накладная",
            "en": "Master waybill"
        }, {
            "stringID": "MnfGrid.infrems",
            "ru": "Описание",
            "en": "Description"
        }, {
            "stringID": "WbGrid.address",
            "ru": "Адрес получателя",
            "en": "Recipient address"
        }, {
            "stringID": "WbGrid.r_city",
            "ru": "Город получателя",
            "en": "Recipient city"
        }, {
            "stringID": "Users.ShowHideUser",
            "ru": "Показать блокированных",
            "en": "Show blocked"
        }, {
            "stringID": "Users.UserSearch",
            "ru": "Поиск пользователя",
            "en": "User search"
        }]

}, function () {
    __ = function (stringID) {
        return FPAgent.lib.Translate.tr(stringID);
    }
});
