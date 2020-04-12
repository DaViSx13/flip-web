Ext.define('fplk.controller.MnfCont', {
	extend : 'Ext.app.Controller',
	views : ['mainform.MnfGrid', 'mainform.MnfPanel', 'mainform.NumYear', 'mainform.ComboMonth', 'mainform.MainPanel', 'mainform.GroupTarifWin'],
	models : ['MnfMod', 'WbMod'],
	stores : ['MnfSt', 'aMonths', 'WbSt'],
	refs : [{
			ref : 'TotalTool',
			selector : 'totaltool'
		}, {
			ref : 'TotalWb',
			selector : 'totalwb'
		}, {
			ref : 'AdmTool',
			selector : 'admtool'
		}, {
			ref : 'MnfTool',
			selector : 'mnftool'
		}, {
		ref : 'GroupTarifWin',
		selector : 'grouptarifwin'
		}
	],
	init : function () {
		this.control({
			'mnfpanel' : {
				activate : this.loadMnf
			},
			'mainpanel' : {
				tabchange : this.gotoWb
			},
			'mnfgrid button[action=out]' : {
				click : this.openOutmnf
			},
			'mnfgrid button[action=in]' : {
				click : this.openInmnf
			},
			'mnfgrid button[action=all]' : {
				click : this.openAllmnf
			},
			'mnfgrid combomonth' : {
				change : this.monthChange
			},
			'mnfgrid numyear' : {
				change : this.yearChange
			},
			'mnfgrid' : {
				selectionchange : this.previewWb
			},
			'admtool comboagent' : {
				select : this.changeAgent
			},
			'admtool button[action=tariffs]' : {
				click : this.downloadTariffs
			},
			'admtool button[action=help]' : {
				click : this.showHelp
			},
			'admtool button[action=showGroupClac]' : {
				click : this.showGroupClac
			},
			'grouptarifwin button[action=upload]' : {
				click : this.uploadTarifCalculate
			},
			'grouptarifwin button[action=close]' : {
				click : this.closeWindow
			}
		});
		this.getMnfStStore().on({
			scope : this,
			load : this.loadMnfStore
		});
		this.getWbStStore().on({
			scope : this,
			load : this.loadWbStore
		});
	},
	changeAgent : function (comp, newValue) {
		var me = this;
		if (comp.up('mainpanel').activeTab.title == 'Манифесты') {
			Ext.Ajax.request({
				url : 'srv/change.php',
				params : {
					agent : newValue[0].data['partcode']
				},
				success : function (response) {
					var text = Ext.decode(response.responseText);
					var aTol = me.getMnfTool();
					if (aTol.down('button[action=out]').pressed == true) {
						var tab = -1
					};
					if (aTol.down('button[action=in]').pressed == true) {
						var tab = 2
					};
					if (aTol.down('button[action=all]').pressed == true) {
						var tab = 3
					};
					var mo = aTol.down('combomonth').value;
					var ye = aTol.down('numyear').value;
					me.loadMnfAll(ye, mo, tab);
				},
				failure : function (response) {
					Ext.Msg.alert('Сервер недоступен!', response.statusText);
				}
			});
			
		}
	},

	/**
	 * Закрытие окна.
	 * @param btn Кнопка 'Закрыть'
	 */
	closeWindow: function(btn) {
		btn.up('window').close();
	},

	/**
	 * Вывод окна расчета
	 * @param btn Кнопка 'Пакетный расчет'
	 */
	showGroupClac(btn) {
		var win = Ext.widget('grouptarifwin');
	},

	/**
	 * Обработка пакетного расчета.
	 * @param btn Кнопка 'Расчитать'
	 */
	uploadTarifCalculate: function(btn){
		var frm = btn.up('form');
		var fileField = frm.down('filefield');
		var fileName = fileField.value;
		if(fileName.includes(".xls") == true) {
			if (frm.getForm().isValid()){
				frm.getForm().submit({
					url		:location.href + '/srv/importTarifClaculate.php',
					headers : {'Content-Type': "application/vnd.ms-excel"},
					waitMsg : 'Обработка файла',
					params  : {
						action		:'getTarfGroupCalulate',
						isDocument	: frm.down('radiofield').inputValue
					},
					success : function(fp, output) {
						window.open(location.href + "/srv/importTarifClaculate.php?action=downloadCalculated&filename=" + output.result.link, '_parent');
						frm.up('window').close();
					},
					failure: function(form, action){
						Ext.Msg.alert('Ошибка при загрузке на сервер', 'При попытке загрузить данные на сервер произошла ошибка ' + action.result.msg);
					}
				});
			}
		} else {
			Ext.Msg.alert('Не верный тип файла', 'Требуется *.xls или *.xlsx');
		}

	},

	downloadTariffs : function (btn) {
		window.location.href = 'srv/downloadTariffs.php';
	},
	loadMnfAll : function (y, m, tab) {
		this.getMnfStStore().load({
			params : {
				//proc : 'GetMnf',
				period : y + m,
				is_Ready : tab
			}
		});
	},
	showHelp : function (btn) {
	//получаем ид активного таба
		var tab = btn.up('mainpanel').getActiveTab();
		var actIndex = tab.getId();
	//тут смотрим и сопоставляем название таба с названием раздела хелпа	
		var part = (actIndex.indexOf('wbsgrid')>-1)?'naklad':((actIndex.indexOf('ordspanel')>-1)?'zakaz':((actIndex.indexOf('mnfpane')>-1)?'manif':''));
	//если не подходит ни 1 из разделов, то ссыль просто на хелп в целом	
		var parthelp = (part!='')?('?'+part+'.html'):'';
		window.open('help/index.html'+parthelp);
	},
	loadMnf : function (ThePanel) {
		this.openOutmnf(ThePanel.down('button[action=out]'));
		if (this.getAdmTool().down('label').text == 'WEB Администратор'){
		this.getAdmTool().down('buttongroup[itemId=admgroup]').setVisible(true);		
		}
		this.getAdmTool().down('button[action=list]').setVisible(false);
		this.getAdmTool().down('button[action=templ]').setVisible(false);
	},
	openOutmnf : function (btn) {
		btn.toggle(true);
		var aTol = btn.up('mnftool');
		aTol.down('button[action=in]').toggle(false);
		aTol.down('button[action=all]').toggle(false);
		var mo = aTol.down('combomonth').value;
		var ye = aTol.down('numyear').value;
		this.loadMnfAll(ye, mo, -1);
	},
	openInmnf : function (btn) {
		btn.toggle(true);
		var aTol = btn.up('mnftool');
		aTol.down('button[action=out]').toggle(false);
		aTol.down('button[action=all]').toggle(false);
		var mo = aTol.down('combomonth').value;
		var ye = aTol.down('numyear').value;
		this.loadMnfAll(ye, mo, 2);
	},
	gotoWb : function (pan, ntab) {
		if (ntab.title == 'Накладные') {
			//console.log(ntab.title);
			//document.location.href = "../agent/work.php";
		}
		
	},
	openAllmnf : function (btn) {
		btn.toggle(true);
		var aTol = btn.up('mnftool');
		aTol.down('button[action=out]').toggle(false);
		aTol.down('button[action=in]').toggle(false);
		var mo = aTol.down('combomonth').value;
		var ye = aTol.down('numyear').value;
		this.loadMnfAll(ye, mo, 3);
	},
	monthChange : function (comp, newz, oldz) {
		var aTol = comp.up('mnftool');
		var ye = aTol.down('numyear').value;
		if (aTol.down('button[action=out]').pressed == true) {
			var tab = -1
		};
		if (aTol.down('button[action=in]').pressed == true) {
			var tab = 2
		};
		if (aTol.down('button[action=all]').pressed == true) {
			var tab = 3
		};
		this.loadMnfAll(ye, newz, tab);
	},
	yearChange : function (comp, newz, oldz) {
		var aTol = comp.up('mnftool');
		var mo = aTol.down('combomonth').value;
		if (aTol.down('button[action=out]').pressed == true) {
			var tab = -1
		};
		if (aTol.down('button[action=in]').pressed == true) {
			var tab = 2
		};
		if (aTol.down('button[action=all]').pressed == true) {
			var tab = 3
		};
		this.loadMnfAll(newz, mo, tab);
	},
	previewWb : function (gr, mnf) {
		if (gr.isSelected(mnf[0]) == true) {
			var No = mnf[0].data['mnfrefno'];
		} else {
			var No = null
		}
		this.getWbStStore().load({
			params : {
				mnfRefNo : No
			}
		});
	},
	loadMnfStore : function (st, rec, suc) {
		var tt = this.getTotalTool();
		
		tt.down('label').setText('Количество манифестов: ' + st.getCount());
		
	},
	loadWbStore : function (st, rec, suc) {
		var tt = this.getTotalWb();
		var sum_shpcs = 0;
		var sum_shwt = 0;
		var sum_shvol_wt = 0;
		for (var i = 0; i <= rec.length - 1; i++) {
			sum_shpcs += rec[i].data['shpcs'];
			sum_shwt += rec[i].data['shwt'];
			sum_shvol_wt += rec[i].data['shvol_wt'];
		}
		tt.down('label[itemId=lab1]').setText('Количество накладных: ' + st.getCount());
		tt.down('label[itemId=lab2]').setText('Количество мест: ' + sum_shpcs);
		tt.down('label[itemId=lab3]').setText('Общий вес: ' + Ext.util.Format.round(sum_shwt, 2));
		tt.down('label[itemId=lab4]').setText('Общий V вес: ' + Ext.util.Format.round(sum_shvol_wt, 2));
	}
});
