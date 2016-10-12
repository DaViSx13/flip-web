Ext.define('FPAgent.lib.Translate', {
	singleton : true,
	requires : ['Ext.util.Cookies'],
	currentLocale : "en",

	tr : function (stringID) {
		var locString;
		for (var i = 0; i < this.data.length; i++) {
			if (this.data[i].stringID == stringID) {
				locString = this.data[i];
				break;
			};
		}

		var cookieLocale = Ext.util.Cookies.get("myLang");
		if (cookieLocale) {
			this.currentLocale = cookieLocale;
		}

		return locString ? locString[this.currentLocale] : stringID;
	},

	data : [{
			stringID : 'nameLabel',
			en : 'Login',
			ru : 'Пользователь'
		}, {
			stringID : 'passwordLabel',
			en : 'Password',
			ru : "Пароль"
		}
	]

}, function () {
	__ = function (stringID) {
		return FPAgent.lib.Translate.tr(stringID);
	}
});
