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
	}
});
