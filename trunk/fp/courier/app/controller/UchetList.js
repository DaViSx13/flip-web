Ext.define('Courier.controller.UchetList', {
	extend : 'Ext.app.Controller',
	views : ['UchetList', 'Info', 'NewPodWin', 'NewPodForm', 'WbWin', 'OrderWin', 'OrderForm'],
	models : ['Courier', 'LocModel', 'LocModFlag', 'OrderAndWb'],
	stores : ['OrderAndWb', 'Uchets', 'LocStore', 'LocStoFlag'],
	refs : [{
			ref : 'Info',
			selector : 'info'
		},{
			ref : 'Actions',
			selector : 'actions'
		}		
	],
	init : function () {
		this.control({
			'uchetlist gridcolumn[itemId=pod]' : {
				click : this.insertPod
			},
			/*'uchetlist gridcolumn[itemId=0]' : {
				dblclick : this.showDetails
			},
			'uchetlist gridcolumn[itemId=1]' : {
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
			'uchetlist info button[action=test]' : {
				click : this.test
			},
			'uchetlist actioncolumn[itemId=isredy]' : {
				item_redy_click : this.setRedy
			},
			'uchetlist actioncolumn[itemId=inway]' : {
				item_way_click : this.setWay
			},
			'newpodwin button[action=save]' : {
				click : this.savePod
			},
			'uchetlist actions button[action=up]' : {
				click : this.up
			},
			'uchetlist actions button[action=down]' : {
				click : this.down
			},
			'uchetlist actions button[action=view]' : {
				click : this.showDetails
			}
		});
		this.getOrderAndWbStore().on({
			scope : this,
			load : this.makeUchetList
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
						this.getLocStoFlagStore().add({ano: form_pod.getValues()['wb_no']});
						this.getLocStoFlagStore().sync();
						} 
						
						win.close();
						console.log(this.getLocStoFlagStore());
	},
	
	setWay : function (column, action, grid, rowIndex, colIndex, record, node) {
	
	if (record.get('inway')==0 && !record.get('tdd') && record.get('isredy')==0) {
	grid.getStore().each(function () {
	this.set('inway',0);
	})
	record.set('inway', 1);
	//record.set('isredy', 0);		
	} else {
	record.set('inway', 0);
	}
	},
	
	setRedy : function (column, action, grid, rowIndex, colIndex, record, node) {
	
	if (record.get('isredy')==0) {
	record.set('isredy', 1);
	record.set('inway', 0);
	} else {
	record.set('isredy', 0);
	}
	},
	
	makeUchetList : function (store, records, success) {
		//console.log('wbs store loaded');
		var me = this;
		if (success) {
			me.getLocStoreStore().load();
			me.getLocStoFlagStore().load();
			//console.log(me.getUchetsStore().getCount());
			//console.log(me.getLocStoreStore());
			if (me.getUchetsStore().getCount() > 0){
			var jsonArray = me.getUchetsStore().getRange();//me.getLocStoreStore().getRange();
			
			} else {
			var jsonArray = me.getLocStoreStore().getRange();
			}
			var resArray = new Array();
			var countNew = 0;
			
			
			for (var i = 0; i < jsonArray.length; i++) {
				store.each(function () {
						
					if (jsonArray[i].get('ano')==this.get('ano')){//Нужно: Сравниваем OrderAndWbStore с LocalStore
						
						
					Ext.Array.include( resArray, this/*.getData()*/ ); //insert into new array
					//console.log(resArray[i]);
					resArray[i].data['isredy'] = jsonArray[i].get('isredy');
					resArray[i].data['inway'] = jsonArray[i].get('inway');
					resArray[i].data['isview'] = jsonArray[i].get('isview');
					if(me.getLocStoFlagStore().getCount() > 0)
					if(me.getLocStoFlagStore().findRecord('ano', jsonArray[i].get('ano'))){
					resArray[i].data['tdd'] = jsonArray[i].get('tdd');
					resArray[i].data['rcpn'] = jsonArray[i].get('rcpn');
					}
					
					//me.getLocStoreStore().sync();
					
					Ext.Array.remove( records, this );// delete from OrderAndWbStore
					//Нужно: Присваиваем нужные поля из LocalStore
					}
				
				
				
				}) 
				
			
			}
			
			
			//console.log(jsonArray[0]);
			//console.log(resArray);
			//console.log(records);
			//console.log(store.getRange());
			Ext.Array.push( resArray, records );//add other records in new array
			me.getUchetsStore().loadRawData(resArray);//remove UchetsStore data
			//add data in UchetsStore from new array
			
			
			//this.getLocStoreStore().removeAt(0, this.getLocStoreStore().getCount());
			
			me.getLocStoreStore().remove(me.getLocStoreStore().getRange());
			me.getLocStoreStore().sync();
			
			if (resArray.length>0){
			
				for (var i = 0; i < resArray.length; i++)
				{
					countNew=countNew+resArray[i].get('isview');
					me.getLocStoreStore().add(resArray[i].data);
					me.getLocStoreStore().sync();
				}
				countNew=resArray.length-countNew
				if (countNew > 0) {
					me.getInfo().down('label[itemId=count]').setText("Количество новых заказов : " + countNew);
					}
			}
		}
	},
	test : function (but) {
	
	this.getLocStoFlagStore().load();
	console.log(this.getLocStoFlagStore().getCount());
	this.getLocStoFlagStore().remove(this.getLocStoFlagStore().getRange());
	this.getLocStoFlagStore().sync();
	console.log(this.getLocStoFlagStore().getCount());
	//this.getLocStoreStore().remove(this.getLocStoreStore().getRange());
	//this.getLocStoreStore().sync();
	//this.getLocStoreStore().load();
	//console.log(this.getLocStoreStore());
	},
	insertPod : function ( gridview, el, rowIndex, colIndex, e, rec, rowEl ) {
	//console.log();
		if ((!rec.data['tdd']) && (rec.data['rectype']==1)) {
			//this.insertNewDop(rec.data['wb_no'], rec.data['dtd_txt'], rec.data['tar_ag_id'], rec.data['req_tar_a']);
			//console.log('win');
			var newdop = Ext.widget('newpodwin').show();
			var formdop = newdop.down('newpodform');
			formdop.down('textfield[name=wb_no]').setValue(rec.data['displayno']);
			
		} else {
			//this.editDop(rec.data['wb_no'], rec.data['dtd_txt'], rec.data['tar_ag_id'], rec.data['req_tar_a'], rec.data['req_rem'])
		}
	},
	showDetails : function ( btn ) {
	
	var sm = btn.up('uchetlist').getSelectionModel();
		if (sm.getCount() > 0) {
			
			sm.getSelection()[0].set('isview', 1);	
			if (sm.getSelection()[0].get('rectype')==1){
	
					var wb = Ext.widget('wbwin').show();
			}
			if (sm.getSelection()[0].get('rectype')==0){
	
					var ord = Ext.widget('orderwin').show();
			}
		}
	},
	up : function ( btn ) {
	var sm = btn.up('uchetlist').getSelectionModel();
	//var rec = this.getUchetsStore().store.getAt(0));
	var sr = sm.getSelection();
	//sm.setPosition( 1, 2, true ); 
	sr.setPosition( 3, 5, true );
	//console.log(sr.getId());
	}
});
