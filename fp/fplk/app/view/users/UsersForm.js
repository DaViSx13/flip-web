Ext.define('fplk.view.users.UsersForm', {
	alias : 'widget.usersform',
	extend : 'Ext.form.Panel',
	layout : {
		type : 'vbox'
	},
	bodyPadding : 5,
	items : [{
			xtype : 'textfield',
			fieldLabel : 'Пользователь',
			maskRe : /\w/,
			labelAlign : 'top',
			width : 250,
			name : 'auser'
		}, {
			xtype : 'checkboxfield',
			boxLabel : 'Сменить пароль',
			itemId : 'changepass',
			hidden : true
		}, {
			xtype : 'textfield',
			fieldLabel : 'Новый пароль',
			labelAlign : 'top',
			width : 250,
			inputType : 'password',
			maskRe : /\w/,
			allowBlank : false,
			name : 'passfirst'
		}, {
			xtype : 'textfield',
			fieldLabel : 'Повторно пароль',
			labelAlign : 'top',
			width : 250,
			inputType : 'password',
			maskRe : /\w/,
			allowBlank : false,
			name : 'passsecond'
		}, {
			xtype : 'textfield',
			fieldLabel : 'CACC',
			maskRe : /\w/,
			labelAlign : 'top',
			allowBlank : false,
			width : 250,
			name : 'clientid'
		}, /*{
			xtype : 'combobox',
			labelAlign : 'top',
			width : 250,
			name : 'agents',
			displayField : 'displayname',
			valueField : 'partcode',
			fieldLabel : 'Выберите Агента',
			forceSelection : true,
			queryMode : 'local',
			allowBlank : false,
			store : 'AgentsListSt'
		},*/ {
			xtype : 'textfield',
			hidden : true,
			name : 'id'
		}
	]
});
