
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
	
 Ext.define('Order', {
        extend: 'Ext.data.Model',
		
        fields: [
            {name:'org'},
			{name:'orgcode'},
            {name:'cname'},
			{name:'curid'},
			{name:'address'},
			{name:'contname'},
			{name:'contmail'},
			{name:'contphone'},
			{name:'orgrems'},
			{name:'dest'},
			{name:'destcode'},
			{name:'dname'},
			{name:'dadr'},
            {name:'dcontname'},
			{name:'dcontmail'},
			{name:'dcontphone'},
			{name:'destrems'},
			{name:'amt'},
			{name:'paytype'},
			{name:'type'},
			{name:'packs'},
			{name:'wt'},
			{name:'volwt'},
			{name:'rordnum'},
            {name:'courdate'},
            {name:'courtimef'},
            {name:'courtimet'}
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
                    name: 'status'
                },
				{
					name: 'DateIn'
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
                },
                {
                    name: 'wb_no'
                }
            ]
	   
	   
    });
	
	
	
	
var pg = Ext.create('Ext.panel.Panel', {
    renderTo: 'start-ct',//Ext.getBody(),

    height: 500,
    width: 1002,
    layout: {
     //   align: 'stretchmax',
     //   type: 'vbox'
    },
	
	items: [
                {
                    xtype: 'gridpanel',
					//name:'grid',
                    autoShow: true,
                    height: 500,
                    width: 1000,
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
                            width: 50,
							
                            dataIndex: 'status',
                            text: 'Статус'
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
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 70,
							
                            dataIndex: 'wb_no',
                            text: '№ накл.'
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
			reader: Ext.create('Ext.data.reader.Json',{
						model: 'Order',
						
			}),
			
			listeners: {
			                    show:function(form, action){
			                         this.setTitle( 'Новый заказ');
			                     },
								actioncomplete: function(form, action){
								if (action.method == 'GET') 
								{
								 //Ext.Msg.alert('action', action.method);
								
								var borg = Ext.getCmp('idorg');
								borg.store.load({
											params:{
												query: borg.getValue()
											}
										});
								var Review = Ext.getCmp('orgcode');
								borg.select(Review.getValue());
								
								var bdest = Ext.getCmp('iddest');
								bdest.store.load({
											params:{
												query: bdest.getValue()
											}
										});
								var Rev = Ext.getCmp('destcode');
								bdest.select(Rev.getValue());
								
                                var ordn=Ext.getCmp('idrordnum');
                                    
                                        this.setTitle( 'Заказ № '+ordn.getValue());
                                    
                               
								}
								}
							
							},
			
			
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
							id: 'idorg',
                            name: 'org',
                            fieldLabel: 'Город',
                            labelAlign: 'top',
                            displayField: 'fname',
                            store: ds,
                            valueField: 'code',
							typeAhead: true,
							allowBlank:false,
							triggerAction : 'query',
							selectOnFocus:true,										
                        },
						{
						xtype: 'textfield',
						id:'orgcode',
						hidden :true
						},
						{
						xtype: 'textfield',
						name:'rordnum',
                        id:'idrordnum',
						hidden :true
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
							id:'iddest',
                            name:'dest',
                            fieldLabel: 'Город',
                            labelAlign: 'top',
                            displayField: 'fname',
                            store: ds2,
                            valueField: 'code',
							allowBlank:false
                        },
						{
						xtype: 'textfield',
						id:'destcode',
						hidden :true
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
                            name: 'dcontphone',
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
                    height: 120,
                    width: 360,
                    layout: {
                        type: 'absolute'
                    },
                    title: 'Дата приезда курьера',
                    x: 10,
                    y: 380,
                    items: [
					   {
                             xtype: 'datefield',
                             name: 'courdate',
                             fieldLabel: 'Дата',
                             x: 10,
                             y: 10,
                             width: 320,
                             format: 'd.m.Y',
                            // altFormats: 'Y m d',
                        },
                        {
                            xtype: 'timefield',
                            width: 320,
                            name: 'courtimef',
							fieldLabel: 'Время с',
                            format: 'H:i',
                            x: 10,
                            y: 40
                        },
                        {
                            xtype: 'timefield',
                            width: 320,
                            name: 'courtimet',
                            fieldLabel: 'Время до',
                            format: 'H:i',
                            x: 10,
                            y: 70
                        }
                        
                    ]
                },
                
                {
                    xtype: 'fieldset',
                    height: 150,
                    width: 360,
                    title: 'Информация о грузе',
                    x: 390,
                    y: 380,
					
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
                },{
                            xtype: 'label',
                            text: '*по умолчанию оплата заказчиком (агентом, размещающим заказ), в случае другой оплаты - просьба указывать это в примечании (отправитель/получатель, сумма)',
                             x: 10,
                             y: 500,
                             width: 360
                             
                            //margins: '0 0 0 10'
                }
            ]
			
			
        });
		
		
 var b = Ext.create('Ext.button.Button', {
        text: 'Новый заказ',
        renderTo: 'start-ct',
        handler: function() {
            
			//var sm = pg.child('gridpanel').getSelectionModel().getSelection()[0];
			
			
			//Ext.Msg.alert('Плоха все!', sm.get('ROrdNum'));
			/*p1.getForm().load({
                    //url: 'test.json'
					method :'GET',
					url:'EditAgOrders.php?id='+sm.get('ROrdNum')
                    //waitMsg: 'Loading...'
                });*/
				
			updateSpot('panel1');
				
        }
    });
	
var buted = Ext.create('Ext.button.Button', {
        text: 'Редактировать заказ',
        renderTo: 'start-ct',
        handler: function() {
            
			var sm = pg.child('gridpanel').getSelectionModel();//.getSelection()[0];
			
			
			if (sm.getCount()>0){
			if (sm.getSelection()[0].get('status')=='заявлен'){ 
			p1.getForm().load({
                   	method :'GET',
					url:'EditAgOrders.php?id='+sm.getSelection()[0].get('ROrdNum')
					                    //waitMsg: 'Loading...'
                });
			updateSpot('panel1');
            }else{
                
               Ext.Msg.alert('Запрещено!', 'Редактировать можно только заявленные заказы'); 
            }
            
				}else{
					Ext.Msg.alert('Внимание!', 'Выберите заказ для редактирования');
					}
				
			
				
        }
    });	
	
	p1.setVisible( false);
});
