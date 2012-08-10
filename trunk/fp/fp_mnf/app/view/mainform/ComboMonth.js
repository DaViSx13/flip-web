Ext.define('FpMnf.view.mainform.ComboMonth', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.combomonth',
	
	hideLabel: true,
    //store: store,
    //displayField: 'state',
    //typeAhead: true,
    //queryMode: 'local',
    //triggerAction: 'all',
    emptyText:'Выберите месяц...',
    selectOnFocus:true,
	editable: false,
	allowBlank:false,
    width:135

    
    
    
});