Ext.define('FPAgent.lib.Miscutils', {
	singleton : true,
	//requires : ['Ext.util.Cookies'],

	miscFN: function(){
		console.log('Miscutils miscFN');
	},
	GetFormattedDate : function (todayTime) {    
		var month = todayTime.substring(3, 5);
		var day = todayTime.substring(0, 2);
		var year = todayTime.substring(6, 10);
		return year+''+month+''+day;
	},
	checkSession: function(){
		console.log('Miscutils checkSession');
		Ext.Ajax.request({
			url : 'srv/launch.php',
			success : function (response) {
				var text = Ext.decode(response.responseText);
				if (text.success == false) {
					Ext.getDoc().dom.location.reload();
				}
			},
			failure : function (response) {
				//Ext.Msg.alert(/*'Ошибка'*/FPAgent.lib.Translate.tr("Error"), FPAgent.lib.Translate.tr("ServerdDown")/*'checkSession - Сервер недоступен!*/+ ' - ' + response.statusText);
			}
		});
		
	}
});