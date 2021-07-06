Ext.define('fplk.view.other.UserInputField', {
	extend : 'Ext.form.ComboBox',
	alias : 'widget.userinputfield',
	forceSelection : false,
	hideTrigger : true,
	typeAhead: true,
	typeAheadDelay: 100,
	minChars: 2,
	queryMode: 'local',
	store: 'LocalQueries',
	displayField : 'data',
	valueField : 'data',
	listeners: {
		blur: {
			fn: function (field) {
				if(field.getValue()  != null) {
					field.getStore().clearFilter();
					field.getStore().filter('field', field.getName());
					if(field.getStore().find('data', field.getValue()) == -1) {
						field.getStore().add({
							data: field.getValue(),
							field: field.getName()
						})
						field.getStore().sync();
					}
				}
			}
		},
		focus: {
			fn: function (field) {
				field.getStore().clearFilter();
				field.getStore().filter('field', field.getName());
			}
		}
	}
});
