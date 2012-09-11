Ext.define('FpMnf.view.mainform.ComboAgent', {
	extend : 'Ext.form.ComboBox',
	alias : 'widget.comboagent',
	name : 'agents',
	displayField : 'partname',
	valueField : 'partcode',
	fieldLabel : 'Выберите Агента',
	width : 350,
	forceSelection : true,
	queryMode : 'local',
	style : {
		marginBottom : '2px',
		marginTop : '2px',
		marginLeft : '6px',
		marginRight : '2px'
	},
	store : 'AgentsSt'
});
