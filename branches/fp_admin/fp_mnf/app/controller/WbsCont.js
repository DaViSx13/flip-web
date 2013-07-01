Ext.define('FpMnf.controller.WbsCont', {
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
			'wbsgrid button[action=pod]' : {
				click : this.newPod
			},
			'wbsgrid button[action=ex]' : {
				click : this.newEx
			},
			'wbsgrid button[action=dop]' : {
				click : this.newDop
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
	},
	getPeriod : function () {
		var m = this.getWbsTool().down('combomonth').value;
		var y = this.getWbsTool().down('numyear').value;
		return y + m + '01';
	},
	viewTotal : function () {
		var tc = this;
		var twt = tc.getWbsTotal();
		switch (true) {
		case this.getWbsTool().down('button[action=all]').pressed:
			var t_dir ='all';
			break;
		case this.getWbsTool().down('button[action=in]').pressed:
			var t_dir ='in';
			break;
		case this.getWbsTool().down('button[action=out]').pressed:
			var t_dir ='out';
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
				console.log(text.data[0].s_wb);
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
					me.loadWbs();
					Ext.Msg.alert('ПОД сохранено!', action.result.msg);
					form.reset();
					me.getNewPodWin().close();
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
					me.loadWbs();
					Ext.Msg.alert('Происшествие сохранено!', action.result.msg);
					form.reset();
					me.getNewExWin().close();
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
					me.loadWbs();
					Ext.Msg.alert('Доп. тариф сохранен!', action.result.msg);
					form.reset();
					me.getNewDopWin().close();
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
		} else {
			Ext.Msg.alert('Запрещено!', 'Для этой накладной нельзя внести Доп. тариф');
		}
	},
	newDop : function (btn) {
		var sm = btn.up('wbsgrid').getSelectionModel();
		if (sm.getCount() > 0) {
			this.insertNewDop(sm.getSelection()[0].get('wb_no'), sm.getSelection()[0].get('dtd_txt'), sm.getSelection()[0].get('tar_ag_id'), sm.getSelection()[0].get('req_tar_a'));
		}
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
		}
	},
	beforeloadWbsStore : function (store, operation) {
		store.getProxy().setExtraParam('newPeriod', this.getPeriod());
	},
	loadWbsGrid : function () {
		var aTol = this.getWbsTool();
		this.allWbs(aTol.down('button[action=all]'));
	},
	allWbs : function (btn) {
		btn.toggle(true);
		var aTol = btn.up('wbstool');
		aTol.down('button[action=out]').toggle(false);
		aTol.down('button[action=in]').toggle(false);
		this.loadWbs();
		this.viewTotal();
	},
	outWbs : function (btn) {
		btn.toggle(true);
		var aTol = btn.up('wbstool');
		aTol.down('button[action=all]').toggle(false);
		aTol.down('button[action=in]').toggle(false);
		this.loadWbs();
		this.viewTotal();
	},
	inWbs : function (btn) {
		btn.toggle(true);
		var aTol = btn.up('wbstool');
		aTol.down('button[action=all]').toggle(false);
		aTol.down('button[action=out]').toggle(false);
		this.loadWbs();
		this.viewTotal();
	},
	newPod : function (btn) {
		var sm = btn.up('wbsgrid').getSelectionModel();
		if (sm.getCount() > 0) {
			this.insertNewPod(sm.getSelection()[0].get('wb_no'), sm.getSelection()[0].get('dtd_txt'), sm.getSelection()[0].get('dir'), sm.getSelection()[0].get('p_d_in_txt'));
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