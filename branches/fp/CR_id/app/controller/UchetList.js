﻿Ext.define('Courier.controller.UchetList', {
	extend : 'Ext.app.Controller',
	views : ['UchetList', 'Info', 'NewPodWin', 'NewPodForm', 'WbWin', 'OrderWin', 'OrderForm', 'NewCountWin', 'NewCountForm'],
	models : ['Courier', 'LocModel', 'LocModFlag', 'OrderAndWb'],
	stores : ['OrderAndWb', 'Uchets', 'LocStore', 'LocStoFlag'],
	refs : [{
			ref : 'Info',
			selector : 'info'
		}, {
			ref : 'Actions',
			selector : 'actions'
		}, {
			ref : 'UchetList',
			selector : 'uchetlist'
		}
	],
	countNew : 0,
	init : function () {
		this.control({
			'uchetlist gridcolumn[itemId=pod]' : {
				click : this.insertPod
			},
			'uchetlist gridcolumn[itemId=packs]' : {
				click : this.insertCount
			},
			/*'uchetlist gridcolumn[itemId=1]' : {
			dblclick : this.showDetails
			},
			'uchetlist gridcolumn[itemId=2]' : {
			dblclick : this.showDetails
			},
			'uchetlist gridcolumn[itemId=3]' : {
			dblclick : this.showDetails
			},
			'uchetlist gridcolumn[itemId=4]' : {
			dblclick : this.showDetails
			},
			'uchetlist gridcolumn[itemId=5]' : {
			dblclick : this.showDetails
			},*/
			/*'uchetlist info button[action=test]' : {
			click : this.Exit
			},*/
			'uchetlist actioncolumn[itemId=isredy]' : {
				item_redy_click : this.setReady
			},
			'uchetlist actioncolumn[itemId=inway]' : {
				item_way_click : this.setWay
			},
			'newpodwin button[action=save]' : {
				click : this.savePod
			},
			'newcountwin button[action=save]' : {
				click : this.saveCount
			},
			'uchetlist actions button[action=up]' : {
				click : this.upRow
			},
			'uchetlist actions button[action=down]' : {
				click : this.downRow
			},
			'uchetlist actions button[action=view]' : {
				click : this.showDetails
			},
			'uchetlist actions button[action=clearLS]' : {
				click : this.clearLS
			}
		});
		this.getOrderAndWbStore().on({
			scope : this,
			load : this.makeUchetList1
		});
		/*this.getOrdersStore().on({
		scope : this,
		load : this.makeUchetList
		});*/
		
	},
	
	savePod : function (btn) {
		var win = btn.up('newpodwin');
		var form_pod = win.down('newpodform');
		var rec_pod = this.getUchetsStore().findRecord('ano', form_pod.getValues()['wb_no']);
		rec_pod.set('tdd', form_pod.getValues()['tdd']);
		rec_pod.set('rcpn', form_pod.getValues()['rcpn']);
		
		this.getLocStoFlagStore().load();
		var rec_flag = this.getLocStoFlagStore().findRecord('ano', form_pod.getValues()['wb_no']);
		if (!rec_flag) {
			this.getLocStoFlagStore().add({
				ano : form_pod.getValues()['wb_no']
			});
			this.getLocStoFlagStore().sync();
		}
		
		win.close();
		console.log(this.getLocStoFlagStore());
	},
	saveCount : function (btn) {
		var win = btn.up('newcountwin');
		var form = win.down('newcountform');
		//console.log(form.down('label[itemId=wb_no]').text);
		var rec = this.getUchetsStore().findRecord('ano', form.getValues()['wb_no']);
		rec.set('packs', form.getValues()['packs']);
		win.close();
	},
	setWay : function (column, action, grid, rowIndex, colIndex, record, node) {
		
		if (record.get('inway') == 0 && !record.get('tdd') && record.get('isredy') == 0) {
			grid.getStore().each(function () {
				this.set('inway', 0);
			})
			record.set('inway', 1);
			//record.set('isredy', 0);
		} else {
			record.set('inway', 0);
		};
		grid.getStore().sync();
	},
	
	setReady : function (column, action, grid, rowIndex, colIndex, record, node) {
		
		if (record.get('isredy') == 0) {
			record.set('isredy', 1);
			record.set('inway', 0);
		} else {
			record.set('isredy', 0);
		};
		grid.getStore().sync();
	},
	
	syncOnServer : function () {
		var me = this;
		me.getLocStoFlagStore().load();
		var flag_count = me.getLocStoFlagStore().getCount();
		var dtd = new Date();
		dtd = dtd.getFullYear() + '.' + dtd.getMonth() + '.' + dtd.getDay(dtd);
		
		if (flag_count > 0) {
			
			//console.log(me.getLocStoreStore().findRecord('ano', me.getLocStoFlagStore().getRange(0, 0)[0].get('ano')).get('tdd'));
			var flag_rec = me.getLocStoFlagStore().getRange(0, 0);
			
			Ext.Ajax.request({
				url : 'data/data.php',
				params : {
					dbAct : 'SetPOD',
					wb_no : me.getLocStoFlagStore().getRange(0, 0)[0].get('ano'),
					rcpn : me.getLocStoreStore().findRecord('ano', me.getLocStoFlagStore().getRange(0, 0)[0].get('ano')).get('rcpn'),
					tdd : me.getLocStoreStore().findRecord('ano', me.getLocStoFlagStore().getRange(0, 0)[0].get('ano')).get('tdd'),
					p_d_in : dtd
				},
				success : function (response) {
					
					var text = Ext.decode(response.responseText);
					
					console.log(text);
					if (text.success == true) {
						console.log('1 ' + text.msg);
						me.getLocStoFlagStore().remove(flag_rec);
						me.getLocStoFlagStore().sync();
						
					} else {
						console.log('2 ' + text.msg);
					}
				},
				failure : function (response) {
					console.log('Сервер недоступен! ' + response.statusText);
					
				}
			});
			
		}
		
	},
	logLastTime : null,
	log : function (str) {
		if (this.logLastTime == null) {
			this.logLastTime = Ext.Date.now()
		};
		var logStr = '';
		logStr = Ext.String.format('{0} ({1}) - {2}', Ext.Date.format(new Date(), 'H:i:s.u'), (Ext.Date.now() - this.logLastTime), str);
		console.log(logStr);
		
		var txt = this.getInfo().down('[name=message]');
		txt.setValue(logStr + '\n' + txt.getValue());
		this.logLastTime = Ext.Date.now();
	},
	makeUchetList1 : function (store, records, success) {
		//this.log('start');
		//return;
		//console.log('loaded');
		
		if (success) {
			Ext.suspendLayouts();
			var viewstore = this.getLocStoreStore();
			//рассматриваем новые данные
			for (i = 0; i < records.length; i++) {
				var id = records[i].getId();
				if (rec = viewstore.getById(id)) { //если уже есть то обновляем
					//console.log('found ' + id);
					rec.set(records[i].getData());
				} else { //если нет то добавляем
					//console.log('not found ' + id);
					var newRec = Ext.create('Courier.model.LocModel');
					newRec.set(records[i].getData());
					newRec.setId(newRec.get('ano'));
					viewstore.add(newRec);
				};
			};
			//если нужно удаляем
			recordsToRemove = new Array();
			for (i = 0; i < viewstore.getCount(); i++) {
				var rec = viewstore.getAt(i);
				var id = rec.getId();
				if (!store.getById(id)) {
					recordsToRemove.push(rec);
				};
			};
			if (recordsToRemove.length > 0) {
				viewstore.remove(recordsToRemove)
			};
			//синхро
			viewstore.sync();
			Ext.resumeLayouts(true);
		};
		
		//this.log('end');
	},
	makeUchetList : function (store, records, success) {
		return;
		var sTime,
		eTime;
		sTime = Ext.Date.now();
		
		var me = this;
		if (success) {
			me.getLocStoreStore().load();
			me.getLocStoFlagStore().load();
			if (me.getUchetsStore().getCount() > 0) {
				var jsonArray = me.getUchetsStore().getRange(); //me.getLocStoreStore().getRange();
				
				
				var resArray = new Array();
				var LocStoreFlagCount = me.getLocStoFlagStore().getCount();
				var Flag_Store = me.getLocStoFlagStore();
				var IsDelet = 1;
				var sel = me.getUchetList().getSelectionModel().getCurrentPosition();
				
				for (var i = 0; i < jsonArray.length; i++) {
					store.each(function () {
						
						if (jsonArray[i].get('ano') == this.get('ano')) { //Нужно: Сравниваем OrderAndWbStore с LocalStore
							IsDelet = 0;
							Ext.Array.remove(records, this); // delete from OrderAndWbStore
						}
						
					})
					if (IsDelet == 1) {
						me.getUchetsStore().removeAt(i);
						console.log('remove');
					} else {
						IsDelet = 1;
					}
					
				}
				
				if (records.length > 0) {
					this.countNew = this.countNew + records.length;
				}
				
				me.getUchetsStore().loadRawData(records, true); //remove UchetsStore data
				//add data in UchetsStore from new array
				
				me.getLocStoreStore().remove(me.getLocStoreStore().getRange());
				me.getLocStoreStore().sync();
				for (var i = 0; i < me.getUchetsStore().getCount(); i++) {
					me.getLocStoreStore().add(me.getUchetsStore().getRange(i, i)[0].data);
					me.getLocStoreStore().sync();
				}
				
			} else {
				console.log(me.getLocStoreStore().getCount());
				if (me.getLocStoreStore().getCount() > 0) {
					console.log('loc');
					this.countNew = me.getLocStoreStore().getCount();
					me.getUchetsStore().loadRawData(me.getLocStoreStore().getRange());
				} else {
					console.log('ser');
					me.getUchetsStore().loadRawData(records);
					this.countNew = records.length;
				}
			}
			
			if (this.countNew > 0) {
				me.getInfo().down('label[itemId=count]').setText("Количество новых заказов : " + this.countNew);
			}
			
		}
		if (sel) {
			me.getUchetList().getSelectionModel().select(sel.row);
		}
		this.syncOnServer();
		
		eTime = Ext.Date.now();
		var logStr = '';
		logStr = Ext.Date.format(new Date(), 'H:i:s') + ' - ' + (eTime - sTime);
		console.log(logStr);
		var txt = this.getInfo().down('[name=message]');
		txt.setValue(logStr + '\n' + txt.getValue());
		
	},
	/*Exit : function (but) {
	this.syncOnServer();
	
	
	
	},*/
	insertPod : function (gridview, el, rowIndex, colIndex, e, rec, rowEl) {
		//console.log();
		if ((!rec.data['tdd']) && (rec.data['rectype'] == 1)) {
			//this.insertNewDop(rec.data['wb_no'], rec.data['dtd_txt'], rec.data['tar_ag_id'], rec.data['req_tar_a']);
			//console.log('win');
			var newdop = Ext.widget('newpodwin').show();
			var formdop = newdop.down('newpodform');
			formdop.down('label[itemId=wb_no]').setText('<font size="5">Накладная:   ' + rec.data.displayno + '</font>', false);
			formdop.down('textfield[name=wb_no]').setValue(rec.data.displayno);
		} else {
			//this.editDop(rec.data['wb_no'], rec.data['dtd_txt'], rec.data['tar_ag_id'], rec.data['req_tar_a'], rec.data['req_rem'])
		}
	},
	insertCount : function (gridview, el, rowIndex, colIndex, e, rec, rowEl) {
		
		if (rec.data['rectype'] == 1 || rec.data['rectype'] == 0) {
			
			var newcount = Ext.widget('newcountwin').show();
			var formcount = newcount.down('newcountform');
			formcount.down('label[itemId=wb_no]').setText('<font size="5">Накладная:   ' + rec.data.displayno + '</font>', false);
			formcount.down('textfield[name=wb_no]').setValue(rec.data.displayno);
			formcount.down('textfield[name=packs]').setValue(rec.data['packs']);
			
		} else {}
	},
	
	showDetails : function (btn) {
		
		var sm = btn.up('uchetlist').getSelectionModel();
		if (sm.getCount() > 0) {
			if (sm.getSelection()[0].get('isview') == 0) {
				sm.getSelection()[0].set('isview', 1);
				this.countNew = this.countNew - 1;
				this.getInfo().down('label[itemId=count]').setText("Количество новых заказов : " + this.countNew);
			}
			if (sm.getSelection()[0].get('rectype') == 1) {
				
				var wb = Ext.widget('wbwin');
				wb.show();
				var wbf = wb.down('wbform');
				//wbf.loadRecord(sm.getLastSelected());
				//console.log(sm.getLastSelected().data.ano);
				wbf.down('label[itemId=displayno]').setText('<font size="5">Накладная:   ' + sm.getLastSelected().data.displayno + '</font>', false);
				wbf.down('label[itemId=aaddress]').setText('<font size="5">Адрес:   ' + sm.getLastSelected().data.aaddress + '</font>', false);
				wbf.down('label[itemId=client]').setText('<font size="5">Клиент:   ' + sm.getLastSelected().data.client + '</font>', false);
				wbf.down('label[itemId=cont]').setText('<font size="5">Контакт:   ' + sm.getLastSelected().data.cont + '</font>', false);
				wbf.down('label[itemId=contphone]').setText('<font size="5">Телефон:   ' + sm.getLastSelected().data.contphone + '</font>', false);
				wbf.down('label[itemId=rems]').setText('<font size="5">Коментарий:   ' + sm.getLastSelected().data.rems + '</font>', false);
				wbf.down('label[itemId=packs]').setText('<font size="5">Мест:   ' + sm.getLastSelected().data.packs + '</font>', false);
				wbf.down('label[itemId=wt]').setText('<font size="5">Вес:   ' + sm.getLastSelected().data.wt + '</font>', false);
				wbf.down('label[itemId=volwt]').setText('<font size="5">Об. вес:   ' + sm.getLastSelected().data.volwt + '</font>', false);
				wbf.down('label[itemId=acash]').setText('<font size="5">Сумма:   ' + sm.getLastSelected().data.acash + '</font>', false);
			}
			if (sm.getSelection()[0].get('rectype') == 0) {
				
				var ord = Ext.widget('orderwin');
				ord.show();
				var ordf = ord.down('orderform');
				//ordf.loadRecord(sm.getLastSelected());
				ordf.down('label[itemId=displayno]').setText('<font size="5">Заказ:   ' + sm.getLastSelected().data.displayno + '</font>', false);
				ordf.down('label[itemId=aaddress]').setText('<font size="5">Адрес:   ' + sm.getLastSelected().data.aaddress + '</font>', false);
				ordf.down('label[itemId=client]').setText('<font size="5">Клиент:   ' + sm.getLastSelected().data.client + '</font>', false);
				ordf.down('label[itemId=cont]').setText('<font size="5">Контакт:   ' + sm.getLastSelected().data.cont + '</font>', false);
				ordf.down('label[itemId=contphone]').setText('<font size="5">Телефон:   ' + sm.getLastSelected().data.contphone + '</font>', false);
				ordf.down('label[itemId=rems]').setText('<font size="5">Коментарий:   ' + sm.getLastSelected().data.rems + '</font>', false);
				ordf.down('label[itemId=packs]').setText('<font size="5">Мест:   ' + sm.getLastSelected().data.packs + '</font>', false);
				ordf.down('label[itemId=wt]').setText('<font size="5">Вес:   ' + sm.getLastSelected().data.wt + '</font>', false);
				ordf.down('label[itemId=volwt]').setText('<font size="5">Об. вес:   ' + sm.getLastSelected().data.volwt + '</font>', false);
				ordf.down('label[itemId=acash]').setText('<font size="5">Сумма:   ' + sm.getLastSelected().data.acash + '</font>', false);
				ordf.down('label[itemId=ordstatus]').setText('<font size="5">Статус:   ' + sm.getLastSelected().data.ordstatus + '</font>', false);
				ordf.down('label[itemId=ordtype]').setText('<font size="5">Вид:   ' + sm.getLastSelected().data.ordtype + '</font>', false);
				ordf.down('label[itemId=timeb]').setText('<font size="5">C:   ' + sm.getLastSelected().data.timeb + '</font>', false);
				ordf.down('label[itemId=timee]').setText('<font size="5">До:   ' + sm.getLastSelected().data.timee + '</font>', false);
			}
		}
	},
	upRow : function (btn) {
		var sm = this.getUchetList().getSelectionModel();
		var st = sm.getStore();
		var sr = sm.getSelection()[0];
		var row_index = st.indexOf(sr);
		if (row_index > 0) {
			st.remove(sr, true);
			st.insert(row_index - 1, sr);
			sm.select(row_index - 1);
			
			//давненько такой херней не занимался
			//в домашних условиях не повторять
			var proxyId = st.getProxy().id;
			var order = localStorage.getItem(proxyId);
			order = order.replace(/,/gi, ' ');
			order = Ext.String.splitWords(order);
			var x = order[row_index - 1];
			order[row_index - 1] = order[row_index];
			order[row_index] = x;
			order = order.toString();
			localStorage.setItem(proxyId, order);
			
		}
	},
	downRow : function (btn) {
		var sm = this.getUchetList().getSelectionModel();
		var st = sm.getStore();
		var sr = sm.getSelection()[0];
		var row_index = st.indexOf(sr);
		if (row_index < st.getCount()) {
			st.remove(sr, true);
			st.insert(row_index + 1, sr);
			sm.select(row_index + 1);
			
			//давненько такой херней не занимался
			//в домашних условиях не повторять
			var proxyId = st.getProxy().id;
			var order = localStorage.getItem(proxyId);
			order = order.replace(/,/gi, ' ');
			order = Ext.String.splitWords(order);
			var x = order[row_index + 1];
			order[row_index + 1] = order[row_index];
			order[row_index] = x;
			order = order.toString();
			localStorage.setItem(proxyId, order);
			
		}
	},
	clearLS : function () {
		Ext.suspendLayouts();
		var ls = this.getLocStoreStore();
		ls.remove(ls.getRange());
		ls.sync();
		Ext.resumeLayouts(true);
	}
});