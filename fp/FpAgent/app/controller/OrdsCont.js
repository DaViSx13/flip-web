Ext.define('FPAgent.controller.OrdsCont', {
	extend: 'Ext.app.Controller',
	views: ['orders.OrdGrid', 'orders.OrdClientGrid', 'orders.OrdWin', 'orders.WbNoWin', 'orders.WbNoForm', 'orders.OrdsPanel', 'orders.OrdsClientPanel', 'orders.UseTemplWin', 'orders.UseTemplForm', 'orders.ViewWbWin', 'wbs.WbsGrid', 'orders.LoadOrdersWin', 'mainform.WbGrid', 'orders.OrdExWin', 'orders.OrdExGrid', 'orders.OrdExForm'],
	models: ['OrdsMod', 'OrderMod', 'CityMod', 'AgentsMod', 'OrdExMod'],
	stores: ['OrdsSt', 'OrdsClientSt', 'aMonths', 'OrderSt', 'CityStOrg', 'CityStDes', 'TypeSt', 'AgentsSt', 'TemplSt', 'ViewWbSt', 'OrdExStore'],
	refs: [{
			ref: 'OrdForm',
			selector: 'ordform'
		}, {
			ref: 'OrdTool',
			selector: 'ordtool'
		}, {
			ref: 'OrdClientTool',
			selector: 'ordclienttool'
		}, {
			ref: 'OrdsClientPanel',
			selector: 'ordsclientpanel'
		}, {
			ref: 'OrdTotal',
			selector: 'ordtotal'
		}, {
			ref: 'OrdClientTotal',
			selector: 'ordclienttotal'
		}, {
			ref: 'ComboCity',
			selector: 'combocity[name=org]'
		}, {
			ref: 'ComboCity',
			selector: 'combocity[name=dest]'
		}, {
			ref: 'OrdWin',
			selector: 'ordwin'
		}, {
			ref: 'AdmTool',
			selector: 'admtool'
		}, {
			ref: 'LoadFileForm',
			selector: 'loadfileform'
		}, {
			ref: 'ViewWbWin',
			selector: 'viewwbwin'
		}, {
			ref: 'WbNoWin',
			selector: 'wbnowin'
		}, {
			ref: 'WbNoForm',
			selector: 'wbnoform'
		}, {
			ref: 'MainPanel',
			selector: 'mainpanel'
		}, {
			ref: 'WbsGrid',
			selector: 'wbsgrid'
		}, {
			ref: 'WbGrid',
			selector: 'wbgrid'
		}, {
			ref: 'OrdGrid',
			selector: 'ordgrid'
		}, {
			ref: 'OrdClientGrid',
			selector: 'ordclientgrid'
		}, {
			ref: 'TemplGrid',
			selector: 'templgrid'
		}, {
			ref: 'OrdsPanel',
			selector: 'ordspanel'
		}, {
			ref: 'UseTemplForm',
			selector: 'usetemplform'
		}, {
			ref: 'LoadOrdersWin',
			selector: 'loadorderswin'
		}, {
			ref: 'ViewWbForm',
			selector: 'viewwbform'
		}, {
			ref: 'OrdExGrid',
			selector: 'ordexgrid'
		}
	],
	init: function () {

		//////////////////////
		//на onload каждого store вешаем проверку сессии
		//кажется вешается только на созданные store, поэтому в другом контроллере тоже сделаем
		//console.log('ЗАКАЗЫ');
		Ext.data.StoreManager.each(
			function (item) {
			//console.log(item.storeId);
			//item.on('focus', this.myfunc, this);
			item.on('load',
				function (store, records, success) {
				//console.log(store.storeId + ' loaded');
				//console.log(success);
				if (!success) {
					FPAgent.lib.Miscutils.checkSession();
				}
			},
				this);
		});

		///////////////
		this.control({
			'ordspanel': {
				activate: this.loadOrdGr
			},
			'ordsclientpanel': {
				activate: this.loadOrdclientGr
			},
			'ordgrid button[action=new]': {
				click: this.openOrdWin
			},
			'ordgrid button[action=newtpl]': {
				click: this.openTpl
			},
			'ordgrid button[action=edit]': {
				click: this.editOrdWin
			},
			'ordgrid button[action=view]': {
				click: this.editOrdWin
			},
			'ordwin button[action=save]': {
				click: this.saveOrder
			},
			'viewwbwin button[action=printWB]': {
				click: this.printWB
			},
			'ordtool combomonth button[name=periodRefresh]': {
				click: this.periodChange
			},
			'ordclienttool combomonth button[name=periodRefresh]': {
				click: this.periodClientChange
			},
			'loadfileform button[action=delete]': {
				click: this.fileDel
			},
			'wbsgrid > tableview': {
				itemdblclick: this.dblclickWbsGr
			},
			'wbgrid > tableview': {
				itemdblclick: this.dblclickWbsGr
			},
			'ordgrid > tableview': {
				itemdblclick: this.dblclickOrdGr
			},
			'ordclientgrid > tableview': {
				itemdblclick: this.dblclickOrdClientGr
			},
			'admtool comboagent': {
				select: this.changeAgent
			},
			'admtool button[action=list]': {
				click: this.clkList
			},
			'admtool button[action=templ]': {
				click: this.clkTempl
			},
			'ordtool button[action=excel]': {
				click: this.exportExcel
			},
			'ordtool button[action=wbno]': {
				click: this.editWbno
			},
			'ordclienttool button[action=wbno]': {
				click: this.editWbnoClient
			},
			'ordclienttool button[action=wbview]': {
				click: this.viewClientWb
			},
			'ordtool button[action=wbview]': {
				click: this.viewWb
			},
			'wbnowin button[action=save]': {
				click: this.saveWbno
			},
			'wbnoform textfield': {
				keypress: this.pressEnter
			},
			'usetemplwin button[action=set]': {
				click: this.setTpl
			},
			'usetemplform combobox': {
				keypress: this.pressTpl
			},
			'ordtool button[action=import]': {
				click: this.loadOrdersWin
			},
			'ordgrid actioncolumn': {
				itemclick: this.viewEx
			},
			'loadorderswin button[action=imp]': {
				click: this.importOrders
			}
		});
		this.getOrderStStore().on({
			scope: this,
			load: this.loadOrdStore
		});
		this.getViewWbStStore().on({
			scope: this,
			load: this.loadViewWbSt
		});
		this.getOrdsStStore().on({
			scope: this,
			load: this.loadOrdersSt
		});
		this.getOrdsClientStStore().on({
			scope: this,
			load: this.loadClientOrdersSt
		});
		this.getOrdExStoreStore().on({
			scope: this,
			load: this.loadViewExStore
		});
	},

	/**
	 * Получает введенный период.
	 * @returns {[*, *]} Период от и до
	 */
	getDateFromPeriodFilter: function(isClient) {
		if (isClient)
		var panel = this.getOrdClientTool();
		else
		var panel = this.getOrdTool();
	
		var fromDate = panel.down('datefield[name=fromDate]').getValue();
		var toDate = panel.down('datefield[name=toDate]').getValue();
		return [
			Ext.Date.format(fromDate, 'Ymd'),
			Ext.Date.format(toDate, 'Ymd')];
	},

	/**
	 * Выполняет запрос на клиентские заказы.
	 */
	periodClientChange: function() {
		var period = this.getDateFromPeriodFilter(true);
		this.loadClientOrdersByPeriod(period[0], period[1]);
	},

	/**
	 * Выполняет запрос на заказы.
	 * @param button Кнопка "Обновить"
	 */
	periodChange: function(button) {
		var period = this.getDateFromPeriodFilter(false);
		this.loadOrdersByPeriod(period[0], period[1]);
	},

	test: function() {
		console.log("work");
	},

	/**
	 * Удаляет или восстанавливает запись,
	 * если парматр isDeleted имеет занчение:
	 * 0 - удалет из хранилища
	 * 1 - восстанавливает
	 * @param grid Таблица
	 * @param rowIndex Индекс строки (Не используется)
	 * @param colIndex Индекс колонки (Не используется)
	 * @param item Нажатая колонка (Не используется)
	 * @param event Действие (Не используется)
	 * @param record Запись
	 */
	deleteRecordWebNo: function (grid, rowIndex, colIndex, item, event, record) {
		if (record.get('isdeleted') === 0) {
			record.set('isdeleted', 1);
		} else {
			record.set('isdeleted', 0);
		}
	},

	/**
	 * Получает хранилище таблицы,
	 * находящаяся в окне
	 * @param element Элемент окна
	 * @returns Хранилище
	 */
	getWebNoStoreByElement: function(element) {
		let win = element.up('window');
		let grid = win.down('grid');
		return grid.getStore();
	},
	/**
	 * Запрещает редактирование строк в таблице,
	 * кроме новой записи.
	 * @param editor Редактор
	 * @param e Набор данных:
	 *  - Таблица
	 *  - Запись
	 *  - Выделеная модель
	 * @returns {boolean} Если не новая запись,
	 * завершает выполнение криптов
	 * @constructor Конструктор
	 */
	WebNoDisableEditing: function(editor, e) {
		if(!e.record.phantom) return false;
	},

	/**
	 * Функция скрывает или показывает
	 * удаленные записи в таблице
	 * @param button Кнопка
	 * 'Показать/Скрыть удаленные записи'
	 */
	showHideDeletedRecords: function(button) {
		let buttonText = button.getText();
		const store = this.getWebNoStoreByElement(button);
		if (buttonText == 'Показать удаленные') {
			button.setText('Скрыть удаленные');
			button.setIconCls('eyeClosed');
			store.clearFilter();
		} else {
			button.setText('Показать удаленные');
			button.setIconCls('eyeOpened');
			store.filter('isdeleted', 0);
		}
	},

	/**
	 * Закрытие окна Накладных
	 * от кнопки в шапке окна.
	 * @param window Окно
	 */
	closeWebNoByWindow: function(window) {
		//this.syncWebNoData(window);
	},

	/**
	 * Закрытие окна накладных
	 * от кнопки 'Закрыть'
	 * @param button кнопка 'Закрыть'
	 */
	closeWebNoByButton: function(button) {
		this.syncWebNoData(button.up('window'));
	},

	/**
	 * Синхранизация данных накладных с сервером
	 * @param win Окно накладные
	 */
	syncWebNoData: function(win) {
		let statusBar = win.down('label[name=webNoStatusBar]');

		statusBar.show();
		let orderNum = win.name;
		let tools = this.getOrdClientTool();
		let tabs = tools.up('tabpanel');
		let activeTabName = tabs.getActiveTab().title;
		const store = win.down('grid').getStore();
		var errors = [];

		let updatedRows = store.getUpdatedRecords();
		if(updatedRows.length > 0) {
			let tempErrors = this.webNumChangeStatus(updatedRows);
			errors = tempErrors;
		}
		let newRows = store.getNewRecords();

		if(newRows.length > 0) {
			let tempErrors;
			if(activeTabName == 'Заказы') {
				tempErrors = this.webNumAddRecord(
													newRows,
													orderNum,
													1);
			}
			else {
				tempErrors = this.webNumAddRecord(
													newRows,
													orderNum,
													0);
			}

			errors = tempErrors;
		}

		if(errors.length > 0) {
			statusBar.update('<img src="resources/images/warning.png" height="15px"/>  ЕСТЬ ЗАМЕЧАНИЯ');
			let message = 'Найдены ошибки при обновлении базы даннах: <br>'
						  + errors;
			Ext.Msg.alert("Замечания", message);
		} else {
			win.close();
		}
	},
	
	webNumAddRecord: function(rows, orderNum, isAgent) {

		var errorsRows = '';
		Ext.Array.each(rows, function (record) {
			if(record.get('web_num') == 'NaN') {
				errorsRows += record.get('web_num')
								+ ' Ошибка: Не допустимый номер накладной<br>';
			}
			else if(record.get('web_num').length == 0) {
				errorsRows  += ('Без номера. '
					+ 'Ошибка: Не допустимый номер накладной, ');
			}

			else if(record.get('web_num').length > 50) {
				errorsRows  += (record.get('web_num')
					+ ' Ошибка: Не допустимый количество символов в номере накладной<br> ');
			} else {
				Ext.Ajax.request({
					url: 'srv/data.php',
					method: 'POST',
					async:false,
					params: {
						dbAct		: 'setWebNoGroup',
						orderNum	: orderNum,
						webNum		: record.get('web_num'),
						isAgent		: isAgent,
						cost		: record.get('cost')
					},
					callback: function(options, success, response){
						let responseJson = Ext.decode(response.responseText);

						if(!responseJson.success) {
							errorsRows += (record.get('web_num')
								+ ' Ошибка: '
								+ responseJson.msg
								+ '<br> ');
						}
					},
				});
			}

		});
		return errorsRows;
	},

	/**
	 * Удаляет записи на сервере
	 * @param rows Список строк
	 * @param status Статус
	 */
	webNumChangeStatus: function(rows) {
		var errorsRows = '';
		Ext.Array.each(rows, function (record) {
			Ext.Ajax.request({
				url: 'srv/data.php',
				method: 'POST',
				params: {
					dbAct		: 'ChangeStatusWebNo',
					webNum		: record.get('web_num'),
					isDeleted	: record.get('isdeleted')
				},
				callback: function(options, success, response){
					let responseJson = Ext.decode(response.responseText);

					if(!responseJson.success) {

						errorsRows += (record.get('web_num')
							+ ' Ошибка: "'
							+ responseJson.msg
							+ '<br> ');
					}
				},
			});
		});

		return errorsRows;
	},

	/**
	 * Добавляет в грид пустую модель
	 * для дальнейшего ввода данных.
	 * @param button Кнопка 'Добавить'
	 */
	addWebNoRecord: function(button) {
		let win = button.up('window');
		let grid = win.down('grid');
		let store = this.getWebNoStoreByElement(button);
		console.log(grid);
		let editor = grid.getPlugin('editRow');

		editor.enable();
		let gridModel = store.model;
		store.insert(0, new gridModel());
		editor.startEdit(0,1);
	},

	loadViewExStore: function () {
		this.getOrdExGrid().getSelectionModel().select(0);
	},
	importOrders: function (btn) {
		var me = this;
		var win = btn.up('loadorderswin');
		var form_imp = win.down('loadordersform');
		if (form_imp.getForm().isValid() && form_imp.down('filefield[name=uploadFile]').getValue()) {
			form_imp.submit({
				url: 'srv/import/import.php',
				params: {
					act: 'importOrders'
				},
				success: function (form, action) {

					me.loadOrdGr();
					win.close();
					Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.ImportOk") /*'Импортирование завершено успешно!'*/, action.result.msg);
				},
				failure: function (form, action) {
					Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.ImportError") /*'Ошибка импорта!'*/, action.result.msg);
				}
			});
		}
	},
	loadOrdersWin: function (btn) {
		Ext.widget('loadorderswin').show();
	},
	viewEx: function (column, action, grid, rowIndex, colIndex, record, node) {
		this.viewExGrid(record.data['rordnum']);
	},
	viewExGrid: function (ex_rordnum) {
		if (ex_rordnum) {
			Ext.widget('ordexwin').show();
			this.getOrdExStoreStore().load({
				params: {
					rordnum: ex_rordnum
				}
			});
		} else {
			Ext.Msg.alert(FPAgent.lib.Translate.tr("DenyAccess") /*'Запрещено!'*/, FPAgent.lib.Translate.tr("UsersCont.SelectRecord") /*'Выберите накладную'*/);
		}
	},
	clkList: function (btn) {
		btn.toggle(true);
		var aTol = btn.up('admtool');
		aTol.down('button[action=templ]').toggle(false);
		this.getOrdsPanel().down('templgrid').setVisible(false);
		this.getOrdsPanel().down('ordgrid').setVisible(true);
	},
	clkTempl: function (btn) {
		btn.toggle(true);
		var aTol = btn.up('admtool');
		aTol.down('button[action=list]').toggle(false);
		this.getOrdsPanel().down('ordgrid').setVisible(false);
		this.getOrdsPanel().down('templgrid').setVisible(true);
	},
	pressEnter: function (fild, e) {
		var keyCode = e.getKey();
		if (keyCode == 13) {
			this.saveWbno(fild.up('wbnoform').up('wbnowin').down('button[action=save]'));
		}
	},
	pressTpl: function (fild, e) {
		var keyCode = e.getKey();
		if (keyCode == 13) {
			this.setTpl();
		}
	},
	saveWbno: function (btn) {
		var me = this;
		var win = btn.up('wbnowin');
		var activetab = me.getOrdsPanel().hidden;
		var form_wbno = win.down('wbnoform');
		if (!activetab) {
						var Action = 'SetWbno';
					} else {
						var Action = 'SetWbnoCli';
					}		
		if (form_wbno.getForm().isValid()) {
			form_wbno.submit({
				url: 'srv/data.php',
				params: {
					dbAct: Action//'SetWbno'
				},
				submitEmptyText: false,
				success: function (form, action) {
					form.reset();
					win.close();
					if (!activetab) {
						me.loadOrdGr();
					} else {
						me.loadOrdclientGr();
					}
				},
				failure: function (form, action) {
					Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.WbSaveError") /*'Номер накладной не сохранен!'*/, action.result.msg);
				}
			});
		} else {
			Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.WbNumEmptyHead") /*'Нет номера накладной!'*/, FPAgent.lib.Translate.tr("OrdsCont.WbNumEmptyBody") /*'Откорректируйте информацию'*/)
		}
	},
	editWbno: function (btn) {
		var sm = btn.up('ordgrid').getSelectionModel();
		this.editWbnoBase(sm);
	},

	editWbnoClient: function (btn) {
		var sm = btn.up('ordclientgrid').getSelectionModel();
		this.editWbnoBase(sm);
	},

	editWbnoBase: function (sm) {
		if (sm.getCount() > 0) {
			var win = Ext.widget('wbnowin');
			win.show();
			var form = win.down('wbnoform');
			form.down('textfield[name=wbno]').setValue(sm.getSelection()[0].get('wb_no'));
			form.down('textfield[name=rordnum]').setValue(sm.getSelection()[0].get('rordnum'));
			form.down('textfield[name=wbno]').focus(false, true);
		} else {
			Ext.Msg.alert('Внимание!', 'Выберите заказ');
		}
	},
	viewWb: function (btn) {
		var sm = btn.up('ordgrid').getSelectionModel();
		this.viewWBase(sm);
	},

	viewClientWb: function (btn) {
		var sm = btn.up('ordclientgrid').getSelectionModel();
		this.viewWBase(sm);
	},

	viewWBase: function (sm) {
		if (sm.selected.length > 0)
			if (sm.getSelection()[0].get('wb_no')) {
				this.getViewWbStStore().load({
					params: {
						wb_no: sm.getSelection()[0].get('wb_no')
					}
				});
			} else {
				Ext.Msg.alert(FPAgent.lib.Translate.tr("Alert") /*'Внимание!'*/, FPAgent.lib.Translate.tr("OrdsCont.OrderAlertBody") /*'Выберите заказ с введенным номером накладной!'*/);
			}
	},
	dblclickWbsGr: function (gr, rec) {
		var sm = gr.getSelectionModel();
		if (sm.getSelection()[0].get('wb_no')) {
			this.getViewWbStStore().load({
				params: {
					wb_no: sm.getSelection()[0].get('wb_no')
				}
			});
		} else {
			Ext.Msg.alert(FPAgent.lib.Translate.tr("Alert") /*'Внимание!'*/, FPAgent.lib.Translate.tr("OrdsCont.OrderAlertBody") /*'Выберите заказ с введенным номером накладной!'*/);
		}
	},
	loadViewWbSt: function (st, rec, suc) {
		if (suc) {
			if (rec[0].data.wbstatus == 0) {
				Ext.Msg.alert(FPAgent.lib.Translate.tr("Alert") /*'Внимание!'*/, FPAgent.lib.Translate.tr("OrdsCont.WbEmpty") /*'Накладная не введена в систему!'*/);
			} else {
				var win = Ext.widget('viewwbwin');
				var form = win.down('viewwbform');
				rec[0].data.d_acc = Ext.Date.format(rec[0].data.d_acc, "d / m / y");
				rec[0].data.dod = Ext.Date.format(rec[0].data.dod, "d / m / y");
				rec[0].data.tdd = Ext.Date.format(rec[0].data.tdd, "H : i");
				if (rec[0].data.timing) {
					form.down('displayfield[name=timing_check]').setVisible(true);
					rec[0].data.timing = Ext.Date.format(rec[0].data.timing, "H:i");
				}
				switch (rec[0].data.t_srv) {
				case 'EX': {
						form.down('displayfield[name=t_srv_ex]').setVisible(true);
						break;
					}
				case 'ST': {
						form.down('displayfield[name=t_srv_st]').setVisible(true);
						break;
					}
				case 'AF': {
						form.down('displayfield[name=t_srv_af]').setVisible(true);
						break;
					}
				}
				switch (rec[0].data.payr) {
				case 1: {
						form.down('displayfield[name=payr_1]').setVisible(true);
						break;
					}
				case 2: {
						form.down('displayfield[name=payr_2]').setVisible(true);
						break;
					}
				case 3: {
						form.down('displayfield[name=payr_3]').setVisible(true);
						break;
					}
				}
				switch (rec[0].data.t_pak) {
				case 'LE': {
						form.down('displayfield[name=t_pak_le]').setVisible(true);
						break;
					}
				case 'PL': {
						form.down('displayfield[name=t_pak_pl]').setVisible(true);
						break;
					}
				}
				switch (rec[0].data.metpaym) {
				case 'CSH': {
						form.down('displayfield[name=metpaym_csh]').setVisible(true);
						break;
					}
				case 'INV': {
						form.down('displayfield[name=metpaym_inv]').setVisible(true);
						break;
					}
				}
				switch (rec[0].data.t_del) {
				case 'AD': {
						form.down('displayfield[name=t_del_ad]').setVisible(true);
						break;
					}
				case 'HO': {
						form.down('displayfield[name=t_del_ho]').setVisible(true);
						break;
					}
				case 'TA': {
						form.down('displayfield[name=t_del_ta]').setVisible(true);
						break;
					}
				}
				switch (rec[0].data.ins) {
				case 0: {
						form.down('displayfield[name=ins_0]').setVisible(true);
						break;
					}
				default: {
						form.down('displayfield[name=ins_1]').setVisible(true);
					}
				}
				form.loadRecord(rec[0]);
				win.show();
			}
		} else {
			Ext.Msg.alert(
				FPAgent.lib.Translate.tr("Error") /*'Ошибка!'*/,
				FPAgent.lib.Translate.tr("ServerdDown") /*'Ошибка связи с сервером!'*/);
		}
	},
	exportExcel: function (btn) {
		var sm = btn.up('ordgrid').getSelectionModel();
		if (sm.getCount() > 0) {
			window.location.href = 'srv/getOrderXLS.php?ordnum=' + sm.getSelection()[0].get('rordnum');
		} else {
			Ext.Msg.alert(FPAgent.lib.Translate.tr("Alert") /*'Внимание!'*/, FPAgent.lib.Translate.tr("OrdsCont.AlertExportBody") /*'Выберите заказ для экспорта'*/);
		}
	},

	/**
	 * Нажатие на вкладку.
	 * @param comp Вкладка
	 * @param newValue Значение
	 */
	changeAgent: function (comp, newValue) {
		if (comp.up('mainpanel').activeTab.title == 'Заказы') {
			Ext.Ajax.request({
				url: 'srv/change.php',
				params: {
					agent: newValue[0].data['partcode']
				},
				success: function () {
					var period = this.getDateFromPeriodFilter(false);
					this.loadOrdersByPeriod(period[0], period[1]);
				},
				failure: function (response) {
					Ext.Msg.alert(
						FPAgent.lib.Translate.tr("ServerdDown") /*'Сервер недоступен!'*/,
						response.statusText);
				}
			});
		}
	},

	loadOrdersByPeriod: function(startDate, endDate) {
		this.getOrdsStStore().load({
			params: {
				startDate: startDate,
				endDate: endDate
			}
		});
	},

	loadOrds: function (y, m) {
		this.getOrdsStStore().load({
			params: {
				newPeriod: y + m
			}
		});
	},

	loadClientOrdersByPeriod: function(startDate, endDate) {
		this.getOrdsClientStStore().load({
			params: {
				startDate: startDate,
				endDate: endDate
			}
		});
	},


	loadOrdGr: function (Pan) {
		var adTol = this.getAdmTool();
		if (adTol.down('label').text == 'WEB Администратор') {
			adTol.down('buttongroup[itemId=admgroup]').setVisible(true);
		}
		var btnList = adTol.down('button[action=list]');
		var btnTempl = adTol.down('button[action=templ]');
		btnList.setVisible(true);
		btnTempl.setVisible(true);

		this.clkList(btnList);
		var period = this.getDateFromPeriodFilter(false);
		this.loadOrdersByPeriod(period[0], period[1]);
		this.getTemplStStore().load();
	},

	loadOrdclientGr: function (Pan) {
		var adTol = this.getAdmTool();
		if (adTol.down('label').text == 'WEB Администратор') {
			adTol.down('buttongroup[itemId=admgroup]').setVisible(true);
		}

		var btnList = adTol.down('button[action=list]');
		var btnTempl = adTol.down('button[action=templ]');
		btnList.setVisible(false);
		btnTempl.setVisible(false);

		this.clkList(btnList);

		var period = this.getDateFromPeriodFilter(true);
		this.loadClientOrdersByPeriod(period[0], period[1]);
	},

	openOrdWin: function (btn) {
		var edit = Ext.widget('ordwin');
		edit.show();
		var form_lf = edit.down('loadfileform');
		form_lf.down('filefield[name=uploadFile]').setVisible(true);
		edit.down('ordform').down('combocity[name=org]').focus(false, true);

		var timeEdit = edit.down('ordform').down('textfield[name=courtimef]');
		timeEdit.setReadOnly(true);
		timeEdit.setValue('10:00');

		var timeEdit = edit.down('ordform').down('textfield[name=courtimet]');
		timeEdit.setReadOnly(true);
		timeEdit.setValue('19:00');
	},
	openTpl: function (btn) {
		if (this.getTemplStStore().getCount() > 0) {
			var win = Ext.widget('usetemplwin');
			win.show();
			var cb = win.down('usetemplform').down('combobox[name=tplname]')
				cb.focus(false, true);
			cb.select(this.getTemplStStore().first());
		} else {
			Ext.Msg.alert(FPAgent.lib.Translate.tr("DenyAccess") /*'Запрещено!'*/, FPAgent.lib.Translate.tr("OrdsCont.TemplateEmpty") /*'У Вас нет шаблонов!'*/);
		}
	},
	setTpl: function (btn) {
		var tplform = this.getUseTemplForm();
		if (tplform.getForm().isValid()) {
			var record = this.getTemplStStore().findRecord('id', tplform.down('combobox[name=tplname]').getValue());
			tplform.getForm().reset();
			tplform.up('usetemplwin').close();
			var win = Ext.widget('ordwin');

			var timeEdit = win.down('ordform').down('textfield[name=courtimef]');
			timeEdit.setReadOnly(true);
			timeEdit.setValue('10:00');

			var timeEdit = win.down('ordform').down('textfield[name=courtimet]');
			timeEdit.setReadOnly(true);
			timeEdit.setValue('19:00');

			var form = win.down('ordform');
			form.loadRecord(record);
			var cb_org = form.down('combocity[name=org]');
			cb_org.store.load({
				params: {
					query: cb_org.getValue()
				}
			});
			if (record.data['orgcode'] != 0)
				cb_org.select(record.data['orgcode']);
			var cb_des = form.down('combocity[name=dest]');
			cb_des.store.load({
				params: {
					query: cb_des.getValue()
				}
			});
			if (record.data['destcode'] != 0)
				cb_des.select(record.data['destcode']);
			this.getLoadFileForm().down('filefield[name=uploadFile]').setVisible(true);
		}
	},
	dblclickOrdGr: function (gr, rec) {
		var tt = this.getOrdTool();
		if (rec.data['status'] == 'заявлен') {
			var vbut = tt.down('button[action=edit]');
		} else {
			var vbut = tt.down('button[action=view]');
		}
		this.editOrdWin(vbut);
	},
	dblclickOrdClientGr: function (gr, rec) {
		var tt = this.getOrdClientTool();
		var vbut = tt.down('button[action=view]');
		this.showClientOrdWin(gr);
	},
	editOrdWin: function (btn) {

		var sm = btn.up('ordgrid').getSelectionModel();

		if (sm.getCount() > 0) {
			if ((sm.getSelection()[0].get('status') == 'заявлен' && btn.action == 'edit') || (btn.action == 'view')) {
				var win = Ext.widget('ordwin');
				win.show();
				//Ext.create('FPAgent.view.orders.OrdWin').show();
				var store_ord = this.getOrderStStore().load({
						params: {
							id: sm.getSelection()[0].get('rordnum')
						}
					});
				if (btn.action == 'view') {
					win.down('button[action=save]').setVisible(false);
				} else {
					win.down('button[action=save]').setVisible(true);
				}
			} else {
				Ext.Msg.alert(FPAgent.lib.Translate.tr("DenyAccess") /*'Запрещено!'*/, FPAgent.lib.Translate.tr("OrdsCont.ErrorOrderEdit") /*'Редактировать можно только заявленные заказы'*/);
			}
		} else {
			if (btn.action == 'edit') {
				Ext.Msg.alert(FPAgent.lib.Translate.tr("Alert") /*'Внимание!'*/, FPAgent.lib.Translate.tr("OrdsCont.GetOrderEdit") /*'Выберите заказ для редактирования'*/);
			} else {
				Ext.Msg.alert(FPAgent.lib.Translate.tr("Alert") /*'Внимание!'*/, FPAgent.lib.Translate.tr("OrdsCont.GetOrderView") /*'Выберите заказ для просмотра'*/);
			}
		}
	},
	showClientOrdWin: function (grid) {
		var sm = grid.getSelectionModel();

		if (sm.getCount() > 0) {
			var win = Ext.create('FPAgent.view.orders.OrdWin').show();
			var store_ord = this.getOrderStStore().load({
					params: {
						id: sm.getSelection()[0].get('rordnum')
					}
				});

			var formWin = win.items.items[0];
			var fields = formWin.items;

			win.down('button[action=save]').setVisible(false);
		} else {
			if (btn.action == 'edit') {
				Ext.Msg.alert(FPAgent.lib.Translate.tr("Alert") /*'Внимание!'*/, FPAgent.lib.Translate.tr("OrdsCont.GetOrderEdit") /*'Выберите заказ для редактирования'*/);
			} else {
				Ext.Msg.alert(FPAgent.lib.Translate.tr("Alert") /*'Внимание!'*/, FPAgent.lib.Translate.tr("OrdsCont.GetOrderView") /*'Выберите заказ для просмотра'*/);
			}
		}
	},
	printWB: function (btn) {
		var record = this.getViewWbStStore().findRecord('wb_no', this.getViewWbForm().down('displayfield[name=wb_no]').value);
		window.open('srv/report.php?wbno=' + this.getViewWbForm().down('displayfield[name=wb_no]').value);
	},

	saveOrder: function (btn) {
		var me = this;
		var win = btn.up('ordwin');
		var form_ord = win.down('ordform');
		var form_lf = win.down('loadfileform');
		var org = form_ord.down('combocity[name=org]');
		var dest = form_ord.down('combocity[name=dest]');
		if (org.value == null) {
			var jsonArrayOrg = this.getCityStOrgStore().data.items;
			if (jsonArrayOrg.length == 0) {
				Ext.Msg.alert(
					FPAgent.lib.Translate.tr("OrdsCont.CityError") /*'Ошибка ввода города'*/,
					FPAgent.lib.Translate.tr("OrdsCont.CitySenderError") /*'Неверно введен город Отправителя! Выберите город из выпадающего списка.'*/);
				return;
			};
			for (var i = 0; i < jsonArrayOrg.length; i++) {
				if (jsonArrayOrg[i].get('fname') == Ext.String.trim(org.getRawValue())) {
					org.setValue(jsonArrayOrg[i].data.code);
					break;
				};
			};
			if (org.value == null) {
				Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.CityError") /*'Ошибка ввода города'*/, FPAgent.lib.Translate.tr("OrdsCont.CitySenderError") /*'Неверно введен город Отправителя! Выберите город из выпадающего списка.'*/);
				return;
			};
		}
		if (dest.value == null) {
			var jsonArrayDes = this.getCityStDesStore().data.items;
			if (jsonArrayDes.length == 0) {
				Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.CityError") /*'Ошибка ввода города'*/, FPAgent.lib.Translate.tr("OrdsCont.CityRecipientError") /*'Неверно введен город Получателя! Выберите город из выпадающего списка.'*/);
				return;
			};
			for (var i = 0; i < jsonArrayDes.length; i++) {
				if (jsonArrayDes[i].get('fname') == Ext.String.trim(dest.getRawValue())) {
					dest.setValue(jsonArrayDes[i].data.code);
					break;
				};
			};
			if (dest.value == null) {
				Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.CityError") /*'Ошибка ввода города'*/, FPAgent.lib.Translate.tr("OrdsCont.CityRecipientError") /*'Неверно введен город Получателя! Выберите город из выпадающего списка.'*/);
				return;
			};
		}
		if (form_ord.getForm().isValid()) {
			btn.disable();
			form_ord.submit({
				url: 'srv/data.php',
				params: {
					dbAct: 'saveagorder'
				},
				submitEmptyText: false,
				success: function (form, action) {					
					if (action.result.data[0].rordnum && form_lf.down('filefield[name=uploadFile]').getValue()) {
						if (form_lf.getForm().isValid()) {
							form_lf.submit({
								url: 'srv/upload.php',
								params: {
									act: 'ins',
									orderNum: action.result.data[0].rordnum
								},
								success: function (form, action) {
									form.reset();
									me.getOrdForm().up('ordwin').close();
									me.loadOrdGr();
									Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.OrderSave") /*'Заказ сохранен!'*/, action.result.msg);
								},
								failure: function (form, action) {
									form.reset();
									me.getOrdForm().up('ordwin').close();
									me.loadOrdGr();
									Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.FileNotSave") /*'Файл не сохранен!'*/, action.result.msg);
								}
							});
						}
					} else {
						form.reset();
						me.getOrdForm().up('ordwin').close();
						me.loadOrdGr();
						Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.OrderSave") /*'Заказ сохранен!'*/, action.result.msg);
					}
				},
				failure: function (form, action) {
					Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.OrderNotSave") /*'Заказ не сохранен!'*/, action.result.msg);
					btn.enable();
				}
			});
		} else {
			Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.FieldIsEmptyHead") /*'Не все поля заполнены'*/, FPAgent.lib.Translate.tr("OrdsCont.FieldIsEmptyBody") /*'Откорректируйте информацию'*/)
		}
	},

	fileDel: function (but) {
		var form_lf = but.up('loadfileform');
		var form_ord = this.getOrdForm();
		Ext.Ajax.request({
			url: 'srv/upload.php',
			params: {
				orderNum: form_ord.down('textfield[name=rordnum]').getValue(),
				act: 'del'
			},
			success: function (fp) {
				jData = Ext.decode(fp.responseText);
				form_lf.down('label[name=urlf]').setText('', false);
				form_lf.down('button[action=delete]').hide();
				form_lf.down('filefield[name=uploadFile]').show();
			},
			failure: function (response) {
				Ext.Msg.alert('error!');
			}
		});
	},

	loadOrdStore: function (st, rec) {
		var edi = this.getOrdWin();
		var form_ord = edi.down('ordform');
		var form_lf = edi.down('loadfileform');
		if (rec[0].data.autorfilename) {
			form_lf.down('filefield[name=uploadFile]').setVisible(false);
			form_lf.down('label[name=urlf]').setVisible(true);
			if (rec[0].data.fileowner == 1 && rec[0].data.status == 'заявлен') {
				form_lf.down('button[action=delete]').show();
			}
			form_lf.down('label[name=urlf]').setText('<a href="srv/downloadfile.php?fn=' + rec[0].data.realfilename + '"   target="_blank">Скачать прикрепленный файл: ' + rec[0].data.autorfilename + '</a>', false);
		} else {
			if (rec[0].data.fileowner == 1 && rec[0].data.status == 'заявлен') {
				form_lf.down('filefield[name=uploadFile]').setVisible(true);
			}
			form_lf.down('label[name=urlf]').setVisible(false);
			form_lf.down('button[action=delete]').hide();
		}
		form_ord.loadRecord(rec[0]);
		edi.setTitle('Заказ № ' + rec[0].data['rordnum']);
		
		var cb_org = form_ord.down('combocity[name=org]');
		cb_org.store.load({
			params: {
				query: cb_org.getValue()
			}
		});
		cb_org.select(rec[0].data['orgcode']);
		
		var cb_des = form_ord.down('combocity[name=dest]');
		cb_des.store.load({
			params: {
				query: cb_des.getValue()
			}
		});
		cb_des.select(rec[0].data['destcode']);
		
		form_ord.down('combocity[name=org]').focus(false, true);
	},
	loadOrdersSt: function (st) {
		var tt = this.getOrdTotal();
		tt.down('label').setText(FPAgent.lib.Translate.tr("OrdsCont.OrdersCount") /*'Количество заказов: '*/ + st.getCount());
	},

	loadClientOrdersSt: function (st, rec) {
		var tt = this.getOrdClientTotal();
		var label = tt.down('label');
		label.setText(FPAgent.lib.Translate.tr("OrdsCont.OrdersCount") /*'Количество заказов: '*/ + st.getCount());
	}
});
