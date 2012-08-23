Ext.define('FpMnf.view.mainform.NumYear', {
	extend : 'Ext.form.NumberField',
	alias : 'widget.numyear',
	initComponent : function () {
		Ext.apply(this, {
			value : Ext.Date.format(new Date(), 'Y'),
			minValue : 2011,
			width : 80,
			editable : false,
			maxValue : 2020
		});
		this.callParent(arguments);
	}
});
