Ext.define('FPAgent.controller.OrdsCont', {
	extend : 'Ext.app.Controller',
	views : ['orders.OrdGrid', 'orders.OrdWin', 'orders.WbNoWin', 'orders.WbNoForm'],
	models : ['OrdsMod', 'OrderMod', 'CityMod', 'AgentsMod'],
	stores : ['OrdsSt', 'aMonths', 'OrderSt', 'CityStOrg', 'CityStDes', 'TypeSt', 'AgentsSt'],
	refs : [{
			ref : 'OrdForm',
			selector : 'ordform'
		}, {
			ref : 'OrdTool',
			selector : 'ordtool'
		}, {
			ref : 'OrdTotal',
			selector : 'ordtotal'
		}, {
			ref : 'ComboCity',
			selector : 'combocity[name=org]'
		}, {
			ref : 'ComboCity',
			selector : 'combocity[name=dest]'
		}, {
			ref : 'OrdWin',
			selector : 'ordwin'
		}, {
			ref : 'AdmTool',
			selector : 'admtool'
		}, {
			ref : 'LoadFileForm',
			selector : 'loadfileform'
		}, {
			ref : 'WbNoWin',
			selector : 'wbnowin'
		}, {
			ref : 'WbNoForm',
			selector : 'wbnoform'
		}
	],
	init : function () {
		this.control({
			'ordgrid' : {
				activate : this.loadOrdGr
			},
			'ordgrid button[action=new]' : {
				click : this.openOrdWin
			},
			'ordgrid button[action=edit]' : {
				click : this.editOrdWin
			},
			'ordgrid button[action=view]' : {
				click : this.editOrdWin
			},
			'ordwin button[action=save]' : {
				click : this.saveOrder
			},
			'ordtool combomonth' : {
				change : this.monthChange
			},
			'ordtool numyear' : {
				change : this.yearChange
			},
			'loadfileform button[action=delete]' : {
				click : this.fileDel
			},
			'ordgrid > tableview' : {
				itemdblclick : this.dblclickOrdGr
			},
			'admtool comboagent' : {
				select : this.changeAgent
			},
			'ordtool button[action=excel]' : {
				click : this.exportExcel
			},
			'ordtool button[action=wbno]' : {
				click : this.editWbno
			},
			'wbnowin button[action=save]' : {
				click : this.saveWbno
			},
			'wbnoform textfield' : {
				keypress : this.pressEnter
			}
		});
		this.getOrderStStore().on({
			scope : this,
			load : this.loadOrdStore
		});
		this.getOrdsStStore().on({
			scope : this,
			load : this.loadOrdersSt
		});
	},
	pressEnter : function (fild, e) {
		var keyCode = e.getKey();
		if (keyCode == 13) {
			this.saveWbno(fild.up('wbnoform').up('wbnowin').down('button[action=save]'));
		}
	},
	saveWbno : function (btn) {
		var me = this;
		var win = btn.up('wbnowin');
		var form_wbno = win.down('wbnoform');
		if (form_wbno.getForm().isValid()) {
			form_wbno.submit({
				url : 'srv/data.php',
				params : {
					dbAct : 'SetWbno'
				},
				submitEmptyText : false,
				success : function (form, action) {
					form.reset();
					win.close();
					me.loadOrdGr();
				},
				failure : function (form, action) {
					Ext.Msg.alert('Номер накладной не сохранен!', action.result.msg);
				}
			});
		} else {
			Ext.Msg.alert('Нет номера накладной!', 'Откорректируйте информацию')
		}
	},
	editWbno : function (btn) {
		var sm = btn.up('ordgrid').getSelectionModel();
		if (sm.getCount() > 0) {
			var win = Ext.widget('wbnowin');
			win.show();
			var form = win.down('wbnoform');
			form.down('textfield[name=wbno]').setValue(sm.getSelection()[0].get('wb_no'));
			form.down('textfield[name=rordnum]').setValue(sm.getSelection()[0].get('rordnum'));
		} else {
			Ext.Msg.alert('Внимание!', 'Выберите заказ');
		}
	},
	exportExcel : function (btn) {
		var sm = btn.up('ordgrid').getSelectionModel();
		if (sm.getCount() > 0) {
			window.location.href = 'srv/getOrderXLS.php?ordnum=' + sm.getSelection()[0].get('rordnum');
		} else {
			Ext.Msg.alert('Внимание!', 'Выберите заказ для экспорта');
		}
	},
	changeAgent : function (comp, newValue) {
		var me = this;
		if (comp.up('mainpanel').activeTab.title == 'Заказы') {
			Ext.Ajax.request({
				url : 'srv/change.php',
				params : {
					agent : newValue[0].data['partcode']
				},
				success : function (response) {
					var text = Ext.decode(response.responseText);
					var aTol = me.getOrdTool();
					var ye = aTol.down('numyear').value;
					var mo = aTol.down('combomonth').value;
					me.loadOrds(ye, mo);
				},
				failure : function (response) {
					Ext.Msg.alert('Сервер недоступен!', response.statusText);
				}
			});
		}
	},
	loadOrds : function (y, m) {
		this.getOrdsStStore().load({
			params : {
				newPeriod : y + m
			}
		});
	},
	loadOrdGr : function () {
		var aTol = this.getOrdTool();
		var mo = aTol.down('combomonth').value;
		var ye = aTol.down('numyear').value;
		this.loadOrds(ye, mo);
	},
	openOrdWin : function (btn) {
		var edit = Ext.widget('ordwin');
		edit.show();
		var form_lf = edit.down('loadfileform');
		form_lf.down('filefield[name=uploadFile]').setVisible(true);
	},
	dblclickOrdGr : function (gr, rec) {
		var tt = this.getOrdTool();
		if (rec.data['status'] == 'заявлен') {
			var vbut = tt.down('button[action=edit]');
		} else {
			var vbut = tt.down('button[action=view]');
		}
		this.editOrdWin(vbut);
	},
	editOrdWin : function (btn) {
		var sm = btn.up('ordgrid').getSelectionModel();
		if (sm.getCount() > 0) {
			if ((sm.getSelection()[0].get('status') == 'заявлен' && btn.action == 'edit') || (btn.action == 'view')) {
				var win = Ext.create('FPAgent.view.orders.OrdWin').show();
				var store_ord = this.getOrderStStore().load({
						params : {
							id : sm.getSelection()[0].get('rordnum')
						}
					});
				if (btn.action == 'view') {
					win.down('button[action=save]').setVisible(false);
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
	saveOrder : function (btn) {
		var me = this;
		var win = btn.up('ordwin');
		var form_ord = win.down('ordform');
		var form_lf = win.down('loadfileform');
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
				url : 'srv/data.php',
				params : {
					dbAct : 'saveagorder'
				},
				submitEmptyText : false,
				success : function (form, action) {
					if (action.result.data[0].rordnum && form_lf.down('filefield[name=uploadFile]').getValue()) {
						if (form_lf.getForm().isValid()) {
							form_lf.submit({
								url : 'srv/upload.php',
								params : {
									act : 'ins',
									orderNum : action.result.data[0].rordnum
								},
								success : function (form, action) {
									form.reset();
									me.getOrdForm().up('ordwin').close();
									me.loadOrdGr();
									Ext.Msg.alert('Заказ сохранен!', action.result.msg);
								},
								failure : function (form, action) {
									form.reset();									
									me.getOrdForm().up('ordwin').close();
									me.loadOrdGr();
									Ext.Msg.alert('Файл не сохранен!', action.result.msg);
								}
							});
						}
					} else {
						form.reset();
						me.getOrdForm().up('ordwin').close();
						me.loadOrdGr();
						Ext.Msg.alert('Заказ сохранен!', action.result.msg);
					}
				},
				failure : function (form, action) {
					Ext.Msg.alert('Заказ не сохранен!', action.result.msg);
				}
			});
		} else {
			Ext.Msg.alert('Не все поля заполнены', 'Откорректируйте информацию')
		}
	},
	monthChange : function (comp, newz, oldz) {
		var aTol = comp.up('ordtool');
		var ye = aTol.down('numyear').value;
		this.loadOrds(ye, newz);
	},
	yearChange : function (comp, newz, oldz) {
		var aTol = comp.up('ordtool');
		var mo = aTol.down('combomonth').value;
		this.loadOrds(newz, mo);
	},
	fileDel : function (but) {
		var form_lf = but.up('loadfileform');
		var form_ord = this.getOrdForm();
		Ext.Ajax.request({
			url : 'srv/upload.php',
			params : {
				orderNum : form_ord.down('textfield[name=rordnum]').getValue(),
				act : 'del'
			},
			success : function (fp) {
				jData = Ext.decode(fp.responseText);
				form_lf.down('label[name=urlf]').setText('', false);
				form_lf.down('button[action=delete]').hide();
				form_lf.down('filefield[name=uploadFile]').show();
			},
			failure : function (response) {
				Ext.Msg.alert('error!');
			}
		});
	},
	loadOrdStore : function (st, rec, suc) {
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
			params : {
				query : cb_org.getValue()
			}
		});
		cb_org.select(rec[0].data['orgcode']);
		var cb_des = form_ord.down('combocity[name=dest]');
		cb_des.store.load({
			params : {
				query : cb_des.getValue()
			}
		});
		cb_des.select(rec[0].data['destcode']);
	},
	loadOrdersSt : function (st, rec, suc) {
		var tt = this.getOrdTotal();
		tt.down('label').setText('Количество заказов: ' + st.getCount());
	}
});
