Ext.define('FPAgent.controller.WbsCont', {
	extend : 'Ext.app.Controller',
	views : ['wbs.WbsGrid', 'wbs.NewPodWin', 'wbs.NewExWin', 'wbs.ViewExWin', 'wbs.NewDopWin'],
	models : ['WbsMod', 'ExCodeMod', 'ViewExMod'],
	stores : ['WbsStore', 'aMonths', 'ExCodeStore', 'ViewExStore'],
	refs : [{
			ref : 'WbsTool',
			selector : 'wbstool'
		}, {
			ref : 'NewDopWin',
			selector : 'newdopwin'
		}, {
			ref : 'NewExWin',
			selector : 'newexwin'
		}, {
			ref : 'NewPodWin',
			selector : 'newpodwin'
		}, {
			ref : 'WbsTotal',
			selector : 'wbstotal'
		}, {
			ref : 'WbFilter',
			selector : 'wbstool > textfield[name=filteredit]'
		}, {
			ref : 'AdmTool',
			selector : 'admtool'
		}, {
			ref : 'ViewExGrid',
			selector : 'viewexgrid'
		}
	],
	init : function () {
		this.control({
			'wbsgrid' : {
				activate : this.loadWbsGrid
			},
			'wbsgrid button[action=all]' : {
				click : this.allWbs
			},
			'wbsgrid button[action=out]' : {
				click : this.outWbs
			},
			'wbsgrid button[action=in]' : {
				click : this.inWbs
			},
			'wbsgrid button[action=overdue]' : {
				click : this.overdueWbs
			},
			'wbsgrid button[action=pod]' : {
				click : this.newPod
			},
			'wbsgrid button[action=ex]' : {
				click : this.newEx
			},
			'wbstool button[action=excel]' : {
				click : this.exportExcel
			},
			'newdopwin button[action=save]' : {
				click : this.saveDop
			},
			'newexwin button[action=save]' : {
				click : this.saveEx
			},
			'newpodwin button[action=save]' : {
				click : this.savePod
			},
			'wbstool combomonth' : {
				change : this.monthChange
			},
			'wbstool numyear' : {
				change : this.yearChange
			},
			'wbsgrid actioncolumn' : {
				itemclick : this.viewEx
			},
			'wbsgrid numbercolumn[itemId=dop]' : {
				click : this.showDop
			},
			'wbstool button[action=filter]' : {
				click : this.filterGrid
			},
			'admtool comboagent' : {
				select : this.changeAgent
			}
		});
		this.getWbsStoreStore().on({
			scope : this,
			beforeprefetch : this.beforeprefetchWbsStore
		});
		this.getWbsStoreStore().on({
			scope : this,
			beforeload : this.beforeloadWbsStore
		});
		this.getViewExStoreStore().on({
			scope : this,
			load : this.loadViewExStore
		});
	},
	loadViewExStore : function () {
		this.getViewExGrid().getSelectionModel().select(0);
	},
	changeAgent : function (comp, newValue) {
		var me = this;
		if (comp.up('mainpanel').activeTab.title == 'Накладные') {
			Ext.Ajax.request({
				url : 'srv/change.php',
				params : {
					agent : newValue[0].data['partcode']
				},
				success : function (response) {
					var text = Ext.decode(response.responseText);
					me.loadWbs();
					me.viewTotal();
				},
				failure : function (response) {
					Ext.Msg.alert('Сервер недоступен!', response.statusText);
				}
			});
		}
	},
	filterGrid : function () {
		if (this.getWbFilter().getValue()) {
			this.getWbsStoreStore().clearFilter(true);
			this.getWbsStoreStore().filter('wb_no', this.getWbFilter().getValue());
			this.viewTotal();
		} else {
			this.getWbsStoreStore().clearFilter();
			this.viewTotal();
		}
	},
	editDop : function (d_wb_no, d_dtd_txt, d_tar_ag_id, d_req_tar_a, d_req_rem) {
		if (d_wb_no && d_dtd_txt && d_tar_ag_id && d_req_tar_a) {
			var newdop = Ext.widget('newdopwin').show();
			var formdop = newdop.down('newdopform');
			formdop.down('textfield[name=wb_no]').setValue(d_wb_no);
			formdop.down('textfield[name=dtd_txt]').setValue(d_dtd_txt);
			formdop.down('textfield[name=interid]').setValue(d_tar_ag_id);
			formdop.down('textfield[name=tar_a_ag]').setValue(d_req_tar_a);
			formdop.down('textfield[name=rem_ag]').setValue(d_req_rem);
		} else {
			Ext.Msg.alert('Запрещено!', 'Для этой накладной нельзя редактировать Доп. тариф');
		}
	},
	showDop : function (gridview, el, rowIndex, colIndex, e, rec, rowEl) {
		if (!rec.data['req_tar_a']) {
			this.insertNewDop(rec.data['wb_no'], rec.data['dtd_txt'], rec.data['tar_ag_id'], rec.data['req_tar_a']);
		} else {
			this.editDop(rec.data['wb_no'], rec.data['dtd_txt'], rec.data['tar_ag_id'], rec.data['req_tar_a'], rec.data['req_rem'])
		}
	},
	getPeriod : function () {
		var m = this.getWbsTool().down('combomonth').value;
		var y = this.getWbsTool().down('numyear').value;
		return y + m + '01';
	},
	viewTotal : function () {
		var tc = this;
		var twt = tc.getWbsTotal();
		if (this.getWbsStoreStore().filters.length == 0) {
			switch (true) {
			case this.getWbsTool().down('button[action=all]').pressed:
				var t_dir = 'all';
				break;
			case this.getWbsTool().down('button[action=in]').pressed:
				var t_dir = 'in';
				break;
			case this.getWbsTool().down('button[action=out]').pressed:
				var t_dir = 'out';
				break;
			case this.getWbsTool().down('button[action=overdue]').pressed:
				var t_dir = 'ove';
				break;
			}
			Ext.Ajax.request({
				url : 'srv/data.php',
				params : {
					dbAct : 'GetWbsTotal',
					dir : t_dir,
					period : tc.getPeriod()
				},
				success : function (response) {
					var text = Ext.decode(response.responseText);
					twt.down('label[itemId=lab1]').setText('Всего: ' + text.data[0].s_wb);
					twt.down('label[itemId=lab2]').setText('Вес: ' + text.data[0].s_wt);
					twt.down('label[itemId=lab3]').setText('V вес: ' + text.data[0].s_vol_wt);
					twt.down('label[itemId=lab4]').setText('тар флип баз: ' + text.data[0].s_flip_b);
					twt.down('label[itemId=lab5]').setText('тар флип доп: ' + text.data[0].s_flip_a);
					twt.down('label[itemId=lab6]').setText('тар флип всего: ' + text.data[0].s_flip_t);
					twt.down('label[itemId=lab7]').setText('тар аг баз: ' + text.data[0].s_ag_b);
					twt.down('label[itemId=lab8]').setText('тар аг доп: ' + text.data[0].s_ag_a);
					twt.down('label[itemId=lab9]').setText('тар аг всего: ' + text.data[0].s_ag_t);
				}
			});
		} else {
			twt.down('label[itemId=lab1]').setText('');
			twt.down('label[itemId=lab2]').setText('');
			twt.down('label[itemId=lab3]').setText('');
			twt.down('label[itemId=lab4]').setText('');
			twt.down('label[itemId=lab5]').setText('');
			twt.down('label[itemId=lab6]').setText('');
			twt.down('label[itemId=lab7]').setText('');
			twt.down('label[itemId=lab8]').setText('');
			twt.down('label[itemId=lab9]').setText('');
		}
	},
	savePod : function (btn) {
		var me = this;
		var win = btn.up('newpodwin');
		var form_pod = win.down('newpodform');
		if (form_pod.getForm().isValid()) {
			form_pod.submit({
				url : 'srv/data.php',
				params : {
					dbAct : 'SetPOD'
				},
				submitEmptyText : false,
				success : function (form, action) {
					if (action.result.success == true) {
						Ext.Msg.alert('ПОД сохранено!', action.result.msg);
						var rec_pod = me.getWbsStoreStore().findRecord('wb_no', form_pod.getValues()['wb_no']);
						rec_pod.set('dod_txt', form_pod.getValues()['p_d_in'] + ' ' + form_pod.getValues()['tdd']);
						rec_pod.set('rcpn', form_pod.getValues()['rcpn']);
						var dtd = new Date();
						rec_pod.set('p_d_in', dtd);
						form.reset();
						me.getNewPodWin().close();
					}
				},
				failure : function (form, action) {
					Ext.Msg.alert('ПОД не сохранено!', action.result.msg);
				}
			});
		} else {
			Ext.Msg.alert('Не все поля заполнены', 'Откорректируйте информацию')
		}
	},
	saveEx : function (btn) {
		var me = this;
		var win = btn.up('newexwin');
		var form_ex = win.down('newexform');
		if (form_ex.getForm().isValid()) {
			form_ex.submit({
				url : 'srv/data.php',
				params : {
					dbAct : 'NewEx'
				},
				submitEmptyText : false,
				success : function (form, action) {
					if (action.result.success == true) {
						Ext.Msg.alert('Происшествие сохранено!', action.result.msg);
						var rec_ex = me.getWbsStoreStore().findRecord('wb_no', form_ex.getValues()['wb_no']);
						rec_ex.set('is_ex', 1);
						form.reset();
						me.getNewExWin().close();
					}
				},
				failure : function (form, action) {
					Ext.Msg.alert('Происшествие не сохранено!', action.result.msg);
				}
			});
		} else {
			Ext.Msg.alert('Не все поля заполнены', 'Откорректируйте информацию')
		}
	},
	saveDop : function (btn) {
		var me = this;
		var win = btn.up('newdopwin');
		var form_dop = win.down('newdopform');
		if (form_dop.getForm().isValid()) {
			form_dop.submit({
				url : 'srv/data.php',
				params : {
					dbAct : 'SetTar_a_ag'
				},
				submitEmptyText : false,
				success : function (form, action) {
					if (action.result.success == true) {
						Ext.Msg.alert('Доп. тариф сохранен!', action.result.msg);
						var rec_dop = me.getWbsStoreStore().findRecord('wb_no', form_dop.getValues()['wb_no']);
						rec_dop.set('req_tar_a', form_dop.getValues()['tar_a_ag']);
						rec_dop.set('req_rem', form_dop.getValues()['rem_ag']);
						form.reset();
						me.getNewDopWin().close();
					}
				},
				failure : function (form, action) {
					Ext.Msg.alert('Доп. тариф не сохранен!', action.result.msg);
				}
			});
		} else {
			Ext.Msg.alert('Не все поля заполнены', 'Откорректируйте информацию')
		}
	},
	insertNewDop : function (d_wb_no, d_dtd_txt, d_tar_ag_id, d_req_tar_a) {
		if (d_wb_no && d_dtd_txt && d_tar_ag_id && !d_req_tar_a) {
			var newdop = Ext.widget('newdopwin').show();
			var formdop = newdop.down('newdopform');
			formdop.down('textfield[name=wb_no]').setValue(d_wb_no);
			formdop.down('textfield[name=dtd_txt]').setValue(d_dtd_txt);
			formdop.down('textfield[name=interid]').setValue(d_tar_ag_id);
		} else {}

	},
	exportExcel : function (btn) {
		switch (true) {
		case this.getWbsTool().down('button[action=all]').pressed:
			var t_dir = 'all';
			break;
		case this.getWbsTool().down('button[action=in]').pressed:
			var t_dir = 'in';
			break;
		case this.getWbsTool().down('button[action=out]').pressed:
			var t_dir = 'out';
			break;
		}
		window.location.href = 'srv/getAgentWbsXLS.php?newPeriod=' + this.getPeriod() + '&filter=' + t_dir;
	},
	viewExGrid : function (ex_wb_no) {
		if (ex_wb_no) {
			var viewex = Ext.widget('viewexwin').show();
			this.getViewExStoreStore().load({
				params : {
					wb_no : ex_wb_no
				}
			});
		} else {
			Ext.Msg.alert('Запрещено!', 'Выберите накладную');
		}
	},
	viewEx : function (column, action, grid, rowIndex, colIndex, record, node) {
		this.viewExGrid(record.data['wb_no']);
	},
	loadWbs : function () {
		this.getWbsStoreStore().load();
	},
	insertNewPod : function (p_wb_no, p_dtd_txt, p_dir, p_d_in_txt) {
		if (p_wb_no && p_dtd_txt && p_dir == 'out' && !p_d_in_txt) {
			var newpod = Ext.widget('newpodwin').show();
			var formpod = newpod.down('newpodform');
			formpod.down('textfield[name=wb_no]').setValue(p_wb_no);
			formpod.down('textfield[name=dtd_txt]').setValue(p_dtd_txt);
		} else {
			Ext.Msg.alert('Запрещено!', 'Для этой накладной нельзя внести ПОД');
		}
	},
	insertNewEx : function (e_wb_no) {
		if (e_wb_no) {
			var newex = Ext.widget('newexwin').show();
			var formex = newex.down('newexform');
			formex.down('textfield[name=wb_no]').setValue(e_wb_no);
		} else {
			Ext.Msg.alert('Запрещено!', 'Выберите накладную');
		}
	},
	beforeprefetchWbsStore : function (store, operation) {
		store.getProxy().setExtraParam('newPeriod', this.getPeriod());
		switch (true) {
		case this.getWbsTool().down('button[action=all]').pressed:
			store.getProxy().setExtraParam('dir', 'all');
			break;
		case this.getWbsTool().down('button[action=in]').pressed:
			store.getProxy().setExtraParam('dir', 'in');
			break;
		case this.getWbsTool().down('button[action=out]').pressed:
			store.getProxy().setExtraParam('dir', 'out');
			break;
		case this.getWbsTool().down('button[action=overdue]').pressed:
			store.getProxy().setExtraParam('dir', 'ove');
			break;
		}
	},
	beforeloadWbsStore : function (store, operation) {
		store.getProxy().setExtraParam('newPeriod', this.getPeriod());
	},
	loadWbsGrid : function (comp) {
		var aTol = this.getWbsTool();
		this.allWbs(aTol.down('button[action=all]'));
	},
	allWbs : function (btn) {
		btn.toggle(true);
		var aTol = btn.up('wbstool');
		aTol.down('button[action=out]').toggle(false);
		aTol.down('button[action=in]').toggle(false);
		aTol.down('button[action=overdue]').toggle(false);
		this.loadWbs();
		this.viewTotal();
	},
	outWbs : function (btn) {
		btn.toggle(true);
		var aTol = btn.up('wbstool');
		aTol.down('button[action=all]').toggle(false);
		aTol.down('button[action=in]').toggle(false);
		aTol.down('button[action=overdue]').toggle(false);
		this.loadWbs();
		this.viewTotal();
	},
	inWbs : function (btn) {
		btn.toggle(true);
		var aTol = btn.up('wbstool');
		aTol.down('button[action=all]').toggle(false);
		aTol.down('button[action=out]').toggle(false);
		aTol.down('button[action=overdue]').toggle(false);
		this.loadWbs();
		this.viewTotal();
	},
	overdueWbs : function (btn) {
		btn.toggle(true);
		var aTol = btn.up('wbstool');
		aTol.down('button[action=all]').toggle(false);
		aTol.down('button[action=out]').toggle(false);
		aTol.down('button[action=in]').toggle(false);
		this.loadWbs();
		this.viewTotal();
	},
	newPod : function (btn) {
		var sm = btn.up('wbsgrid').getSelectionModel();
		if (sm.getCount() > 0) {
			this.insertNewPod(sm.getSelection()[0].get('wb_no'), sm.getSelection()[0].get('dtd_txt'), sm.getSelection()[0].get('dir'), sm.getSelection()[0].get('p_d_in'));
		}
	},
	newEx : function (btn) {
		var sm = btn.up('wbsgrid').getSelectionModel();
		if (sm.getCount() > 0) {
			this.insertNewEx(sm.getSelection()[0].get('wb_no'));
		}
	},
	monthChange : function (comp, newz, oldz) {
		this.loadWbs();
		this.viewTotal();
	},
	yearChange : function (comp, newz, oldz) {
		this.loadWbs();
		this.viewTotal();
	}
});
