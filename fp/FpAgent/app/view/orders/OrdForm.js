Ext.define('FPAgent.view.orders.OrdForm', {
	alias : 'widget.ordform',
	extend : 'Ext.form.Panel',
	requires : ['FPAgent.view.orders.ComboCity'],
	layout : {
		type : 'absolute'
	},
	bodyPadding : '10 10 0 10',
	items : [{
			xtype : 'fieldset',
			id : 'fs1',
			height : 390,
			width : 360,
			title : FPAgent.lib.Translate.tr("OrdGrid.fs.Org"),//'Отправитель',
			x : 10,
			y : 0,
			items : [{
					xtype : 'combocity',
					name : 'org',
					store : 'CityStOrg'
				}, {
					xtype : 'textfield',
					name : 'rordnum',
					hidden : true
				}, {
					xtype : 'textfield',
					width : 337,
					name : 'cname',
					fieldLabel : FPAgent.lib.Translate.tr("OrdGrid.cname"),//'Название клиента',
					maxLength : 60,
					labelAlign : 'top',
					allowBlank : false,
				listeners:{
					afterrender:function(cmp){
						cmp.inputEl.set({
							autocomplete:'on'
						});
					}
				}
				}, {
					xtype : 'textfield',
					width : 337,
					name : 'address',
					maxLength : 200,
					fieldLabel : FPAgent.lib.Translate.tr("OrdGrid.address"),//'Адрес',
					labelAlign : 'top',
					allowBlank : false
				}, {
					xtype : 'textfield',
					width : 329,
					name : 'contname',
					fieldLabel : FPAgent.lib.Translate.tr("OrdGrid.contname"),//'Контактное лицо',
					maxLength : 50,
					labelAlign : 'top',
					anchor : '100%',
					allowBlank : false
				}, {
					xtype : 'textfield',
					name : 'contmail',
					fieldLabel : 'E-Mail',
					labelAlign : 'top',
					anchor : '100%',
					vtype : 'email'
				}, {
					xtype : 'textfield',
					width : 84,
					name : 'contphone',
					fieldLabel : FPAgent.lib.Translate.tr("OrdGrid.contphone"),//'Телефон',
					labelAlign : 'top',
					anchor : '100%',
					allowBlank : false
				}, {
					xtype : 'textareafield',
					name : 'orgrems',
					height : 75,
					maxLength : 1000,
					fieldLabel : FPAgent.lib.Translate.tr("OrdGrid.orgrems"),//'Примечание',
					labelAlign : 'top',
					anchor : '100%'
				}
			]
		}, {
			xtype : 'fieldset',
			height : 390,
			width : 360,
			title : FPAgent.lib.Translate.tr("OrdGrid.fs.dest"),//'Получатель',
			x : 390,
			y : 0,
			items : [{
					xtype : 'combocity',
					name : 'dest',
					store : 'CityStDes'
				}, {
					xtype : 'textfield',
					width : 337,
					name : 'dname',
					fieldLabel : FPAgent.lib.Translate.tr("OrdGrid.dname"),//'Название клиента',
					maxLength : 60,
					labelAlign : 'top',
					allowBlank : false
				}, {
					xtype : 'textfield',
					width : 337,
					name : 'dadr',
					maxLength : 200,
					fieldLabel : FPAgent.lib.Translate.tr("OrdGrid.dadr"),//'Адрес',
					labelAlign : 'top',
					allowBlank : false
				}, {
					xtype : 'textfield',
					width : 329,
					name : 'dcontname',
					maxLength : 50,
					fieldLabel : FPAgent.lib.Translate.tr("OrdGrid.dcontname"),//'Контактное лицо',
					labelAlign : 'top',
					anchor : '100%',
					allowBlank : false
				}, {
					xtype : 'textfield',
					name : 'dcontmail',
					fieldLabel : 'E-Mail',
					labelAlign : 'top',
					anchor : '100%',
					vtype : 'email'
				}, {
					xtype : 'textfield',
					width : 84,
					name : 'dcontphone',
					fieldLabel : FPAgent.lib.Translate.tr("OrdGrid.dcontphone"),//'Телефон',
					labelAlign : 'top',
					anchor : '100%',
					allowBlank : false
				}, {
					xtype : 'textareafield',
					name : 'destrems',
					height : 75,
					maxLength : 1000,
					fieldLabel : FPAgent.lib.Translate.tr("OrdGrid.destrems"),//'Примечание',
					labelAlign : 'top',
					anchor : '100%'
				}
			]
		}, {
			xtype : 'fieldset',
			height : 120,
			width : 360,
			title : FPAgent.lib.Translate.tr("OrdGrid.fs.date"),//'Дата приезда курьера',
			x : 10,
			y : 390,
			defaults : {
				anchor : '100%'
			},
			layout : 'anchor',
			items : [{
					xtype : 'datefield',
					name : 'courdate',
					fieldLabel : FPAgent.lib.Translate.tr("OrdGrid.courdate"),//'Дата',
					startDay : 1,
					format : 'd.m.Y',
					value : new Date(),
					allowBlank : false
				}, {
					xtype : 'textfield',
					name : 'courtimef',
					fieldLabel : FPAgent.lib.Translate.tr("OrdGrid.courtimef"),//'Время с',
					vtype: 'time'
				}, {
					xtype : 'textfield',
					name : 'courtimet',
					fieldLabel : FPAgent.lib.Translate.tr("OrdGrid.courtimet"),//'Время до',
					vtype: 'time'
				}
			]
		}, {
			xtype : 'fieldset',
			width : 360,
			title : FPAgent.lib.Translate.tr("OrdGrid.fs.cargo"),//'Информация о грузе',
			x : 390,
			y : 390,
			defaults : {
				anchor : '100%'
			},
			layout : 'anchor',
			items : [{
					xtype : 'combobox',
					name : 'type',
					displayField : 'Name',
					valueField : 'lowName',
					allowBlank : false,
					forceSelection : true,
					editable : false,
					fieldLabel : FPAgent.lib.Translate.tr("OrdGrid.type"),//'Тип груза',
					store : 'TypeSt',
					queryMode : 'local'
				}, {
					xtype : 'combobox',
					name : 'sortType',
					displayField : 'Name',
					valueField : 'lowName',
					multiSelect: true,
					forceSelection : true,
					editable : false,
					fieldLabel : 'Категория',
					store : 'SortTypeSt',
					queryMode : 'local',
					triggerAction: 'all',
					listConfig : {
						getInnerTpl : function(displayField) {
							return '<div class="x-combo-list-item"><img src="" class="chkCombo-default-icon chkCombo" /> {'+ displayField +'}</div>';
						}
					}
				},{
					xtype : 'numberfield',
					name : 'packs',
					minValue : 0,
					fieldLabel : FPAgent.lib.Translate.tr("OrdGrid.packs"),//'Число мест',
					allowBlank : false
				}, {
					xtype : 'numberfield',
					name : 'wt',
					minValue : 0,
					fieldLabel : FPAgent.lib.Translate.tr("OrdGrid.wt"),//'Вес',
					allowBlank : false
				}, {
					xtype : 'numberfield',
					name : 'volwt',
					minValue : 0,
					fieldLabel : FPAgent.lib.Translate.tr("OrdGrid.volwt")//'Объемный вес'
				}
			]
		}, {
			xtype : 'label',
			text : FPAgent.lib.Translate.tr("OrdGrid.desc"),//'*по умолчанию оплата заказчиком (агентом, размещающим заказ), в случае другой оплаты - просьба указывать это в примечании (отправитель/получатель, сумма)',
			x : 10,
			y : 510,
			width : 360
		}/*,{
		x : 10,
		y : 560,
        xtype: 'filefield',
        name: 'lf',
        fieldLabel: 'Файл',
        labelWidth: 50,
        msgTarget: 'side',
        
        //anchor: '100%',
		width : 700,
        buttonText: 'Выберите файл'
    }*/
	]
});
