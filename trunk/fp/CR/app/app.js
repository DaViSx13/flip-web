Ext.application({
	name : 'Courier',
	autoCreateViewport : true,
	controllers : ['Loginform', 'Info', 'UchetList'],
	launch : function () {
		//messagebox localization fix
		if (Ext.MessageBox) {
			Ext.MessageBox.buttonText = {
				ok : "OK",
				cancel : "Отмена",
				yes : "Да",
				no : "Нет"
			}
		};
		
		// custom Vtype for vtype:'time'
		var timeTest = /^(([0,1][0-9])|(2[0-3])):([0-5][0-9])$/i;
		Ext.apply(Ext.form.field.VTypes, {
			//  vtype validation function
			time : function (val, field) {
				if (val.length == 2 && val.indexOf(':') == -1) {
					val += ':';
					field.setValue(val)
				};
				return timeTest.test(val);
			},
			// vtype Text property: The error text to display when the validation function returns false
			timeText : 'Время в формате HH:MM',
			// vtype Mask property: The keystroke filter mask
			timeMask : /[\d:]/i
		});
		
	}
});
