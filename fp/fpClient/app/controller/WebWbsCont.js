Ext.define('FPClient.controller.WebWbsCont', {
	extend : 'Ext.app.Controller',
	views : ['webwbs.WebWbsGrid', 'mainform.MainPanel', 'mainform.NumYear', 'mainform.ComboMonth', 'webwbs.WebWbsTool', 'orders.WbWin', 'orders.WbForm'],
	models : ['WebWbMod'],
	stores : ['WebWbSt'],
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
			}
		});
	},	
	dblclickWebWbsGr : function (me, rec) {
		var sm = this.getWebWbsGrid().getSelectionModel();
		if (sm.getCount() > 0) {
			//if (rec.get('active') > 0) {
				var w = Ext.widget('wbwin');
				w.setTitle('Редактирование:  ' + rec.get('wb_no'));
				w.show();
				var f = this.getWbForm();
				/*
				f.down('#changepass').show();
				f.down('textfield[name=passfirst]').disable();
				f.down('textfield[name=passsecond]').disable();*/

				f.loadRecord(rec);
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
