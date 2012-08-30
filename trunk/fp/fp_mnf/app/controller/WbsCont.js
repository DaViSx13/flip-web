Ext.define('FpMnf.controller.WbsCont', {
	extend : 'Ext.app.Controller',
	views : ['wbs.WbsGrid'],
	models : ['WbsMod'],
	stores : ['WbsStore', 'aMonths'],
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
		})/*;
		this.getOrderStStore().on({
			scope : this,
			load : this.loadOrdStore
		});
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
	}/*,
	saveOrder : function (btn) {
		var win = btn.up('ordwin');
		var form_ord = win.down('ordform');
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
				params: {
					dbAct: 'saveagorder'
				},
				submitEmptyText : false,
				success : function (form, action) {
					Ext.Msg.alert('Заказ сохранен!', action.result.msg);
				},
				failure : function (form, action) {
					Ext.Msg.alert('Заказ не сохранен!', action.result.msg);
				}
			});
		} else {
			Ext.Msg.alert('Не все поля заполнены', 'Откорректируйте информацию')
		}
	},
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
	},
	loadOrdStore : function (st, rec, suc) {
		var edi = this.getOrdWin();
		var form_ord = edi.down('ordform');
		form_ord.loadRecord(rec[0]);
		edi.setTitle('Заказ № ' + rec[0].data['rordnum']);
		var cb_org = form_ord.down('combocity[name=org]');
		cb_org.store.load({
			params : {
				query : cb_org.getValue()
			}
		});
		cb_org.select(rec[0].data['orgcode']);
		//console.log(rec[0].data['orgcode']);
		var cb_des = form_ord.down('combocity[name=dest]');
		cb_des.store.load({
			params : {
				query : cb_des.getValue()
			}
		});
		cb_des.select(rec[0].data['destcode']);
		//cb_des.setValue(rec[0].data['destcode']);
	},
	loadOrdersSt : function (st, rec, suc) {
		var tt = this.getOrdTotal();
		tt.down('label').setText('Количество заказов: ' + st.getCount());
		if (rec[0].data['ROrdNum'] == '') {
			tt.down('label').setText('Количество заказов: 0');
		}
	}*/
});
