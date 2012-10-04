Ext.define('Courier.controller.UchetList', {
	extend : 'Ext.app.Controller',
	views : ['UchetList', 'Info', 'NewPodWin', 'NewPodForm', 'WbWin', 'OrderWin', 'OrderForm'],
	models : ['Courier'],
	stores : ['OrderAndWb', 'Uchets'],
	refs : [{
			ref : 'infoPanel',
			selector : 'info'
		}		
	],
	init : function () {
		this.control({
			'uchetlist gridcolumn[itemId=pod]' : {
				click : this.insertPod
			},
			'uchetlist gridcolumn[itemId=0]' : {
				click : this.showDetails
			},
			'uchetlist gridcolumn[itemId=1]' : {
				click : this.showDetails
			},
			'uchetlist gridcolumn[itemId=2]' : {
				click : this.showDetails
			},
			'uchetlist gridcolumn[itemId=3]' : {
				click : this.showDetails
			},
			'uchetlist gridcolumn[itemId=4]' : {
				click : this.showDetails
			},
			'uchetlist gridcolumn[itemId=5]' : {
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
	makeUchetList : function (store, records, success) {
		//console.log('wbs store loaded');
		var me = this;
		if (success) {
			//this.getUchetsStore().add(records);
			var jsonArray = me.getUchetsStore().data.items;
			var resArray = new Array();

			for (var i = 0; i < jsonArray.length; i++) {
				store.each(function () {
				
					if (jsonArray[i].get('displayno')==this.get('displayno')){
						//console.log(jsonArray[i].get('displayno') + ' ' + this.get('displayno'));
						
					Ext.Array.include( resArray, this ); //insert into new array
					Ext.Array.remove( records, this );// delete from OrderAndWbStore
					}
				
				
				
				}) 
				
			
			}
			//console.log(jsonArray);
			//console.log(resArray);
			//console.log(records);
			Ext.Array.push( resArray, records );//add other records in new array
			this.getUchetsStore().loadData(resArray);//remove UchetsStore data
			//add data in UchetsStore from new array
		}
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
	showDetails : function ( gridview, el, rowIndex, colIndex, e, rec, rowEl ) {
	//console.log(rec);
	//console.log(gridview);
	if (rec.data['rectype']==1){
	
	var wb = Ext.widget('wbwin').show();
	}
	if (rec.data['rectype']==0){
	
	var ord = Ext.widget('orderwin').show();
	}
	}
});
