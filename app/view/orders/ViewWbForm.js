Ext.define('FPAgent.view.orders.ViewWbForm', {
	alias : 'widget.viewwbform',
	extend : 'Ext.form.Panel',
	layout : {
		type : 'absolute'
	},
	bodyPadding : 5,
	items : [{
			xtype : 'displayfield',
			fieldCls : 'otherstr',
			width : 154,
			x : 320,
			y : 35,
			name : 'wb_no'
		}, {
			xtype : 'displayfield',
			width : 154,
			fieldCls : 'otherstr',
			x : 10,
			y : 28,
			name : 'd_acc'
		}, {
			xtype : 'displayfield',
			fieldCls : 'otherstr',
			width : 154,
			x : 144,
			y : 28,
			name : 'org'
		}, {
			xtype : 'displayfield',
			fieldCls : 'otherstr',
			width : 154,
			x : 225,
			y : 28,
			name : 'dest'
		}, {
			xtype : 'textarea',
			readOnly : true,
			width : 280,
			height : 22,
			cls : 'longstr',
			x : 115,
			y : 67,
			name : 's_name'
		}, {
			xtype : 'textarea',
			readOnly : true,
			width : 274,
			height : 31,
			cls : 'longstr',
			x : 2,
			y : 88,
			name : 's_co'
		}, {
			xtype : 'textarea',
			border : false,
			readOnly : true,
			cls : 'longstr',
			width : 140,
			height : 31,
			x : 277,
			y : 88,
			name : 's_tel'
		}, {
			xtype : 'displayfield',
			fieldCls : 'otherstr',
			width : 154,
			x : 3,
			y : 130,
			name : 's_cnt'
		}, {
			xtype : 'displayfield',
			fieldCls : 'otherstr',
			width : 154,
			x : 282,
			y : 160,
			name : 's_zip'
		}, {
			xtype : 'textarea',
			readOnly : true,
			cls : 'longstr',
			width : 415,
			height : 31,
			x : 2,
			y : 180,
			name : 's_adr'
		}, {
			xtype : 'displayfield',
			fieldCls : 'otherstr',
			width : 278,
			x : 3,
			y : 160,
			name : 's_city'
		}, {
			xtype : 'displayfield',
			fieldCls : 'otherstr',
			width : 420,
			x : 3,
			y : 225,
			name : 's_ref'
		}, {
			xtype : 'displayfield',
			fieldCls : 'otherstr',
			width : 420,
			x : 120,
			y : 259,
			name : 'r_name'
		}, {
			xtype : 'textarea',
			readOnly : true,
			cls : 'longstr',
			width : 274,
			height : 31,
			x : 2,
			y : 281,
			name : 'r_co'
		}, {
			xtype : 'textarea',
			readOnly : true,
			cls : 'longstr',
			width : 140,
			height : 31,
			x : 278,
			y : 281,
			name : 'r_tel'
		}, {
			xtype : 'textarea',
			readOnly : true,
			cls : 'longstr',
			width : 415,
			height : 31,
			x : 2,
			y : 372,
			name : 'r_adr'
		}, {
			xtype : 'displayfield',
			fieldCls : 'otherstr',
			width : 420,
			x : 3,
			y : 322,
			name : 'r_cnt'
		}, {
			xtype : 'displayfield',
			fieldCls : 'otherstr',
			width : 420,
			x : 282,
			y : 352,
			name : 'r_zip'
		}, {
			xtype : 'displayfield',
			fieldCls : 'otherstr',
			width : 420,
			x : 3,
			y : 352,
			name : 'r_city'
		}, {
			xtype : 'displayfield',
			width : 5,
			x : 278,
			y : 245,
			name : 'pers'
		}, {
			xtype : 'displayfield',
			fieldCls : 'otherstr',
			width : 190,
			x : 530,
			y : 487,
			name : 'rcpn'
		}, {
			xtype : 'displayfield',
			fieldCls : 'otherstr',
			width : 100,
			x : 535,
			y : 513,
			name : 'dod'
		}, {
			xtype : 'displayfield',
			fieldCls : 'otherstr',
			width : 100,
			x : 662,
			y : 513,
			name : 'tdd'
		}, {
			xtype : 'displayfield',
			fieldCls : 'otherstr',
			width : 50,
			x : 10,
			y : 500,
			name : 'pcs'
		}, {
			xtype : 'displayfield',
			fieldCls : 'otherstr',
			width : 50,
			x : 70,
			y : 485,
			name : 'wt'
		}, {
			xtype : 'displayfield',
			fieldCls : 'otherstr',
			width : 50,
			x : 358,
			y : 500,
			name : 'vol_wt'
		}, {
			xtype : 'displayfield',
			width : 5,
			x : 436,
			y : 92,
			name : 't_srv_ex',
			value : 'X',
			hidden : true
		}, {
			xtype : 'displayfield',
			width : 5,
			x : 436,
			y : 111,
			name : 't_srv_st',
			value : 'X',
			hidden : true
		}, {
			xtype : 'displayfield',
			width : 5,
			x : 436,
			y : 128,
			name : 't_srv_af',
			value : 'X',
			hidden : true
		}, {
			xtype : 'displayfield',
			width : 5,
			x : 545,
			y : 77,
			name : 'payr_1',
			value : 'X',
			hidden : true
		}, {
			xtype : 'displayfield',
			width : 5,
			x : 545,
			y : 92,
			name : 'payr_2',
			value : 'X',
			hidden : true
		}, {
			xtype : 'displayfield',
			width : 5,
			x : 545,
			y : 111,
			name : 'payr_3',
			value : 'X',
			hidden : true
		}, {
			xtype : 'displayfield',
			width : 5,
			x : 180,
			y : 475,
			name : 't_pak_le',
			value : 'X',
			hidden : true
		}, {
			xtype : 'displayfield',
			width : 5,
			x : 180,
			y : 501,
			name : 't_pak_pl',
			value : 'X',
			hidden : true
		}, {
			xtype : 'displayfield',
			width : 5,
			x : 544,
			y : 152,
			name : 'metpaym_csh',
			value : 'X',
			hidden : true
		}, {
			xtype : 'displayfield',
			width : 5,
			x : 544,
			y : 172,
			name : 'metpaym_inv',
			value : 'X',
			hidden : true
		}, {
			xtype : 'displayfield',
			width : 6,
			x : 573,
			y : 236,
			name : 'holidaydel'
		}, {
			xtype : 'displayfield',
			width : 50,
			x : 588,
			y : 256,
			name : 'timing'
		}, {
			xtype : 'displayfield',
			width : 50,
			x : 502,
			y : 256,
			name : 'timing_check',
			value : 'X',
			hidden : true
		}, {
			xtype : 'displayfield',
			width : 50,
			x : 436,
			y : 237,
			name : 't_del_ad',
			value : 'X',
			hidden : true
		}, {
			xtype : 'displayfield',
			width : 50,
			x : 436,
			y : 261,
			name : 't_del_ho',
			value : 'X',
			hidden : true
		}, {
			xtype : 'displayfield',
			width : 50,
			x : 502,
			y : 237,
			name : 't_del_ta',
			value : 'X',
			hidden : true
		}, {
			xtype : 'displayfield',
			width : 50,
			x : 522,
			y : 193,
			name : 'ins_0',
			value : 'X',
			hidden : true
		}, {
			xtype : 'displayfield',
			width : 50,
			x : 485,
			y : 193,
			name : 'ins_1',
			value : 'X',
			hidden : true
		}
		/*, {
		xtype : 'image',
		height : 2000,
		width : 2000,
		src : 'http://localhost/fp_view_wb/fpagent/resources/images/wbtemplate.svg'
		}*/
	]
});
