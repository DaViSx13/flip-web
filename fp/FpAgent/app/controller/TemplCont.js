Ext.define('FPAgent.controller.TemplCont', {
	extend : 'Ext.app.Controller',
	views : ['orders.TemplForm', 'orders.TemplWin', 'orders.TemplGrid'],
	models : ['TemplMod'],
	stores : ['TemplSt', 'CityStOrg', 'CityStDes'],
	refs : [{
			ref : 'TemplForm',
			selector : 'templform'
		}, {
			ref : 'TemplTool',
			selector : 'templtool'
		}
	],
	init : function () {
		this.control({
			'templtool button[action=newtpl]' : {
				click : this.clkNew
			},
			'templtool button[action=edittpl]' : {
				click : this.clkEdit
			},
			'templwin button[action=save]' : {
				click : this.saveTempl
			},
			'templtool button[action=deltpl]' : {
				click : this.delTempl
			},
			'templgrid > tableview' : {
				itemdblclick : this.dblclickTpl
			}
		});
	},
	dblclickTpl : function (gr, rec) {		
		this.clkEdit(this.getTemplTool().down('button[action=edittpl]'));
	},
	clkNew : function (btn) {
		var win = Ext.widget('templwin');
		win.show();
		win.down('templform').down('textfield[name=templatename]').focus(false, true);
	},
	delTempl : function (btn) {
		var me = this;
		var sm = btn.up('templgrid').getSelectionModel();
		if (sm.getCount() > 0) {
			Ext.Ajax.request({
				url : 'srv/data.php',
				params : {
					dbAct : 'DelAgTemplates',
					id : sm.getSelection()[0].get('id')
				},
				success : function (response) {
					jData = Ext.decode(response.responseText);
					Ext.Msg.alert(FPAgent.lib.Translate.tr("TemplCont.DeleteOkHead")/*'Успешное удаление!'*/, FPAgent.lib.Translate.tr("TemplCont.DeleteOkBody")/*'Шаблон удален: '*/ + jData.msg);
					me.getTemplStStore().reload();
				},
				failure : function (response) {
					jData = Ext.decode(response.responseText);
					Ext.Msg.alert(FPAgent.lib.Translate.tr("Error")/*'Ошибка!'*/, FPAgent.lib.Translate.tr("TemplCont.DeleteErrorBody")/*'Не удалось удалить шаблон: '*/ + jData.msg);
				}
			});
		} else {
			Ext.Msg.alert(FPAgent.lib.Translate.tr("Alert")/*'Внимание!'*/, FPAgent.lib.Translate.tr("TemplCont.GetTemplateDeleteBody")/*'Выберите шаблон для удаления'*/);
		}
	},
	clkEdit : function (btn) {
		var sm = btn.up('templgrid').getSelectionModel();
		if (sm.getCount() > 0) {
			var win = Ext.widget('templwin');
			var form = win.down('templform');
			var record = sm.getSelection()[0];
			form.loadRecord(record);
			var cb_org = form.down('combocity[name=org]');
			cb_org.store.load({
				params : {
					query : cb_org.getValue()
				}
			});
			if (record.data['orgcode'] != 0)
			cb_org.select(record.data['orgcode']);
			var cb_des = form.down('combocity[name=dest]');
			cb_des.store.load({
				params : {
					query : cb_des.getValue()
				}
			});
			if (record.data['destcode'] != 0)
			cb_des.select(record.data['destcode']);
			form.down('textfield[name=templatename]').focus(false, true);
		} else {
			Ext.Msg.alert(FPAgent.lib.Translate.tr("Alert")/*'Внимание!'*/, FPAgent.lib.Translate.tr("TemplCont.GetTemplateEditBody")/*'Выберите шаблон для редактирования'*/);
		}
	},
	saveTempl : function (btn) {
		var me = this;
		var win = btn.up('templwin');
		var form_ord = win.down('templform');
		var org = form_ord.down('combocity[name=org]');
		var dest = form_ord.down('combocity[name=dest]');
		if (org.value == null) {
			var jsonArrayOrg = this.getCityStOrgStore().data.items;
			if (jsonArrayOrg.length == 0) {
				Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.CityError")/*'Ошибка ввода города'*/,FPAgent.lib.Translate.tr("OrdsCont.CitySenderError")/*'Неверно введен город Отправителя! Выберите город из выпадающего списка.'*/);
				return;
			};
			for (var i = 0; i < jsonArrayOrg.length; i++) {
				if (jsonArrayOrg[i].get('fname') == Ext.util.Format.trim(org.getValue())) {
					org.setValue(jsonArrayOrg[i].data.code);
					break;
				};
			};
			if (org.value == null) {
				Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.CityError")/*'Ошибка ввода города'*/, FPAgent.lib.Translate.tr("OrdsCont.CitySenderError")/*'Неверно введен город Отправителя! Выберите город из выпадающего списка.'*/);
				return;
			};
		}
		if (dest.value == null) {
			var jsonArrayDes = this.getCityStDesStore().data.items;
			if (jsonArrayDes.length == 0) {
				Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.CityError")/*'Ошибка ввода города'*/, FPAgent.lib.Translate.tr("OrdsCont.CityRecipientError")/*'Неверно введен город Получателя! Выберите город из выпадающего списка.'*/);
				return;
			};
			for (var i = 0; i < jsonArrayDes.length; i++) {
				if (jsonArrayDes[i].get('fname') == Ext.util.Format.trim(dest.getValue())) {
					dest.setValue(jsonArrayDes[i].data.code);
					break;
				};
			};
			if (dest.value == null) {
				Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.CityError")/*'Ошибка ввода города'*/, FPAgent.lib.Translate.tr("OrdsCont.CityRecipientError")/*'Неверно введен город Получателя! Выберите город из выпадающего списка.'*/);
				return;
			};
		}
		if (form_ord.getForm().isValid()) {
			form_ord.submit({
				url : 'srv/data.php',
				params : {
					dbAct : 'SetAgTemplates'
				},
				submitEmptyText : false,
				success : function (form, action) {
					form.reset();
					me.getTemplForm().up('templwin').close();
					me.getTemplStStore().reload();
					Ext.Msg.alert(FPAgent.lib.Translate.tr("TemplCont.TemplateSaveOkHead")/*'Шаблон сохранен!'*/, FPAgent.lib.Translate.tr("TemplCont.TemplateSaveOkBody")/*'Сохранение шаблона заказа прошло успешно '*/ +' - '+action.result.msg);
				},
				failure : function (form, action) {
					Ext.Msg.alert(FPAgent.lib.Translate.tr("TemplCont.TemplateSaveErrorHead")/*'Ошибка сохранения'*/, FPAgent.lib.Translate.tr("TemplCont.TemplateSaveErrorBody")/*'Шаблон заказа не сохранен! '*/ + action.result.msg);
				}
			});
		} else {
			Ext.Msg.alert(FPAgent.lib.Translate.tr("OrdsCont.FieldIsEmptyHead")/*'Не все поля заполнены'*/, FPAgent.lib.Translate.tr("OrdsCont.FieldIsEmptyBody")/*'Откорректируйте информацию'*/)
		}
	}
});
