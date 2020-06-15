Ext.define('fplk.view.mainform.GroupTarifWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.grouptarifwin',
	title : 'Пакетный расчет стоимости доставки',
	layout : 'fit',
	autoShow : true,
	width : 400,
	resizable : false,
	modal : true,

	items:[{
		xtype	:'form',
		width	:400,
		layout	:'vbox',
		items:[{
			xtype	:'panel',
			width	:400,
			layout	:'hbox',
			items	:[{
						xtype		:'filefield',
						name		:'document',
						width		:290,
						margin		:10,
						emptyText	:'Выберите файл',
						msgTarget	:'side',
						allowBlank	:false,
						buttonConfig:{
										text	:'Выбрать',
										iconCls	:'find'			
						}		
		}, {
			xtype	:'button',
			text	:'Шаблон',
			iconCls	:'download',
			margin  :'10 0 0 0',
			hrefTarget : '_parent',
			href	:'srv/importTarifClaculate.php?action=getGroupTarifExample'

			}]
		}, {
			xtype:'fieldcontainer',
			defaultType:'radiofield',
			width:370,
			margin: 10,
			fieldLabel:'Документ',
			layout: 'hbox',
			items:[{
				    boxLabel  : 'Да',
					checked	  : true,		
                    name      : 'isDocument',
                    inputValue: 'LE'
			}, {
					boxLabel  : 'Нет',
					margin    :	'0 0 0 10',
                    name      : 'isDocument',
                    inputValue: 'PL'
			}]
		}],	
		buttons	:[{
			xtype	:'button',
			text	:'Расчитать',
			margin	:5,
			action	:'upload'
		},{
			xtype	:'button',
			text	:'Закрыть',
			margin	:5,
			action	:'close'
		}]		
	}]
});
