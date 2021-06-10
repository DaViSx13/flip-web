Ext.define('fplk.controller.WebWbsCont', {
	extend : 'Ext.app.Controller',
	views : ['orders.OrdsPanel', 'webwbs.WebWbsGrid', 'mainform.MainPanel', 'mainform.NumYear', 'mainform.ComboMonth', 'webwbs.WebWbsTool', 'webwbs.WbWin', 'webwbs.WbForm', 'webwbs.WebWbsTotal', 'orders.UseWebWbTplWin', 'orders.UseTemplForm'],
	models : ['WebWbMod', 'CityMod'],
	stores : ['WebWbSt', 'CityStOrg', 'CityStDes', 'TypeSt', 'TemplSt'],
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
		}, {
			ref : 'WebWbsTotal',
			selector : 'webwbstotal'
		}, {
			ref : 'UseTemplForm',
			selector : 'usetemplform'
		}, {
			ref : 'OrdsPanel',
			selector : 'ordspanel'
		}
	],
	init : function () {
		this.control({
			'webwbsgrid' : {
				activate : this.loadWebWbGr
			},
			'webwbstool > combomonth > button[name=periodRefresh]': {
				click: this.periodChange
			},
			'webwbsgrid > tableview' : {
				itemdblclick : this.dblclickWebWbsGr
			},
			'wbwin button[action=save]' : {
				click : this.saveWebWb
			},
			'ordgrid button[action=wbnew]' : {
				click : this.openWbWin
			},
			'webwbstool button[action=printwb]' : {
				click : this.printWB
			},
			'ordgrid button[action=wbnewtpl]' : {
				click : this.openWbWinTpl
			},
			'usewebwbtplwin button[action=setwb]' : {
				click : this.setWBTpl
			},
			'webwbstool button[action=exp]' : {
				click : this.exportExcel
			}
		});
	},

	exportExcel: function() {

		var dateFrom = this.getDateFromPeriodFilter()[0];
		var dateTo = this.getDateFromPeriodFilter()[1];

		window.location.href = 'srv/getLKWbsXLS.php?bdate=' + dateFrom + '&edate=' + dateTo;
	},

	/**
	 * Получает введенный период.
	 * @returns {[*, *]} Период от и до
	 */
	getDateFromPeriodFilter: function() {
		var panel = this.getWebWbsTool();
		var fromDate = panel.down('datefield[name=fromDate]').getValue();
		var toDate = panel.down('datefield[name=toDate]').getValue();
		return [
			Ext.Date.format(fromDate, 'Ymd'),
			Ext.Date.format(toDate, 'Ymd')];
	},

	/**
	 * Выполняет запрос на клиентские заказы.
	 */
	periodChange: function() {
		this.loadWebWbs();
	},

	openWbWin : function (btn) {		
		var sm = btn.up('ordgrid').getSelectionModel();
		if (sm.getCount() > 0) {
			var edit = Ext.widget('wbwin');
			edit.show();
			var form = edit.down('wbform');
			
			form.down('textfield[name=ord_no]').setValue(sm.getSelection()[0].get('rordnum'));			
			 
				var cb_org = form.down('combocity[name=org]');
				cb_org.setValue(sm.getSelection()[0].get('orgcity'));
				cb_org.store.load({
					params : {
						query : cb_org.getValue()
					}
				});
				cb_org.select(sm.getSelection()[0].get('org'));
				
			form.down('textfield[name=s_co]').setValue(sm.getSelection()[0].get('cname'));
			form.down('textfield[name=s_adr]').setValue(sm.getSelection()[0].get('s_adr'));
			form.down('textfield[name=s_name]').setValue(sm.getSelection()[0].get('s_name'));
			form.down('textfield[name=s_mail]').setValue(sm.getSelection()[0].get('s_mail'));
			form.down('textfield[name=s_tel]').setValue(sm.getSelection()[0].get('s_tel'));
			form.down('combobox[name=type]').setValue(sm.getSelection()[0].get('type'));
			form.down('textfield[name=pcs]').setValue(1);
			form.down('textfield[name=wt]').setValue(0.1);
			form.down('textfield[name=vol_wt]').setValue(sm.getSelection()[0].get('volwt'));
			//form.down('radiofield[name=payr]').setRawValue(1);
			//form.down('radiofield[name=metpaym]').setRawValue(1);
			
			form.down('combocity[name=dest]').focus(false, true);
			
		} else {
			Ext.Msg.alert('Внимание!', 'Выберите заказ');
		}	
	},
	openWbWinTpl : function (btn) {
		var sm = btn.up('ordgrid').getSelectionModel();
		if (sm.getCount() > 0) {
		if (this.getTemplStStore().getCount() > 0) {
			var win = Ext.widget('usewebwbtplwin');
			win.show();
			win.down('usetemplform').down('combobox[name=tplname]').focus(false, true);
		} else {
			Ext.Msg.alert('Запрещено!', 'У Вас нет шаблонов!');
		}
		} else {
			Ext.Msg.alert('Внимание!', 'Выберите заказ');
			}	
	},
	setWBTpl : function (btn) {
		var tplform = this.getUseTemplForm();
		if (tplform.getForm().isValid()) {
			var sm = this.getOrdsPanel().down('ordgrid').getSelectionModel();
			
			
				var record = this.getTemplStStore().findRecord('id', tplform.down('combobox[name=tplname]').getValue());
				tplform.getForm().reset();
				tplform.up('usewebwbtplwin').close();
				var win = Ext.widget('wbwin');
				var form = win.down('wbform');
			
			
				var cb_des = form.down('combocity[name=dest]');
				cb_des.store.load({
					params : {
						query : cb_des.getValue()
					}
				});
				if (record.data['destcode']>0){
				cb_des.select(record.data['destcode']);
				}
			
				form.down('textfield[name=ord_no]').setValue(sm.getSelection()[0].get('rordnum'));			
			 
				var cb_org = form.down('combocity[name=org]');
				cb_org.setValue(sm.getSelection()[0].get('orgcity'));
				cb_org.store.load({
					params : {
						query : cb_org.getValue()
					}
				});
				if (sm.getSelection()[0].get('org')>0){
				cb_org.select(sm.getSelection()[0].get('org'));
				}
				form.down('textfield[name=s_co]').setValue(sm.getSelection()[0].get('cname'));
				form.down('textfield[name=s_adr]').setValue(sm.getSelection()[0].get('s_adr'));
				form.down('textfield[name=s_name]').setValue(sm.getSelection()[0].get('s_name'));
				form.down('textfield[name=s_mail]').setValue(sm.getSelection()[0].get('s_mail'));
				form.down('textfield[name=s_tel]').setValue(sm.getSelection()[0].get('s_tel'));
				form.down('combobox[name=type]').setValue(sm.getSelection()[0].get('type'));
				form.down('textfield[name=pcs]').setValue(sm.getSelection()[0].get('packs'));
				form.down('textfield[name=wt]').setValue(sm.getSelection()[0].get('wt'));
				form.down('textfield[name=vol_wt]').setValue(sm.getSelection()[0].get('volwt'));
				
				form.down('textfield[name=r_co]').setValue(record.data['dname']);
				form.down('textfield[name=r_adr]').setValue(record.data['dadr']);
				form.down('textfield[name=r_name]').setValue(record.data['dcontname']);
				form.down('textfield[name=r_mail]').setValue(record.data['dcontmail']);
				form.down('textfield[name=r_tel]').setValue(record.data['dcontphone']);
				form.down('textfield[name=r_ref]').setValue(record.data['destrems']);
				//form.down('radiofield[name=payr]').setRawValue(1);
				//form.down('radiofield[name=metpaym]').setRawValue(1);
			
		}
	},
	dblclickWebWbsGr : function (me, rec) {
		var sm = this.getWebWbsGrid().getSelectionModel();
		if (sm.getCount() > 0) {
		
				var w = Ext.widget('wbwin');
				w.setTitle('Редактирование веб накладной №:  ' + rec.get('wb_no'));		

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
			
				w.show();
			
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
		this.loadWebWbs();
		
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
	printWB : function () {
		var targetWebNums = "";
		var sm = this.getWebWbsGrid().getSelectionModel().getSelection();
		Ext.Array.each(sm, function(record) {
			targetWebNums += record.data.wb_no + ","
		});

		targetWebNums = targetWebNums.substring(0, targetWebNums.length - 1);
		if(targetWebNums.split(',').length > 50) {
			Ext.Msg.alert('Превышение количества веб накладных', 'Выберите меньшее количество веб накладных для печати');
			return;
		}
		
		if(targetWebNums.length == 0) {
			Ext.Msg.alert('Не выбрана веб накладная', 'Выберите одну или несколько записей в таблице');
			return;
		}
		window.open(
			window.location.href +
			'srv' +
			'/WebWbsGroupReport.php' +
			'?wbNo=' + targetWebNums, "_blank");
	},

	loadWebWbs : function () {
		var me = this;
		var period = this.getDateFromPeriodFilter()
		this.getWebWbStStore().load({
			params : {
				from: period[0],
				to: period[1]
			},
			callback: function(records, operation, success) {
				var tt = me.getWebWbsTotal();
				var sumwt = 0;
				var sumvolwt = 0;

				records.forEach(function(record) {					
					sumwt = sumwt + record.get('wt');
					sumvolwt =  sumvolwt + record.get('vol_wt');
				});
				tt.down('label').setText('Количество накладных: ' + records.length + ' Сумма весов: '+ sumwt+' Сумма объемных весов: '+sumvolwt);
			}
		});

	}

	});
