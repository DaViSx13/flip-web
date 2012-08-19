Ext.define('FpMnf.controller.OrdsCont', {
	extend : 'Ext.app.Controller',
	views : ['orders.OrdGrid', 'mainform.NumYear', 'mainform.ComboMonth','orders.OrdWin'],
	models : ['OrdsMod'],
	stores : ['OrdsSt', 'aMonths'],
	refs : [{
			ref : 'OrdTool',
			selector : 'ordtool'
			},
			{
			ref : 'OrdWin',
			selector : 'ordwin'
			}
		],
	init : function () {
		this.control({
			'ordgrid' : {
				activate : this.loadOrdGr
			},
			'ordgrid button[action=new]' : {
				click : this.openOrdWin
			},/*
			'mnfgrid button[action=in]' : {
				click : this.openInmnf
			},
			'mnfgrid button[action=all]' : {
				click : this.openAllmnf
			},*/
			'ordtool combomonth' : {
				change : this.monthChange
			},
			'ordtool numyear' : {
				change : this.yearChange
			}/*,
			'mnfgrid' : {
				selectionchange : this.previewWb
			}*/
		});
		/*this.getMnfStStore().on({
			scope : this,
			load : this.loadMnfStore
		});
		this.getWbStStore().on({
			scope : this,
			load : this.loadWbStore
		});*/
	},
	loadOrds : function (y, m) {
		
		this.getOrdsStStore().load({
			params : {
				//proc : 'GetMnf',
				newPeriod: y+m
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
		
		var edit = Ext.create('FpMnf.view.orders.OrdWin').show();

       // edit.down('form').loadRecord(record);
		
	},/*
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
	},*/
	monthChange : function (comp, newz, oldz) {
		var aTol = comp.up('ordtool');
		var ye = aTol.down('numyear').value;
		this.loadOrds(ye, newz);
	},
	yearChange : function (comp, newz, oldz) {
		var aTol = comp.up('ordtool');
		var mo = aTol.down('combomonth').value;
		this.loadOrds(newz, mo);
	}/*,
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
	}*/
});
