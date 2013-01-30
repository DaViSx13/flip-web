Ext.define('Courier.controller.UchetList', {
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
		}, {
			ref : 'podWin',
			selector : 'newpodwin',
			xtype : 'newpodwin',
			autoCreate : true
		}, {
			ref : 'countWin',
			selector : 'newcountwin',
			xtype : 'newcountwin',
			autoCreate : true
		}, {
			ref : 'wbWin',
			selector : 'wbwin',
			xtype : 'wbwin',
			autoCreate : true
		}, {
			ref : 'ordWin',
			selector : 'orderwin',
			xtype : 'orderwin',
			autoCreate : true
		}
	],
	countNew : 0,
	countTotal : 0,
	
	init : function () {
		this.control({
			'uchetlist gridcolumn[itemId=pod]' : {
				click : this.insertPod
			},
			'uchetlist gridcolumn[itemId=packs]' : {
				click : this.insertCount
			},
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
			},
			'uchetlist actions button[action=test]' : {
				click : this.test
			},
			'uchetlist actions button[action=yamap]' : {
				click : this.gotomap
			},
			'info button[action=testbtn]' : {
				click : this.testbtn
			},
			'actions button[action=readall]' : {
				click : this.viewAll
			},
			'uchetlist' : {
				added : function () {
					this.countNew = 0;
					if (localStorage.getItem('courClearStorage')) {
						this.clearLS();
						localStorage.removeItem('courClearStorage')
					};
				},
				select : this.controlActions
			}
		});
		
		this.getOrderAndWbStore().on({
			scope : this,
			load : this.makeUchetList1
		});
	},
	
	setRefreshed : function () {
		var lbl = this.getInfo().down('label[itemId=refresh]');
		var time = Ext.Date.format(new Date(), 'H:i');
		lbl.setText('Обновлено: ' + time);
	},
	
	controlActions : function (rowmodel, record, index) {
		var actions = this.getActions();
		actions.down('[action=up]').setDisabled(index == 0);
		actions.down('[action=down]').setDisabled(index == record.store.count() - 1);
	},
	
	savePod : function (btn) {
		var win = btn.up('newpodwin');
		var form_pod = win.down('newpodform');
		if (form_pod.form.isValid()) {
			var rec_pod = this.getLocStoreStore().findRecord('ano', form_pod.getValues()['wb_no']);
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
		};
		//console.log(this.getLocStoFlagStore());
	},
	
	saveCount : function (btn) {
		var win = btn.up('newcountwin');
		var form = win.down('newcountform');
		//console.log(form.down('label[itemId=wb_no]').text);
		var rec = this.getLocStoreStore().findRecord('ano', form.getValues()['wb_no']);
		rec.set('packs', form.getValues()['packs']);
		this.getLocStoreStore().sync();
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
		//console.log('syncOnServer - start');
		var localstore = this.getLocStoreStore();
		var flagstore = this.getLocStoFlagStore();
		flagstore.load();
		var data = flagstore.getRange();
		var flag_count = flagstore.getCount();
		var dtd = Ext.Date.format(new Date(), 'Ymd');
		
		//console.log(flag_count);
		for (i = 0; i < flag_count; i++) {
			var flag_rec = data[i];
			var datarec = localstore.getById(flag_rec.get('ano'));
			if (datarec) {
				Ext.Ajax.request({
					scope : this,
					url : 'data/data.php',
					params : {
						dbAct : 'SetPOD',
						wb_no : datarec.get('ano'),
						rcpn : datarec.get('rcpn'),
						tdd : datarec.get('tdd'),
						p_d_in : dtd
					},
					success : function (response, options) {
						var text = Ext.decode(response.responseText);
						//console.log(text);
						if (text.success == true) {
							//console.log('syncOnServer - success: ' + text.msg);
							var ano = options.params.wb_no;
							var fs = this.getLocStoFlagStore();
							fs.remove(fs.findRecord('ano', ano));
							fs.sync();
						} else {
							console.log('syncOnServer - failed: ' + text.msg);
						}
					},
					failure : function (response) {
						console.log('syncOnServer - Сервер недоступен! ' + response.statusText);
					}
				});
			};
			
		};
		//console.log('syncOnServer - stop');
	},
	
	makeUchetList1 : function (store, records, success) {
		if (success) {
			Ext.suspendLayouts();
			var viewstore = this.getLocStoreStore();
			var flagstore = this.getLocStoFlagStore();
			
			var sel = this.getUchetList().getSelectionModel().getCurrentPosition();
			
			//рассматриваем новые данные
			for (i = 0; i < records.length; i++) {
				var id = records[i].getId();
				if (rec = viewstore.getById(id)) { //если уже есть то обновляем
					//console.log('found ' + id);
					if (!flagstore.findRecord('ano', id)) { //если нет не сохраненных данных(пока так)
						rec.set(records[i].getData());
					}
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
			
			this.setCount();
			if (sel) {
				this.getUchetList().getSelectionModel().select(sel.row);
			}
			
			Ext.resumeLayouts(true);
			
			this.setRefreshed(success);
			this.syncOnServer();
		} else {
			Ext.getDoc().dom.location.reload()
		};
	},
	
	insertPod : function (gridview, el, rowIndex, colIndex, e, rec, rowEl) {
		if ((!rec.data['tdd']) && (rec.data['rectype'] == 1)) {
			var newdop = this.getPodWin();
			var formdop = newdop.down('newpodform');
			formdop.form.reset();
			formdop.down('label[itemId=wb_no]').setText('<font size="5">Накладная:   ' + rec.data.ano + '</font>', false);
			formdop.down('textfield[name=wb_no]').setValue(rec.data.ano);
			newdop.show();
		}
	},
	
	insertCount : function (gridview, el, rowIndex, colIndex, e, rec, rowEl) {
		if (rec.data['rectype'] == 0) {
			var newcount = this.getCountWin();
			var formcount = newcount.down('newcountform');
			formcount.down('label[itemId=wb_no]').setText('<font size="5">Заказ:   ' + rec.data.displayno + '</font>', false);
			formcount.down('textfield[name=wb_no]').setValue(rec.data.ano);
			formcount.down('textfield[name=packs]').setValue(rec.data['packs']);
			newcount.show();
		}
	},
	
	showDetails : function (btn) {
		var sm = btn.up('uchetlist').getSelectionModel();
		if (sm.getCount() > 0) {
			var record = sm.getSelection()[0];
			var store = this.getLocStoreStore();
			if (record.get('isview') == 0) {
				record.set('isview', 1);
				store.sync();
				this.setCount();
			}
			
			Ext.suspendLayouts();
			if (record.get('rectype') == 1) {
				var wb = this.getWbWin();
				var wbf = wb.down('wbform');
				wbf.loadRecord(record);
				wb.show();
			}
			if (record.get('rectype') == 0) {
				var ord = this.getOrdWin();
				var ordf = ord.down('orderform');
				ordf.loadRecord(record);
				ord.show();
			}
			Ext.resumeLayouts(true);
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
		this.setCount();
		
		var ls = this.getLocStoFlagStore();
		ls.remove(ls.getRange());
		ls.sync();
		
		Ext.resumeLayouts(true);
	},
	
	setCount : function (addNew) {
		var st = this.getLocStoreStore();
		var total = st.getCount();
		var countNew = total - st.sum('isview');
		
		if (total != this.countTotal || countNew != this.countNew) {
			var lbl = this.getInfo().down('label[itemId=count]');
			lbl.setText(Ext.String.format('Новых/Всего: {0}/{1}', countNew, total));
			this.countTotal = total;
			this.countNew = countNew;
		}
	},
	
	gotomap : function () {
		var sm = this.getUchetList().getSelectionModel();
		var sr = sm.getSelection()[0];
		var adr = sr.get('aaddress');
		if (adr) {
			adr = '?text=Москва ' + adr
				window.open('http://maps.yandex.ru/' + adr);
		}
	},
	
	viewAll : function () {
		Ext.Msg.confirm('Все', 'Отметить все как просмотренные?', function (button) {
			if (button === 'yes') {
				var grid = this.getUchetList();
				var store = grid.getStore();
				Ext.suspendLayouts();
				store.each(function (record) {
					record.set('isview', 1);
				});
				store.sync();
				Ext.resumeLayouts();
				this.setCount();
			}
		},
			this);
	},
	
	test : function () {
		console.log('testAction');
		
		var lbl = this.getInfo().down('label[itemId=refresh]');
		Ext.create('Ext.fx.Anim', {
			target : lbl,
			duration : 1000,
			/*from : {
			color : 'green'
			},*/
			to : {
				//color : 'white'
				width : 300
			}
		});
		
		//this.setCount(true);
		//this.getActions().down('[action=test]').setText('Hell ou');
		
		/*
		Ext.create('Ext.window.Window', {
		title : 'Hello',
		height : 200,
		width : 400,
		layout : 'fit',
		items : {
		html : 'Hello'
		}
		}).show();
		 */
		/*
		var sm = this.getUchetList().getSelectionModel();
		var sr = sm.getSelection()[0];
		var adr = sr.get('aaddress');
		adr = '?text=Москва ' + adr
		window.open('http://maps.yandex.ru/' + adr);
		 */
	},
	
	testbtn : function () {
		this.syncOnServer();
		/*
		var u = this.getUchetList();
		if (u.isHidden()) {
		u.show()
		} else {
		u.hide()
		};
		 */
	}
	
});
