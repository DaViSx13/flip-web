Ext.define('FPAgent.lib.Translate', {
	//extend : 'Ext.Base',
	singleton : true,

	//statics : {
		currentLocale : "en",

		nameLabel : {
			en : "Login",
			ru : "Пользователь"
		},
		passwordLabel : {
			en : "Password",
			ru : "Пароль"
		},

		test : {
			en : "HellO",
			ru : "ПревеД"
		},

		tr : function (stringID) {
			eval("str = this." + stringID);
			return str[this.currentLocale];
			//return "qwerty"
		}
	//}
}, function () {
	__ = function (stringID) {
		return FPAgent.lib.Translate.tr(stringID);
	}
});
