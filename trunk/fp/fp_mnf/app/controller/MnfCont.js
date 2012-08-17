Ext.define('FpMnf.controller.MnfCont', {
    extend: 'Ext.app.Controller',
    views: ['mainform.MnfGrid', 'mainform.MnfPanel','mainform.NumYear', 'mainform.ComboMonth'],
	models: ['MnfMod', 'WbMod'],
    stores: ['MnfSt', 'aMonths', 'WbSt'],


    init: function() {
		this.control({   
			'mnfpanel': {
                activate: this.loadMnf
            },
			'mnfgrid button[action=out]': {
                 click: this.openOutmnf
            },
			'mnfgrid button[action=in]': {
                 click: this.openInmnf
            },
			'mnfgrid button[action=all]': {
                 click: this.openAllmnf
            },
			'mnfgrid combomonth': {
                  change: this.monthChange
            },
			'mnfgrid numyear': {
                  change: this.yearChange
            },
			'mnfgrid': {
                selectionchange: this.previewWb
            }
		});
		
		/* this.getMnfStStore().on({
            scope: this,
            beforeload : this.loadMnf
        });*/
    },

	loadMnfAll: function(y, m, tab){
	
	this.getMnfStStore().load({
                params: {
                    proc: 'GetMnf',
					period: y+m, 
					is_Ready:tab
                }
            });
	
	},
	
    loadMnf: function(ThePanel) {
	
	this.openOutmnf(ThePanel.down('button[action=out]'));
	/*
	var y = Ext.widget('numyear').value;
	var m = Ext.widget('combomonth').value;
	this.loadMnfAll(y, m,1);*/
	     //console.log(test.value); 
    },
	openOutmnf: function(btn) {
		btn.toggle(true);
		var aTol = btn.up('mnftool');
		aTol.down('button[action=in]').toggle(false);
		aTol.down('button[action=all]').toggle(false);
		
		var mo = aTol.down('combomonth').value;
		var ye = aTol.down('numyear').value;
		//console.log(ye+mo);
		this.loadMnfAll(ye, mo, -1);
	
	},
	openInmnf: function(btn) {
		btn.toggle(true);
		var aTol = btn.up('mnftool');
		aTol.down('button[action=out]').toggle(false);
		aTol.down('button[action=all]').toggle(false);
		var mo = aTol.down('combomonth').value;
		var ye = aTol.down('numyear').value;
		//console.log(ye+mo);
		this.loadMnfAll(ye, mo, 2);
		
	},
	openAllmnf: function(btn) {
		btn.toggle(true);
		var aTol = btn.up('mnftool');
		aTol.down('button[action=out]').toggle(false);
		aTol.down('button[action=in]').toggle(false);
		var mo = aTol.down('combomonth').value;
		var ye = aTol.down('numyear').value;
		//console.log(ye+mo);
		this.loadMnfAll(ye, mo, 3);
	
	},
	 monthChange: function(comp, newz, oldz) {
	 
	 var aTol = comp.up('mnftool');
	 var ye = aTol.down('numyear').value;
	 
	if(aTol.down('button[action=out]').pressed==true){var tab=-1};
	if(aTol.down('button[action=in]').pressed==true){var tab=2};
	if(aTol.down('button[action=all]').pressed==true){var tab=3};
	
	 this.loadMnfAll(ye, newz, tab);
	 },
	yearChange: function(comp, newz, oldz) {
	 
	 var aTol = comp.up('mnftool');
	 var mo = aTol.down('combomonth').value;
	 
	if(aTol.down('button[action=out]').pressed==true){var tab=-1};
	if(aTol.down('button[action=in]').pressed==true){var tab=2};
	if(aTol.down('button[action=all]').pressed==true){var tab=3};
	
	 this.loadMnfAll(newz, mo, tab);
	 },
	previewWb: function(gr, mnf) {	 
	
	//console.log(gr.isSelected(mnf[0]));
	if(gr.isSelected(mnf[0])==true){var No=mnf[0].data['mnfrefno'];} else {var No=null}
	
		this.getWbStStore().load({
                params: {
                    proc: 'GetWbMnf',
					mnfRefNo: No//mnf[0].data['mnfrefno'] 
                }
            });
		
	}
	 
});

