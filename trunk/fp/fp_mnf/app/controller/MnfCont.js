Ext.define('FpMnf.controller.MnfCont', {
	extend : 'Ext.app.Controller',
	views : ['mainform.MnfGrid', 'mainform.MnfPanel', 'mainform.NumYear', 'mainform.ComboMonth'],
	models : ['MnfMod', 'WbMod'],
	stores : ['MnfSt', 'aMonths', 'WbSt'],
	refs : [{
			ref : 'TotalTool',
			selector : 'totaltool'
		}, {
			ref : 'TotalWb',
			selector : 'totalwb'
		}
	],
	init : function () {
		this.control({
			'mnfpanel' : {
				activate : this.loadMnf
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
	loadMnfAll : function (y, m, tab) {
		this.getMnfStStore().load({
			params : {
				proc : 'GetMnf',
				period : y + m,
				is_Ready : tab
			}
		});
	},
	loadMnf : function (ThePanel) {
		this.openOutmnf(ThePanel.down('button[action=out]'));
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
				proc : 'GetWbMnf',
				mnfRefNo : No
			}
		});
	},
	loadMnfStore : function (st, rec, suc) {
		var tt = this.getTotalTool();
		
		tt.down('label').setText('Количество манифестов: ' + st.getCount());
		if (rec[0].data['mnfrefno'] == '') {
			tt.down('label').setText('Количество манифестов: 0');
		}
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
		if (rec[0].data['wb_no'] == '') {
			tt.down('label').setText('');
		}
	}
});
