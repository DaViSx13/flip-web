Ext.define('FPClient.controller.OrdsCont', {
	extend: 'Ext.app.Controller',
	views: ['orders.OrdGrid', 'orders.OrdWin', 'orders.WbNoWin', 'orders.WbNoForm', 'orders.OrdsPanel', 'orders.UseTemplWin', 'orders.UseTemplForm', 'orders.ViewWbWin', 'wbs.WbsGrid' /*, 'orders.WbWin', 'orders.WbForm'*/],
	models: ['OrdsMod', 'OrderMod', 'CityMod', 'AgentsMod' /*, 'WebWbMod'*/],
	stores: ['OrdsSt', 'aMonths', 'OrderSt', 'CityStOrg', 'CityStDes', 'TypeSt', 'AgentsSt', 'TemplSt', 'ViewWbSt', 'ClientSt'],
	refs: [
		{
			ref: 'OrdForm',
			selector: 'ordform'
		}, {
			ref: 'OrdTool',
			selector: 'ordtool'
		}, {
			ref: 'OrdTotal',
			selector: 'ordtotal'
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
		}, /*{
		ref : 'WbWin',
		selector : 'wbwin'
		},*/
		{
			ref: 'WbNoForm',
			selector: 'wbnoform'
		}, {
			ref: 'MainPanel',
			selector: 'mainpanel'
		}, {
			ref: 'WbsGrid',
			selector: 'wbsgrid'
		}, {
			ref: 'OrdGrid',
			selector: 'ordgrid'
		}, {
			ref: 'TemplGrid',
			selector: 'templgrid'
		}, {
			ref: 'OrdsPanel',
			selector: 'ordspanel'
		}, {
			ref: 'UseTemplForm',
			selector: 'usetemplform'
		}
	],
	init: function () {
		this.control({
			'ordspanel': {
				activate: this.loadOrdGr
			},
			'ordgrid button[action=new]': {
				click: this.openOrdWin
			},
			/*'ordgrid button[action=wbnew]' : {
			click : this.openWbWin
			},*/
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
			/*'wbwin button[action=save]' : {
			click : this.saveWebWb
			},*/
			'ordtool combomonth': {
				change: this.monthChange
			},
			'ordtool numyear': {
				change: this.yearChange
			},
			'loadfileform button[action=delete]': {
				click: this.fileDel
			},
			'ordform checkboxfield[name=webwb]': {
				change: this.checkWb
			},
			'wbsgrid > tableview': {
				itemdblclick: this.dblclickWbsGr
			},
			'ordgrid > tableview': {
				itemdblclick: this.dblclickOrdGr
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
			'viewwbwin button[action=printWB]': {
				click: this.printWB
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
		this.getClientStStore().load();
	},

	printWB: function (but) {
		var frm = but.up('window').down('form');
		window.open('srv/report.php?wbno=' + frm.down('displayfield[name=wb_no]').value+'&iswb=1');
	},


	checkWb: function (ch, newValue, oldValue, eOpts){		
		var print = ch.up('ordform').down('checkboxfield[name=webwbprint]');
		if (newValue) {
			print.setDisabled(false);
		} else {
			print.setValue(0);
			print.setDisabled(true);
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
		//this.getTemplStStore().load();
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
		var form_wbno = win.down('wbnoform');
		if (form_wbno.getForm().isValid()) {
			form_wbno.submit({
				url: 'srv/data.php',
				params: {
					dbAct: 'SetWbno'
				},
				submitEmptyText: false,
				success: function (form, action) {
					form.reset();
					win.close();
					me.loadOrdGr();
				},
				failure: function (form, action) {
					Ext.Msg.alert('Номер накладной не сохранен!', action.result.msg);
				}
			});
		} else {
			Ext.Msg.alert('Нет номера накладной!', 'Откорректируйте информацию')
		}
	},
	editWbno: function (btn) {
		var sm = btn.up('ordgrid').getSelectionModel();
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
		if (sm.getSelection()[0].get('wb_no')) {
			this.getViewWbStStore().load({
				params: {
					wb_no: sm.getSelection()[0].get('wb_no')
				}
			});
		} else {
			Ext.Msg.alert('Внимание!', 'Выберите заказ с введенным номером накладной!');
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
			Ext.Msg.alert('Внимание!', 'Выберите заказ с введенным номером накладной!');
		}
	},
	loadViewWbSt: function (st, rec, suc) {
		if (suc) {
			if (rec[0].data.wbstatus == 0) {
				Ext.Msg.alert('Внимание!', 'Накладная не введена в систему!');
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
			Ext.Msg.alert('Ошибка!', 'Ошибка связи с сервером!');
		}
	},
	exportExcel: function (btn) {
		var sm = btn.up('ordgrid').getSelectionModel();
		if (sm.getCount() > 0) {
			window.location.href = 'srv/getOrderXLS.php?ordnum=' + sm.getSelection()[0].get('rordnum');
		} else {
			Ext.Msg.alert('Внимание!', 'Выберите заказ для экспорта');
		}
	},
	changeAgent: function (comp, newValue) {
		var me = this;
		if (comp.up('mainpanel').activeTab.title == 'Заказы') {
			Ext.Ajax.request({
				url: 'srv/change.php',
				params: {
					agent: newValue[0].data['partcode']
				},
				success: function (response) {
					var text = Ext.decode(response.responseText);
					var aTol = me.getOrdTool();
					var ye = aTol.down('numyear').value;
					var mo = aTol.down('combomonth').value;
					me.loadOrds(ye, mo);
				},
				failure: function (response) {
					Ext.Msg.alert('Сервер недоступен!', response.statusText);
				}
			});
		}
	},
	loadOrds: function (y, m) {
		this.getOrdsStStore().load({
			params: {
				newPeriod: y + m
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
		var aTol = this.getOrdTool();
		var mo = aTol.down('combomonth').value;
		var ye = aTol.down('numyear').value;
		this.loadOrds(ye, mo);
		this.getTemplStStore().load();
	},
	openOrdWin: function (btn) {
		var edit = Ext.widget('ordwin');
		edit.show();
		var form_lf = edit.down('loadfileform');
		form_lf.down('filefield[name=uploadFile]').setVisible(true);
		edit.down('ordform').down('combocity[name=dest]').focus(false, true);

		var timeEdit = edit.down('ordform').down('textfield[name=courtimef]');
		timeEdit.setReadOnly(true);
		timeEdit.setValue('10:00');

		var timeEdit = edit.down('ordform').down('textfield[name=courtimet]');
		timeEdit.setReadOnly(true);
		timeEdit.setValue('19:00');

		//auto sender begin
		client = this.getClientStStore().first();
		//мухлеж		
		client.set('org', client.get('city'));
		client.set('orgcode', client.get('cityid'));

		form_ord = edit.down('ordform');
		//form_ord.loadRecord(client);

		var cb_org = form_ord.down('combocity[name=org]');
		cb_org.store.load({
			params: {
				query: client.get('org')
			}
		});
		cb_org.select(client.get('orgcode'));
		//auto sender end
	},
	openTpl: function (btn) {
		this.getTemplStStore().load();
		if (this.getTemplStStore().getCount() > 0) {
			var win = Ext.widget('usetemplwin');
			win.show();			
			var cb = win.down('usetemplform').down('combobox[name=tplname]')
			cb.focus(false, true);
			cb.select(this.getTemplStStore().first());
		} else {
			Ext.Msg.alert('Запрещено!', 'У Вас нет шаблонов!');
		}
	},
	setTpl: function (btn) {
		var tplform = this.getUseTemplForm();
		if (tplform.getForm().isValid()) {
			var record = this.getTemplStStore().findRecord('id', tplform.down('combobox[name=tplname]').getValue());
			tplform.getForm().reset();
			tplform.up('usetemplwin').close();
			var win = Ext.widget('ordwin');
			var form = win.down('ordform');

			var timeEdit = form.down('textfield[name=courtimef]');
			timeEdit.setReadOnly(true);
			timeEdit.setValue('10:00');

			var timeEdit = form.down('textfield[name=courtimet]');
			timeEdit.setReadOnly(true);
			timeEdit.setValue('19:00');

			form.loadRecord(record);
			var cb_org = form.down('combocity[name=org]');
			cb_org.store.load({
				params: {
					query: cb_org.getValue()
				}
			});
			cb_org.select(record.data['orgcode']);
			var cb_des = form.down('combocity[name=dest]');
			cb_des.store.load({
				params: {
					query: cb_des.getValue()
				}
			});
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
	editOrdWin: function (btn) {
		var sm = btn.up('ordgrid').getSelectionModel();
		if (sm.getCount() > 0) {
			if ((sm.getSelection()[0].get('status') == 'заявлен' && btn.action == 'edit') || (btn.action == 'view')) {
				var win = Ext.create('FPClient.view.orders.OrdWin').show();
				var store_ord = this.getOrderStStore().load({
						params: {
							id: sm.getSelection()[0].get('rordnum')
						}
					});
				if (btn.action == 'view') {
					win.down('button[action=save]').setText('Повторить заказ');
				} else {
					win.down('button[action=save]').setVisible(true);
				}
			} else {
				Ext.Msg.alert('Запрещено!', 'Редактировать можно только заявленные заказы');
			}
		} else {
			if (btn.action == 'edit') {
				Ext.Msg.alert('Внимание!', 'Выберите заказ для редактирования');
			} else {
				Ext.Msg.alert('Внимание!', 'Выберите заказ для просмотра');
			}
		}
	},

	/**
	 * Проверка ввода города.
	 * @param cityFrom Город отправителя
	 * @param cityTo Город получателя
	 * @returns Array Возвращает коды городов.
	 */
	checkCity: function(cityFrom, cityTo) {
		const jsonArrayDes = this
			.getCityStDesStore()
			.data
			.items;
		const jsonArrayOrg = this
			.getCityStOrgStore()
			.data
			.items;

		if (cityFrom.value == null & jsonArrayOrg.length) {
			Ext
				.Msg
				.alert(
					'Ошибка ввода города',
					'Не заполнено поле "Город отправителя".');
			cityFrom.setFieldStyle("border-color:red");
			cityFrom.on({focus:this.resetMarkedFields});
			return null;
		}

		if (cityTo.value == null & jsonArrayDes.length) {
			Ext
				.Msg
				.alert(
					'Ошибка ввода города',
					'Не заполнено поле "Город получателя".');
			cityTo.setFieldStyle("border-color:red");
			cityTo.on({focus:this.resetMarkedFields});
			return null;
		}

		let result = [];
		jsonArrayOrg.forEach(elem => result.push(elem.get('code')));
		jsonArrayDes.forEach(elem => result.push(elem.get('code')));
		return result;
	},


	/**
	 * Сброс помеченых полей.
	 * @param field Поле для сброса
	 */
	resetMarkedFields: function(field) {
		field.setFieldStyle("border-color:gray");
	},

	/**
	 * Сохраняет заказы.
	 * @param btn Кнопка "Сохранить"
	 */
	saveOrder : function (btn) {
		const me 		= this;
		const win 		= btn
			.up('ordwin');
		const form_ord 	= win
			.down('ordform');
		const org 		= form_ord
			.down('combocity[name=org]');
		const dest 		= form_ord
			.down('combocity[name=dest]');

		this.checkCity(org, dest);

		if (win.down('button[action=save]').getText() == 'Повторить заказ') {
			form_ord
				.down('textfield[name=rordnum]')
				.setValue(null);
			form_ord
				.down('datefield[name=courdate]')
				.setValue(new Date());
		}

		const sites = this.checkCity(org, dest);

		if(sites == null) {
			return;
		}

		if (form_ord.getForm().isValid()) {
			form_ord.submit({
				url : 'srv/data.php',
				params : {
					dbAct 	: 'saveagorder',
					org		: sites[0],
					dest	: sites[1]
				},
				submitEmptyText : false,
				success : function (form, action) {
					form.reset();
					me.getOrdForm().up('ordwin').close();
					me.loadOrdGr();
					Ext.Msg.alert(
						'Сохранение заказа',
						'Заказ успешно сохранен: '
						+ action.result.msg);
				},
				failure : function () {
					Ext.Msg.alert('Заказ не сохранен!', action.result.msg);
				}
			});
		} else {
			Ext.Msg.alert(
				'Не все поля заполнены',
				'Откорректируйте информацию')
		}
	},
	monthChange: function (comp, newz, oldz) {
		var aTol = comp.up('ordtool');
		var ye = aTol.down('numyear').value;
		this.loadOrds(ye, newz);
	},
	yearChange: function (comp, newz, oldz) {
		var aTol = comp.up('ordtool');
		var mo = aTol.down('combomonth').value;
		this.loadOrds(newz, mo);
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
	loadOrdStore: function (st, rec, suc) {
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
		//console.log(rec[0]);
	},
	loadOrdersSt: function (st, rec, suc) {
		var tt = this.getOrdTotal();
		tt.down('label').setText('Количество заказов: ' + st.getCount());
	}
});
