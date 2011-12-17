
Ext.require(['Ext.panel.Panel', 'Ext.layout.container.Table']);

Ext.onReady(function() {
    //Create the spotlight component
    var spot = Ext.create('Ext.ux.Spotlight', {
        easing: 'easeOut',
        duration: 300
    });

    //Create a DemoPanel which is the base for each panel in the example
    Ext.define('DemoPanel', {
        extend: 'Ext.form.Panel',

        title: 'Новый заказ',
        frame: true,
        //width: 300,
       // height: 200,
        //html: 'Здесь куча полей',
       // bodyStyle: 'padding:5px;',

        /**
         * Custom method which toggles a Ext.Button for the current panel on/off depending on the only argument
         */
        /*toggle: function(on) {
            var btns = this.dockedItems.last(),
                btn = btns.items.first();

            if (btn) {
                btn.setDisabled(!on);
            }
        }*/
    });
	
	Ext.define("Post", {
        extend: 'Ext.data.Model',
        proxy: {
            type: 'ajax',
            url : 'getCityList.php',
            reader: {
                type: 'json',
                //root: 'topics',
                //totalProperty: 'totalCount'
            }
        },

        fields: [
            {name: 'code'},
            {name: 'fname'}
          
        ]
    });
	
	
	MyJsonStore = Ext.create('Ext.data.Store', {
       
	   autoLoad: true,
            storeId: 'MyJsonStore',
            proxy: {
                type: 'ajax',
                url: 'GetAgOrders.php',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'ROrdNum'
                },
				{
					name: 'DateIn'//,type: 'date'//, dateFormat: 'n/j h:ia'
				},
                {
                    name: 'ORGCity'
                },
                {
                    name: 'CName'
                },
                {
                    name: 'DESTCity'
                },
                {
                    name: 'DName'
                },
                {
                    name: 'Packs'
                },
                {
                    name: 'Wt'
                },
                {
                    name: 'VolWt'
                }
            ]
	   
	   
    });
	
	
	
	
pg = Ext.create('Ext.panel.Panel', {
    renderTo: 'start-ct',//Ext.getBody(),

    height: 500,
    width: 864,
    layout: {
     //   align: 'stretchmax',
     //   type: 'vbox'
    },
	
	items: [
                {
                    xtype: 'gridpanel',
                    autoShow: true,
                    height: 500,
                    width: 864,
                    title: 'Список агентских заказов',
                    store: MyJsonStore,
                    //flex: 1,
                    viewConfig: {

                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 47,
							
                            dataIndex: 'ROrdNum',
                            text: '№'
                        },
						{
							xtype: 'gridcolumn',
							
                            width: 70,
                            dataIndex: 'DateIn',
							
                            text: 'Дата'
						},
                        {
                            xtype: 'gridcolumn',
                            width: 114,
							
                            dataIndex: 'ORGCity',
                            text: 'Город'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 194,
							
                            dataIndex: 'CName',
                            text: 'Отправитель'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 114,
							
                            dataIndex: 'DESTCity',
                            text: 'Город'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 194,
							
                            dataIndex: 'DName',
                            text: 'Получатель'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 41,
							
                            dataIndex: 'Packs',
                            text: 'Кол.'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 51,
							
                            dataIndex: 'Wt',
                            text: 'Вес'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 51,
							
                            dataIndex: 'VolWt',
                            text: 'Об. вес'
                        }
                    ]
                }
            ]
			});

			
			
			
			
    ds = Ext.create('Ext.data.Store', {
       // pageSize: 10,
        model: 'Post'
    });
	ds2 = Ext.create('Ext.data.Store', {
       // pageSize: 10,
        model: 'Post'
    });

    var p1/*, p2, p3*/;
	
    /**
     * Method which changes the spotlight to be active on a spefied panel
     */
    var updateSpot = function(id) {
        if (typeof id == 'string') {
			pg.setVisible(false);
			b.setVisible(false);
		    p1.setVisible(true);
            spot.show(id);
			
        } else if (!id && spot.active) {
			
            spot.hide();
			p1.setVisible(false);
			pg.setVisible(true);
			b.setVisible(true);
       }

       // p1.toggle(id == p1.id);
      //  p2.toggle(id == p2.id);
       // p3.toggle(id == p3.id);
		
    };

   /*Ext.createWidget('panel', {
        renderTo: 'vvod',//Ext.getBody(),

        layout: 'absolute',
        id: 'demo-ct',
        border: false,

        layoutConfig: {
            columns: 1
        },

        items: [*/
        p1 = Ext.create('DemoPanel', {
            id: 'panel1',
			
			renderTo: 'start-ct',
            buttons: [{
                text: 'Сохранить',
                //disabled: true,
				handler: function() {
                    
					var form = this.up('form').getForm();
					
					if (form.isValid()) { // make sure the form contains valid data before submitting
                    form.submit({
						url: 'SaveAgOrder.php',
						submitEmptyText: false,
                        success: function(form, action) {
                           Ext.Msg.alert('Все ок!', action.result.msg);
						   form.reset();
						   updateSpot(false);
						  MyJsonStore.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Плоха все!', action.result.msg);
                        }
                    });
					
					
                } else { // display error alert if the data is invalid
                    Ext.Msg.alert('Не все поля заполнены', 'Откорректируйте информацию')
                }
				
            }
					
					//this.up('form').getForm().submit({
                    
                    //submitEmptyText: false
                    //waitMsg: 'Saving Data...'
					
                //});
				
            },{
			text: 'Отменить',
			handler: function() {
			this.up('form').getForm().reset();
			updateSpot(false);
			MyJsonStore.load();
			}
			}
			
			],
			height: 610,
            width: 763,
			layout: {
				type: 'absolute'
					},
			bodyPadding: 10,
			/* items: [{
            xtype: 'combobox',
            store: ds,
            displayField: 'fname',
            typeAhead: false,
            hideLabel: true,
            queryMode: 'remote',
			valueField: 'code',
            anchor: '100%'}]*/
			
			items: [
                {
                    xtype: 'fieldset',
                    height: 380,
                    width: 360,
                    title: 'Отправитель',
                    x: 10,
                    y: 0,
                    items: [
                        {
                            xtype: 'combobox',
                            width: 330,
                            name: 'org',
                            fieldLabel: 'Город',
                            labelAlign: 'top',
                            displayField: 'fname',
                            store: ds,
                            valueField: 'code',
							allowBlank:false
                        },
                        {
                            xtype: 'textfield',
                            width: 330,
                            name: 'cname',
                            fieldLabel: 'Название клиента',
							maxLength:60,
                            labelAlign: 'top',
							allowBlank:false
                        },
                        {
                            xtype: 'textfield',
                            width: 337,
                            name: 'address',
							maxLength:70,
                            fieldLabel: 'Адрес',
                            labelAlign: 'top',
							allowBlank:false
                        },
                        {
                            xtype: 'textfield',
                            width: 329,
                            name: 'contname',
                            fieldLabel: 'Контактное лицо',
							maxLength:50,
                            labelAlign: 'top',
                            anchor: '100%',
							allowBlank:false
                        },
                        {
                            xtype: 'textfield',
                            name: 'contmail',
                            fieldLabel: 'E-Mail',
                            labelAlign: 'top',
                            anchor: '100%',
							vtype:'email'
                        },
                        {
                            xtype: 'textfield',
                            width: 84,
                            name: 'contphone',
                            fieldLabel: 'Телефон',
                            labelAlign: 'top',
                            anchor: '100%',
							allowBlank:false
                        },
                        {
                            xtype: 'textareafield',
                            name: 'orgrems',
							height: 80,
							maxLength:1000,
                            fieldLabel: 'Примечание',
                            labelAlign: 'top',
                            anchor: '100%'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    height: 380,
                    width: 360,
                    title: 'Получатель',
                    x: 390,
                    y: 0,
                    items: [
                        {
                            xtype: 'combobox',
                            width: 330,
                            name: 'dest',
                            fieldLabel: 'Город',
                            labelAlign: 'top',
                            displayField: 'fname',
                            store: ds2,
                            valueField: 'code',
							allowBlank:false
                        },
                        {
                            xtype: 'textfield',
                            width: 330,
                            name: 'dname',
                            fieldLabel: 'Название клиента',
							maxLength:60,
                            labelAlign: 'top',
							allowBlank:false
                        },
                        {
                            xtype: 'textfield',
                            width: 337,
                            name: 'dadr',
							maxLength:70,
                            fieldLabel: 'Адрес',
                            labelAlign: 'top',
							allowBlank:false
                        },
                        {
                            xtype: 'textfield',
                            width: 329,
                            name: 'dcontname',
							maxLength:50,
                            fieldLabel: 'Контактное лицо',
                            labelAlign: 'top',
                            anchor: '100%',
							allowBlank:false
                        },
                        {
                            xtype: 'textfield',
                            name: 'dcontmail',
                            fieldLabel: 'E-Mail',
                            labelAlign: 'top',
                            anchor: '100%',
							vtype:'email'
                        },
                        {
                            xtype: 'textfield',
                            width: 84,
                            name: 'dcontophone',
                            fieldLabel: 'Телефон',
                            labelAlign: 'top',
                            anchor: '100%',
							allowBlank:false
                        },
                        {
                            xtype: 'textareafield',
                            name: 'destrems',
							height: 80,
							maxLength:1000,
                            fieldLabel: 'Примечание',
                            labelAlign: 'top',
                            anchor: '100%'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    height: 150,
                    width: 360,
                    layout: {
                        type: 'absolute'
                    },
                    title: 'Стоимость доставки',
                    x: 10,
                    y: 390,
                    items: [
                        {
                            xtype: 'numberfield',
                            width: 320,
                            name: 'amt',
							minValue: 0,
                            fieldLabel: 'Сумма',
                            x: 10,
                            y: 50
                        },
                        {
                            xtype: 'combobox',
                            width: 320,
                            name: 'curid',
							displayField: 'Name',
							valueField: 'lowName',
							forceSelection: true,
							typeAhead: true,
                            fieldLabel: 'Валюта',
							store: Ext.create('Ext.data.Store', {
                        fields: ['Name', 'lowName'],
                        data : [
								{ Name: 'Российские рубли',    lowName: '0' },
								{ Name: 'Доллары США', lowName: '1' },
								{ Name: 'Евро', lowName: '2' }
        
								]
                    }),
                            x: 10,
                            y: 90
                        },
                        {
                            xtype: 'combobox',
                            width: 320,
                            name: 'paytype',
							displayField: 'Name',
							valueField: 'lowName',
							allowBlank:false,
							forceSelection: true,
							typeAhead: true,
                            fieldLabel: 'Вид оплаты',
							store: Ext.create('Ext.data.Store', {
                        fields: ['Name', 'lowName'],
                        data : [
								{ Name: 'Наличный',    lowName: '0' },
								{ Name: 'Безналичный', lowName: '1' }
        
								]
                    }),
                            x: 10,
                            y: 10
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    height: 150,
                    width: 360,
                    title: 'Информация о грузе',
                    x: 390,
                    y: 390,
					
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'type',
							displayField: 'Name',
							valueField: 'lowName',
							allowBlank:false,
							forceSelection: true,
							typeAhead: true,
                            fieldLabel: 'Тип груза',
							store: Ext.create('Ext.data.Store', {
                        fields: ['Name', 'lowName'],
                        data : [
								{ Name: 'Документ',    lowName: '1' },
								{ Name: 'Не документ', lowName: '0' },
								{ Name: 'Опасный груз', lowName: '3' }
        
								]
                    }),
                            labelAlign: 'top',
                            anchor: '100%'
                        },
                        {
                            xtype: 'numberfield',
                            name: 'packs',
							minValue: 0,
                            fieldLabel: 'Число мест',
                            anchor: '100%',
							allowBlank:false
                        },
                        {
                            xtype: 'numberfield',
                            name: 'wt',
							minValue: 0,
                            fieldLabel: 'Вес',
                            anchor: '100%',
							allowBlank:false
                        },
                        {
                            xtype: 'numberfield',
                            name: 'volwt',
							minValue: 0,
                            fieldLabel: 'Объемный вес',
                            anchor: '100%'
                        }
                    ]
                }
            ]
			
			
        });
		
		
  b = Ext.create('Ext.button.Button', {
        text: 'Новый заказ',
        renderTo: 'start-ct',
        handler: function() {
            updateSpot('panel1')
			
        }
    });
	
	p1.setVisible( false);
});
