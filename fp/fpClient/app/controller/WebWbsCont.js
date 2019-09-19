Ext.define('FPClient.controller.WebWbsCont', {
	extend: 'Ext.app.Controller',
	views: ['webwbs.WebWbsGrid', 'mainform.MainPanel', 'mainform.NumYear', 'mainform.ComboMonth', 'webwbs.WebWbsTool', 'webwbs.WbWin', 'webwbs.WbForm', 'webwbs.WebWbsTotal'],
	models: ['WebWbMod', 'CityMod'],
	stores: ['WebWbSt', 'CityStOrg', 'CityStDes', 'TypeSt'],
	refs: [{
			ref: 'WebWbsGrid',
			selector: 'webwbsgrid'
		}, {
			ref: 'WebWbsTool',
			selector: 'webwbstool'
		}, {
			ref: 'AdmTool',
			selector: 'admtool'
		}, {
			ref: 'WbWin',
			selector: 'wbwin'
		}, {
			ref: 'WbForm',
			selector: 'wbform'
		}, {
			ref: 'ComboCity',
			selector: 'combocity[name=org]'
		}, {
			ref: 'ComboCity',
			selector: 'combocity[name=dest]'
		}, {
			ref: 'WebWbsTotal',
			selector: 'webwbstotal'
		}
	],
	init: function () {
		this.control({
			'webwbsgrid': {
				activate: this.loadWebWbGr
			},
			'webwbstool combomonth': {
				change: this.monthChange
			},
			'webwbstool numyear': {
				change: this.yearChange
			},
			'webwbsgrid > tableview': {
				itemdblclick: this.dblclickWebWbsGr
			},
			'wbwin button[action=save]': {
				click: this.saveWebWb
			},
			'ordgrid button[action=wbnew]': {
				click: this.openWbWin
			},
			'webwbstool button[action=printwb]': {
				click: this.printWB
			},
			'admtool comboagent': {
				select: this.changeAgent
			}
		});
	},
	changeAgent: function (comp, newValue) {
		var me = this;
		if (comp.up('mainpanel').activeTab.title == 'Веб накладные') {
			Ext.Ajax.request({
				url: 'srv/change.php',
				params: {
					agent: newValue[0].data['partcode']
				},
				success: function (response) {
					var text = Ext.decode(response.responseText);
					var aTol = me.getWebWbsTool();
					var mo = aTol.down('combomonth').value;
					var ye = aTol.down('numyear').value;
					me.loadWebWbs(ye, mo);
				},
				failure: function (response) {
					Ext.Msg.alert('Сервер недоступен!', response.statusText);
				}
			});
		}
	},
	openWbWin: function (btn) {
		var sm = btn.up('ordgrid').getSelectionModel();
		if (sm.getCount() > 0) {
			var edit = Ext.widget('wbwin');
			edit.show();
			var form = edit.down('wbform');
			form.down('textfield[name=ord_no]').setValue(sm.getSelection()[0].get('rordnum'));
			var cb_org = form.down('combocity[name=org]');
			cb_org.setValue(sm.getSelection()[0].get('orgcity'));
			cb_org.store.load({
				params: {
					query: cb_org.getValue()
				}
			});
			cb_org.select(sm.getSelection()[0].get('org'));
			form.down('textfield[name=s_co]').setValue(sm.getSelection()[0].get('cname'));
			form.down('textfield[name=s_adr]').setValue(sm.getSelection()[0].get('s_adr'));
			form.down('textfield[name=s_name]').setValue(sm.getSelection()[0].get('s_name'));
			form.down('textfield[name=s_mail]').setValue(sm.getSelection()[0].get('s_mail'));
			form.down('textfield[name=s_tel]').setValue(sm.getSelection()[0].get('s_tel'));
			form.down('combobox[name=type]').setValue(sm.getSelection()[0].get('type'));
			form.down('textfield[name=pcs]').setValue(sm.getSelection()[0].get('packs'));
			form.down('textfield[name=wt]').setValue(sm.getSelection()[0].get('wt'));
			form.down('textfield[name=vol_wt]').setValue(sm.getSelection()[0].get('volwt'));
			form.down('combocity[name=dest]').focus(false, true);
		} else {
			Ext.Msg.alert('Внимание!', 'Выберите заказ');
		}
	},
	dblclickWebWbsGr: function (me, rec) {
		var sm = this.getWebWbsGrid().getSelectionModel();
		if (sm.getCount() > 0) {
			var w = Ext.widget('wbwin');
			w.setTitle('Редактирование веб накладной №:  ' + rec.get('wb_no'));
			var f = this.getWbForm();
			f.loadRecord(rec);
			var cb_org = f.down('combocity[name=org]');
			cb_org.store.load({
				params: {
					query: cb_org.getValue()
				}
			});
			cb_org.select(rec.data['s_city_id']);
			var cb_dest = f.down('combocity[name=dest]');
			cb_dest.store.load({
				params: {
					query: cb_dest.getValue()
				}
			});
			cb_dest.select(rec.data['r_city_id']);
			w.show();
		} else {
			Ext.Msg.alert('Выберите запись', 'Выберите запись для редактирования')
		}
	},
	loadWebWbGr: function () {
		var adTol = this.getAdmTool();
		if (adTol.down('label').text == 'WEB Администратор') {
			adTol.down('buttongroup[itemId=admgroup]').setVisible(true);
		}
		var btnList = adTol.down('button[action=list]');
		var btnTempl = adTol.down('button[action=templ]');
		btnList.setVisible(false);
		btnTempl.setVisible(false);
		var aTol = this.getWebWbsTool();
		var mo = aTol.down('combomonth').value;
		var ye = aTol.down('numyear').value;
		this.loadWebWbs(ye, mo);
	},
	saveWebWb: function (btn) {
		var me = this;
		var win = btn.up('wbwin');
		var form_ord = win.down('wbform');
		var org = form_ord.down('combocity[name=org]');
		var dest = form_ord.down('combocity[name=dest]');
		if (org.value == null) {
			var jsonArrayOrg = this.getCityStOrgStore().data.items;
			if (jsonArrayOrg.length == 0) {
				Ext.Msg.alert('Ошибка ввода города', 'Неверно введен город Отправителя! Выберите город из выпадающего списка.');
				return;
			};
			for (var i = 0; i < jsonArrayOrg.length; i++) {
				if (jsonArrayOrg[i].get('fname') == Ext.util.Format.trim(org.getValue())) {
					org.setValue(jsonArrayOrg[i].data.code);
					break;
				};
			};
			if (org.value == null) {
				Ext.Msg.alert('Ошибка ввода города', 'Неверно введен город Отправителя! Выберите город из выпадающего списка.');
				return;
			};
		}
		if (dest.value == null) {
			var jsonArrayDes = this.getCityStDesStore().data.items;
			if (jsonArrayDes.length == 0) {
				Ext.Msg.alert('Ошибка ввода города', 'Неверно введен город Получателя! Выберите город из выпадающего списка.');
				return;
			};
			for (var i = 0; i < jsonArrayDes.length; i++) {
				if (jsonArrayDes[i].get('fname') == Ext.util.Format.trim(dest.getValue())) {
					dest.setValue(jsonArrayDes[i].data.code);
					break;
				};
			};
			if (dest.value == null) {
				Ext.Msg.alert('Ошибка ввода города', 'Неверно введен город Получателя! Выберите город из выпадающего списка.');
				return;
			};
		}
		if (form_ord.getForm().isValid()) {
			form_ord.submit({
				url: 'srv/data.php',
				params: {
					dbAct: 'SetWebWB'
				},
				submitEmptyText: false,
				success: function (form, action) {
					form.reset();
					me.getWbForm().up('wbwin').close();
					me.loadWebWbGr();
					Ext.Msg.alert('Веб накладная сохранена!', action.result.msg);
				},
				failure: function (form, action) {
					Ext.Msg.alert('Веб накладная не сохранена!', action.result.msg);
				}
			});
		} else {
			Ext.Msg.alert('Не все поля заполнены', 'Откорректируйте информацию')
		}
	},
	printWB: function (btn) {
		var sm = this.getWebWbsGrid().getSelectionModel();
		if (sm.getCount() > 0) {
			window.open('srv/report.php?wbno=' + sm.getSelection()[0].get('wb_no'));
		} else {
			Ext.Msg.alert('Внимание!', 'Выберите запись в таблице');
		}
	},
	loadWebWbs: function (y, m) {
		var me = this;
		this.getWebWbStStore().load({
			params: {
				newPeriod: y + m
			},
			callback: function (records, operation, success) {
				var tt = me.getWebWbsTotal();
				var sumwt = 0;
				var sumvolwt = 0;
				records.forEach(function (record) {
					sumwt = sumwt + record.get('wt');
					sumvolwt = sumvolwt + record.get('vol_wt');
				});
				tt.down('label').setText('Количество накладных: ' + records.length + ' Сумма весов: ' + sumwt + ' Сумма объемных весов: ' + sumvolwt);
			}
		});
	},
	monthChange: function (comp, newz, oldz) {
		var aTol = comp.up('webwbstool');
		var ye = aTol.down('numyear').value;
		this.loadWebWbs(ye, newz);
	},
	yearChange: function (comp, newz, oldz) {
		var aTol = comp.up('webwbstool');
		var mo = aTol.down('combomonth').value;
		this.loadWebWbs(newz, mo);
	}
});
