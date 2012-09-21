Ext.define('Courier.controller.UchetList', {
	extend : 'Ext.app.Controller',
	views : ['UchetList', 'Info'],
	models : ['Courier'],
	stores : ['OrderAndWb', 'Uchets'],
	refs : [{
			ref : 'infoPanel',
			selector : 'info'
		}
	],
	init : function () {
		console.log('Initialized UchetList controller');
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
		console.log('wbs store loaded');
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
			console.log(resArray);
			console.log(records);
			Ext.Array.push( resArray, records );//add other records in new array
			this.getUchetsStore().loadData(resArray);//remove UchetsStore data
			//add data in UchetsStore from new array
		}
	}
});
