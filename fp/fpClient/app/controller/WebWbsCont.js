Ext.define('FPClient.controller.WebWbsCont', {
	extend : 'Ext.app.Controller',
	views : ['webwbs.WebWbsGrid', 'mainform.MainPanel', 'mainform.NumYear', 'mainform.ComboMonth', 'webwbs.WebWbsTool', 'webwbs.WbWin', 'webwbs.WbForm'],
	models : ['WebWbMod', 'CityMod'],
	stores : ['WebWbSt', 'CityStOrg', 'CityStDes', 'TypeSt'],
	refs : [ 
		{
			ref : 'WebWbsGrid',
			selector : 'webwbsgrid'
		}, {
			ref : 'WebWbsTool',
			selector : 'webwbstool'
		}, {
			ref : 'AdmTool',
			selector : 'admtool'
		}, {
			ref : 'WbWin',
			selector : 'wbwin'
		}, {
			ref : 'WbForm',
			selector : 'wbform'
		}, {
			ref : 'ComboCity',
			selector : 'combocity[name=org]'
		}, {
			ref : 'ComboCity',
			selector : 'combocity[name=dest]'
		}
	],
	init : function () {
		this.control({
			'webwbsgrid' : {
				activate : this.loadWebWbGr
			},
			'webwbstool combomonth' : {
				change : this.monthChange
			},
			'webwbstool numyear' : {
				change : this.yearChange
			},
			'webwbsgrid > tableview' : {
				itemdblclick : this.dblclickWebWbsGr
			},
			'wbwin button[action=save]' : {
				click : this.saveWebWb
			},
			'ordgrid button[action=wbnew]' : {
				click : this.openWbWin
			}
		});
	},
	openWbWin : function (btn) {
		var edit = Ext.widget('wbwin');
		edit.show();		
		edit.down('wbform').down('combocity[name=dest]').focus(false, true);		
	},
	dblclickWebWbsGr : function (me, rec) {
		var sm = this.getWebWbsGrid().getSelectionModel();
		if (sm.getCount() > 0) {
			//if (rec.get('active') > 0) {
				var w = Ext.widget('wbwin');
				w.setTitle('Редактирование:  ' + rec.get('wb_no'));
				
				
				/*
				f.down('#changepass').show();
				f.down('textfield[name=passfirst]').disable();
				f.down('textfield[name=passsecond]').disable();*/

				var f = this.getWbForm();
				f.loadRecord(rec);
				
				var cb_org = f.down('combocity[name=org]');
				cb_org.store.load({
					params : {
						query : cb_org.getValue()
					}
				});
				
				cb_org.select(rec.data['s_city_id']);
				var cb_dest = f.down('combocity[name=dest]');
				cb_dest.store.load({
					params : {
						query : cb_dest.getValue()
					}
				});
				
				cb_dest.select(rec.data['r_city_id']);
				//console.log(rec);
				w.show();
				
				//f.down('textfield[name=agents]').setReadOnly(true);
			/*} else {
				Ext.Msg.alert('Запись блокирована', 'Разблокируйте запись перед внесением корректировок')
			}*/
		} else {
			Ext.Msg.alert('Выберите запись', 'Выберите запись для редактирования')
		}
	},
	loadWebWbGr : function () {
		var adTol = this.getAdmTool();
		if (adTol.down('label').text == 'WEB Администратор') {
			adTol.down('buttongroup[itemId=admgroup]').setVisible(true);
		}
		var btnList = adTol.down('button[action=list]');
		var btnTempl = adTol.down('button[action=templ]');
		btnList.setVisible(false);
		btnTempl.setVisible(false);
		//this.clkList(btnList);
		var aTol = this.getWebWbsTool();
		var mo = aTol.down('combomonth').value;
		var ye = aTol.down('numyear').value;
		this.loadWebWbs(ye, mo);
		
	},
	saveWebWb : function (btn) {
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
				url : 'srv/data.php',
				params : {
					dbAct : 'SetWebWB'
				},
				submitEmptyText : false,
				success : function (form, action) {
					
						form.reset();
						me.getWbForm().up('wbwin').close();
						me.loadWebWbGr();
						Ext.Msg.alert('Веб накладная сохранена!', action.result.msg);
					
				},
				failure : function (form, action) {
					Ext.Msg.alert('Веб накладная не сохранена!', action.result.msg);
				}
			});
		} else {
			Ext.Msg.alert('Не все поля заполнены', 'Откорректируйте информацию')
		}
	},
	loadWebWbs : function (y, m) {
		this.getWebWbStStore().load({
			params : {
				newPeriod : y + m
			}
		});
	},
	monthChange : function (comp, newz, oldz) {
		var aTol = comp.up('webwbstool');
		var ye = aTol.down('numyear').value;
		this.loadWebWbs(ye, newz);
	},
	yearChange : function (comp, newz, oldz) {
		var aTol = comp.up('webwbstool');
		var mo = aTol.down('combomonth').value;
		this.loadWebWbs(newz, mo);
	},
	});
