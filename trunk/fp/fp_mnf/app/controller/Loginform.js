Ext.define('FpMnf.controller.Loginform', {
	extend : 'Ext.app.Controller',
	views : ['mainform.Loginform', 'mainform.MainPanel', 'mainform.Loginformcontainer', 'Viewport'],
	refs : [{
			ref : 'OrdTool',
			selector : 'ordtool'
		}, {
			ref : 'MnfTool',
			selector : 'mnftool'
		}, {
			ref : 'WbsTool',
			selector : 'wbstool'
		}
	],
	init : function () {
		this.control({
			'loginform button[action=login]' : {
				click : this.doLogin
			}
		});
	},
	onLaunch : function () {
		var me = this;
		Ext.Ajax.request({
			url : 'srv/launch.php',
			success : function (response) {
				var text = Ext.decode(response.responseText);
				if (text.success == true) {
					var aviewport = Ext.widget('fpmnfviewport');
					aviewport.removeAll(true);
					aviewport.add(Ext.widget('mainpanel'));
					if (text.msg == '-1') {
						
						me.getOrdTool().down('comboagent').up('buttongroup').setVisible(true);
						me.getMnfTool().down('comboagent').up('buttongroup').setVisible(true);
						me.getWbsTool().down('comboagent').up('buttongroup').setVisible(true);
					}
				} else {
					var aviewport = Ext.widget('fpmnfviewport');
				}
			},
			failure : function (response) {
				Ext.Msg.alert('Сервер недоступен!', response.statusText);
			}
		});
	},
	doLogin : function (button) {
		var me = this;
		var form = button.up('form').form;
		if (form.isValid()) {
			form.submit({
				url : 'srv/login.php',
				scope : this,
				success : function (form, action) {
					var aviewport = button.up('viewport');
					aviewport.removeAll(true);
					aviewport.add(Ext.widget('mainpanel'));
					if (action.result.msg == '-1') {
						
						me.getOrdTool().down('admgroup').setVisible(true);
						me.getMnfTool().down('admgroup').setVisible(true);
						me.getWbsTool().down('admgroup').setVisible(true);
					}
				},
				failure : function (form, action) {
					Ext.Msg.alert('Ошибка', action.result.msg);
				}
			});
		}
	}
});
