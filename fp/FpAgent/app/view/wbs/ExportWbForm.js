Ext.define('FPAgent.view.wbs.ExportWbForm', {
	alias : 'widget.exportwbform',
	extend : 'Ext.form.Panel',
	//width : 200,
	//height : 100,
	/*layout : {
		type : 'hbox'
	},*/
	bodyPadding : 5,
	items : [{
        xtype: 'datefield',
        anchor: '100%',
		dataIndex: 'START_VALIDITY_DATE',
        fieldLabel: 'С',
        name: 'from_date',
		labelWidth: 50,
		format: 'd.m.Y',
        maxValue: new Date(),  // limited to the current date or prior
		value: new Date(),
		minValue: new Date(2021, 0, 1),
		validator:    function(value){
                                
                                //store the START_VALIDITY_DATE to compare it with the END_VALIDITY_DATE
                                startValidityDate=value;
                                if(typeof endValidityDate !== 'undefined'){
                                    if(startValidityDate <= endValidityDate){
                                        return true;
                                    }
                                    else{
                                        return false;
                                    }
                                }
                                else{
                                    return true;
                                }
                            }
    }, {
        xtype: 'datefield',
        anchor: '100%',
		dataIndex: 'END_VALIDITY_DATE',
        fieldLabel: 'до',
        name: 'to_date',
		labelWidth: 50,
		format: 'd.m.Y',
		maxValue: new Date(),
        value: new Date(),  // defaults to today
		validator: function(value){
                                
                                //store the END_VALIDITY_DATE to compare it with the START_VALIDITY_DATE
                                endValidityDate=value;
                                if(typeof startValidityDate !== 'undefined'){
                                    if(startValidityDate <= endValidityDate){
                                        return true;
                                    }
                                    else{
                                        return false;
                                    }
                                }
                            }
                        
    }
	]
});
