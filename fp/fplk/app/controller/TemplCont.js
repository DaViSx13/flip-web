Ext.define('fplk.controller.TemplCont', {
	extend : 'Ext.app.Controller',
	views : ['orders.TemplForm', 'orders.TemplWin', 'orders.TemplGrid'],
	models : ['TemplMod'],
	stores : ['TemplSt', 'ClientSt'],
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
			},
			'textfield[name=filterByName]': {
				"change" : this.searchByNameEvent
			}
		});
	},

	/**
	 * Фильтрация по наименованию шаблонов.
	 * @param component Поле наименование
	 * @param newValue Новое значение
	 */
	searchByNameEvent : function(component, newValue) {
	  var grid = component.up("tabpanel").down("grid");
	  if(newValue.length == 0)
	  	grid.getStore().clearFilter();
	  else
	  	grid.getStore().filter("templatename", newValue);
	},

	dblclickTpl : function (gr, rec) {		
		this.clkEdit(this.getTemplTool().down('button[action=edittpl]'));
	},
	clkNew : function (btn) {
		var win = Ext.widget('templwin');
		win.show();
		win.down('templform').down('textfield[name=templatename]').focus(false, true);		
		if (this.getClientStStore().getCount() > 0){
		//auto sender begin
		client = this.getClientStStore().first();
		//мухлеж		
		client.set('org', client.get('city'));
		client.set('orgcode', client.get('cityid'));	
		
		formt = win.down('templform');
		formt.loadRecord(client);
		
		var cb_org = formt.down('combocity[name=org]');
		cb_org.store.load({
			params : {
				query : client.get('org')
			}
		});
		cb_org.select(client.get('orgcode'));
		//auto sender end
		}
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
					Ext.Msg.alert('Успешное удаление!', 'Шаблон удален: ' + jData.msg);
					me.getTemplStStore().reload();
				},
				failure : function (response) {
					jData = Ext.decode(response.responseText);
					Ext.Msg.alert('Ошибка!', 'Не удалось удалить шаблон: ' + jData.msg);
				}
			});
		} else {
			Ext.Msg.alert('Внимание!', 'Выберите шаблон для удаления');
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
			if (record.data['orgcode']>0){
			cb_org.select(record.data['orgcode']);
			}
			var cb_des = form.down('combocity[name=dest]');
			cb_des.store.load({
				params : {
					query : cb_des.getValue()
				}
			});
			if (record.data['destcode']>0){
			cb_des.select(record.data['destcode']);
			}
			form.down('textfield[name=templatename]').focus(false, true);
		} else {
			Ext.Msg.alert('Внимание!', 'Выберите шаблон для редактирования');
		}
	},
	saveTempl : function (btn) {
		var me = this;
		var win = btn.up('templwin');
		var form_ord = win.down('templform');		
		var dest = form_ord.down('combocity[name=dest]');
		
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
					Ext.Msg.alert('Шаблон сохранен!', 'Сохранение шаблона заказа прошло успешно ' + action.result.msg);
				},
				failure : function (form, action) {
					Ext.Msg.alert('Ошибка сохранения', 'Шаблон заказа не сохранен! ' + action.result.msg);
				}
			});
		} else {
			Ext.Msg.alert('Не все поля заполнены', 'Откорректируйте информацию')
		}
	}
});
