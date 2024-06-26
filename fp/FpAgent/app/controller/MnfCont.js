Ext.define('FPAgent.controller.MnfCont', {
	extend : 'Ext.app.Controller',
	views : ['mainform.MnfGrid', 'mainform.MnfPanel', 'mainform.NumYear', 'mainform.ComboMonth', 'mainform.MainPanel', 'mainform.TokenWin', 'mainform.TokenForm', 'mainform.MnfTool'],
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
			ref : 'TokenForm',
			selector : 'tokenform'
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
			'mnfgrid combomonth button[name=periodRefresh]' : {
				click : this.periodChange
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
			'admtool button[action=help]' : {
				click : this.showHelp
			},
			'admtool button[action=tariffs]' : {
				click : this.downloadTariffs
			},
			'admtool menuitem[action=tariff_Gold]' : {
				click : this.downloadTariffsGold
			},
			'admtool menuitem[action=tariff_Silver]' : {
				click : this.downloadTariffsSilver
			},
			'admtool menuitem[action=tariff_Bronze]' : {
				click : this.downloadTariffsBronze
			},
			'admtool menuitem[action=tariff_instruction]' : {
				click : this.downloadTariffsInstruction
			},
			'admtool button[action=token]' : {
				click : this.loadTokenWin
			},
			'tokenwin button[action=settoken]' : {
				click : this.setToken
			},
			'mnftool button[action=excel]' : {
				click : this.exportExcel
			},
			'tokenwin button[action=help]' : {
				click : this.showAPIHelp
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

	/**
	 * Загрузка золотого тарифа
	 */
	downloadTariffsGold: function () {
		window.open('srv/export/gold.xlsx', '_blank').focus();
	},

	/**
	 * Загрузка серебрянного тарифа
	 */
	downloadTariffsSilver: function () {
		window.open('srv/export/silver.xlsx', '_blank').focus();
	},

	/**
	 * Загрузка бронзового тарифа
	 */
	downloadTariffsBronze: function () {
		window.open('srv/export/bronze.xlsx', '_blank').focus();
	},


	/**
	 * Загрузка инструкции в тарифе
	 */
	downloadTariffsInstruction: function () {
		window.open('srv/export/instruction.pdf', '_blank').focus();
	},


	/**
	 * Получает период из фильтров даты.
	 * @returns {[*, *]} Период
	 */
	getPeriodFromPickers: function() {
		var target = this.getMnfTool();
		var fromDate = target.down('datefield[name=fromDate]').getValue();
		var toDate = target.down('datefield[name=toDate]').getValue();

		return [Ext.Date.format(fromDate, 'Ymd'), Ext.Date.format(toDate, 'Ymd')]
	},

	periodChange: function() {
		var aTol = this.getMnfTool();
		if (aTol.down('button[action=out]').pressed == true) {
			var tab = -1
		};
		if (aTol.down('button[action=in]').pressed == true) {
			var tab = 2
		};
		if (aTol.down('button[action=all]').pressed == true) {
			var tab = 3
		};

		var period = this.getPeriodFromPickers(aTol);
		this.loadMnfAllByPeriod(period[0], period[1], tab);
	},


	changeAgent : function (comp, newValue) {
		var me = this;
		if (comp.up('mainpanel').activeTab.title == FPAgent.lib.Translate.tr("MainPanel.mnfpanel")/*'Манифесты'*/
		)
		{
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
					var period = this.getPeriodFromPickers();
					me.loadMnfAllByPeriod(period[0], period[1], tab);
				},
				failure : function (response) {
					Ext.Msg.alert(FPAgent.lib.Translate.tr("ServerdDown")/*'Сервер недоступен!'*/
					, response.statusText);
				}
			});

		}
	},
	exportExcel : function (btn) {		
		var sm = btn.up('mnfgrid').getSelectionModel();
		if (sm.getCount() > 0) {
			
		window.location.href = 'srv/exportMnf.php?se=' + window.location.hash.replace("#", "") + '&mnfRefNo=' + sm.getSelection()[0].get('mnfrefno');
		
		} else {
			Ext.Msg.alert(FPAgent.lib.Translate.tr("UsersCont.SelectRecord")/*'Выберите запись'*/, FPAgent.lib.Translate.tr("UsersCont.RecordNotSelect")/*'Запись не выбрана'*/);
		}
	},
	loadTokenWin : function (btn) {
		var win = Ext.widget('tokenwin').show();
		Ext.Ajax.request({
			url : 'srv/data.php',
			params : {
				dbAct : 'GetToken',
				se : window.location.hash.replace("#", "")
			},
			success : function (response) {
				var text = Ext.decode(response.responseText);
				var form = win.down('tokenform');
				if (text.data[0].atoken != null) {
					form.down('textfield[name=atoken]').setValue(text.data[0].atoken);
				}
			},
			failure : function (response) {
				Ext.Msg.alert(FPAgent.lib.Translate.tr("ServerdDown"), response.statusText);
			}
		});

	},
	setToken : function (btn) {
		var form = this.getTokenForm();
		Ext.Msg.confirm("Перевыпуск ключа", "Внимание! АПИ будет работать только с новым ключем!", function (btnText) {
			if (btnText === "yes") {
				Ext.Ajax.request({
					url : 'srv/data.php',
					params : {
						dbAct : 'SetToken',
						se : window.location.hash.replace("#", "")
					},
					success : function (response) {
						var text = Ext.decode(response.responseText);
						if (text.data[0].atoken != null) {
							form.down('textfield[name=atoken]').setValue(text.data[0].atoken);
						}
					},
					failure : function (response) {
						Ext.Msg.alert(FPAgent.lib.Translate.tr("ServerdDown"), response.statusText);
					}
				});

			}
		}, this);

	},
	loadMnfAll : function (y, m, tab) {
		this.getMnfStStore().load({
			params : {
				period : y + m,
				is_Ready : tab,
				se : window.location.hash.replace("#", "")
			}
		});
	},


	/**
	 * Загрузка хранилища по датам.
	 * @param start Стартовая дата
	 * @param end Конечная дата
	 * @param tab Вкоадка
	 */
	loadMnfAllByPeriod : function (start, end, tab) {
		this.getMnfStStore().load({
			params : {
				from : start,
				to: end,
				is_Ready : tab,
				se : window.location.hash.replace("#", "")
			}
		});
	},

	showAPIHelp : function (btn) {	
		window.open('help/index.html?api.html');
	},
	showHelp : function (btn) {
		//получаем ид активного таба
		var tab = btn.up('mainpanel').getActiveTab();
		var actIndex = tab.getId();
		//тут смотрим и сопоставляем название таба с названием раздела хелпа
		var part = (actIndex.indexOf('wbsgrid') > -1) ? 'naklad' : ((actIndex.indexOf('ordspanel') > -1) ? 'zakaz' : ((actIndex.indexOf('mnfpane') > -1) ? 'manif' : ''));
		//если не подходит ни 1 из разделов, то ссыль просто на хелп в целом
		var parthelp = (part != '') ? ('?' + part + '.html') : '';
		window.open('help/index.html' + parthelp);
	},
	downloadTariffs : function (btn) {
		window.location.href = 'srv/downloadTariffs.php?se=' + window.location.hash.replace("#", "");
	},
	loadMnf : function (ThePanel) {
		this.openOutmnf(ThePanel.down('button[action=out]'));
		if (this.getAdmTool().down('label').text == 'WEB Администратор') {
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
		var period = this.getPeriodFromPickers();
		this.loadMnfAllByPeriod(period[0], period[1], -1);
	},
	openInmnf : function (btn) {
		btn.toggle(true);
		var aTol = btn.up('mnftool');
		aTol.down('button[action=out]').toggle(false);
		aTol.down('button[action=all]').toggle(false);
		var period = this.getPeriodFromPickers();
		this.loadMnfAllByPeriod(period[0], period[1], 2);
	},
	gotoWb : function (pan, ntab) {
		if (ntab.title == /*'Накладные'*/
			FPAgent.lib.Translate.tr("MainPanel.wbsgrid")) {
			//console.log(ntab.title);
			//document.location.href = "../agent/work.php";
		}

	},
	openAllmnf : function (btn) {
		btn.toggle(true);
		var aTol = btn.up('mnftool');
		aTol.down('button[action=out]').toggle(false);
		aTol.down('button[action=in]').toggle(false);
		var period = this.getPeriodFromPickers();
		this.loadMnfAllByPeriod(period[0], period[1], 3);
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
				mnfRefNo : No,
				se : window.location.hash.replace("#", "")
			}
		});
	},
	loadMnfStore : function (st, rec, suc) {
		var tt = this.getTotalTool();
		tt.down('label').setText(FPAgent.lib.Translate.tr("MnfCont.MnfCount")/*'Количество манифестов: '*/
			 + st.getCount());

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
		tt.down('label[itemId=lab1]').setText(FPAgent.lib.Translate.tr("MnfCont.WbCount")/*'Количество накладных: '*/
			 + st.getCount());
		tt.down('label[itemId=lab2]').setText(FPAgent.lib.Translate.tr("MnfCont.ShpcsCount")/*'Количество мест: '*/
			 + sum_shpcs);
		tt.down('label[itemId=lab3]').setText(FPAgent.lib.Translate.tr("MnfCont.Shwt")/*'Общий вес: '*/
			 + Ext.util.Format.round(sum_shwt, 2));
		tt.down('label[itemId=lab4]').setText(FPAgent.lib.Translate.tr("MnfCont.Shvol_wt")/*'Общий V вес: '*/
			 + Ext.util.Format.round(sum_shvol_wt, 2));
	}
});
