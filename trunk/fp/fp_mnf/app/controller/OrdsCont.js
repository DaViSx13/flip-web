Ext.define('FpMnf.controller.OrdsCont', {
	extend : 'Ext.app.Controller',
	views : ['orders.OrdGrid', 'mainform.NumYear', 'mainform.ComboMonth','orders.OrdWin'],
	models : ['OrdsMod', 'OrderMod'],
	stores : ['OrdsSt', 'aMonths', 'OrderSt'],
	refs : [{
			ref : 'OrdForm',
			selector : 'ordform'
			},
			{
			ref : 'OrdTool',
			selector : 'ordtool'
			},
			{
			ref : 'OrdTotal',
			selector : 'ordtotal'
			}
			
		],
	init : function () {
		this.control({
			'ordgrid' : {
				activate : this.loadOrdGr
			},
			'ordgrid button[action=new]' : {
				click : this.openOrdWin
			},
			'ordgrid button[action=edit]' : {
				click : this.editOrdWin
			},/*
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
		this.getOrderStStore().on({
			scope : this,
			load : this.loadOrdStore
		});
		this.getOrdsStStore().on({
			scope : this,
			load : this.loadOrdersSt
		});
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
		
	},
	editOrdWin : function (btn) {
		
	
	var sm = btn.up('ordgrid').getSelectionModel();
	 //pg.child('gridpanel').getSelectionModel();
			
			
			if (sm.getCount()>0){
					if (sm.getSelection()[0].get('status')=='заявлен'){
			
							//var edit = Ext.create('FpMnf.view.orders.OrdWin').show();
							//var form_ord = edit.down('ordform');
							
			
							var store_ord =	this.getOrderStStore().load({
									params : {
												//proc : 'GetMnf',
												id: sm.getSelection()[0].get('ROrdNum')
											}
							});
							//console.log(store_ord.data);	
							//form_ord.loadRecord(store_ord.data);
			
            }else{
                
               Ext.Msg.alert('Запрещено!', 'Редактировать можно только заявленные заказы'); 
            }
            
				}else{
					Ext.Msg.alert('Внимание!', 'Выберите заказ для редактирования');
					}

	
		
	},/*
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
	},/*
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
	},*/
	loadOrdStore : function (st, rec, suc) {
		var edit = Ext.create('FpMnf.view.orders.OrdWin').show();
		var form_ord = edit.down('ordform');
		form_ord.loadRecord(rec[0]);
		console.log(rec[0]);
		
		//if (rec[0].data['mnfrefno'] == '') {tt.down('label').setText('Количество манифестов: 0');		}
	},
	loadOrdersSt : function (st, rec, suc) {
		var tt = this.getOrdTotal();
		
		
		tt.down('label').setText('Количество заказов: ' + st.getCount());
		
		if (rec[0].data['ROrdNum'] == '') {
			tt.down('label').setText('Количество заказов: 0');
		}
	}
});
