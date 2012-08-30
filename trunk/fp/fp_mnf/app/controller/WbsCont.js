Ext.define('FpMnf.controller.WbsCont', {
	extend : 'Ext.app.Controller',
	views : ['wbs.WbsGrid'],
	models : ['WbsMod'],
	stores : ['WbsStore','WbsBufStore', 'aMonths'],
	refs : [{
			ref : 'WbsTool',
			selector : 'wbstool'
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
			}/*,
			'ordwin button[action=save]' : {
				click : this.saveOrder
			},
			'ordtool combomonth' : {
				change : this.monthChange
			},
			'ordtool numyear' : {
				change : this.yearChange
			},
			'ordform' : {
				actioncomplete : this.showOrd
			},
			'ordgrid > tableview' : {
				itemdblclick : this.dblclickOrdGr
			}*/
		});
		this.getWbsStoreStore().on({
			scope : this,
			load : this.loadWbsStore
		});/*
		this.getOrdsStStore().on({
			scope : this,
			load : this.loadOrdersSt
		});*/
	},
	
	loadWbs : function (y, m) {
		this.getWbsStoreStore().load({
			params : {
				newPeriod : y + m +'01'
			}
		});
	},
	loadWbsGrid : function () {
		var aTol = this.getWbsTool();
		var mo = aTol.down('combomonth').value;
		var ye = aTol.down('numyear').value;
		this.loadWbs(ye, mo);
		this.allWbs(aTol.down('button[action=all]'));
	},
	allWbs : function (btn) {
		btn.toggle(true);
		var aTol = btn.up('wbstool');
		aTol.down('button[action=out]').toggle(false);
		aTol.down('button[action=in]').toggle(false);
		this.getWbsStoreStore().clearFilter(false);
		//console.log('all');
	},
	outWbs : function (btn) {
		btn.toggle(true);
		var aTol = btn.up('wbstool');
		aTol.down('button[action=all]').toggle(false);
		aTol.down('button[action=in]').toggle(false);
		this.getWbsStoreStore().clearFilter(true);
		this.getWbsStoreStore().filter('dir', 'out');
		//console.log('out');
	},
	inWbs : function (btn) {
		btn.toggle(true);
		var aTol = btn.up('wbstool');
		aTol.down('button[action=all]').toggle(false);
		aTol.down('button[action=out]').toggle(false);
		this.getWbsStoreStore().clearFilter(true);
		this.getWbsStoreStore().filter('dir', 'in');
		//console.log('in');
	},/*
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
	showOrd : function (form, action) {
		if (action.type == 'submit' && action.result['success'] == true) {
			form.reset();
			this.getOrdForm().up('ordwin').close();
			this.loadOrdGr();
		}
	},*/
	loadWbsStore : function (st, rec, suc) {
		
		
	}/*,
	loadOrdersSt : function (st, rec, suc) {
		var tt = this.getOrdTotal();
		tt.down('label').setText('Количество заказов: ' + st.getCount());
		if (rec[0].data['ROrdNum'] == '') {
			tt.down('label').setText('Количество заказов: 0');
		}
	}*/
});
