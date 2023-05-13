Ext.define('fplk.controller.templates.TemplateSelectionController', {
    extend: 'Ext.app.Controller',
    views: ['templates.TemplateSelection'],
    refs: [
        {
            ref: 'TemplateSelection',
            selector: 'templateselection'
        }
    ],
    init: function () {
        this.control({
            'combobox': {
                beforeactivate: this.comboboxActivate,
                select: this.tempalteComboboxSelect
            },
        })
    },

    comboboxActivate: function (me) {
        me.getStore().load();
    },

    tempalteComboboxSelect: function (me, records) {
        console.log(me.up('templateselection').dest)
        if(me.up('templateselection').dest === 'org')
            this.fillOrgFromTemplate(me, records);
        else
            this.fillDestFromTemplate(me, records);
    },

    fillOrgFromTemplate: function (combo, records) {
        if (records[0].data.org != null) {
            var city = combo.up('ordform').down('combocity[name=org]');
            city.store.load({
                params: {
                    query: records[0].data.org,
                    se: window.location.hash.replace("#", "")
                }
            });
            city.select(records[0].data.orgcode)
        }
        combo.up('ordform').down('*[name=cname]').setValue(records[0].data.cname);
        combo.up('ordform').down('*[name=address]').setValue(records[0].data.address);
        combo.up('ordform').down('*[name=contname]').setValue(records[0].data.contname);
        combo.up('ordform').down('*[name=contmail]').setValue(records[0].data.contmail);
        combo.up('ordform').down('*[name=contphone]').setValue(records[0].data.contphone);
        combo.up('ordform').down('*[name=orgrems]').setValue(records[0].data.orgrems);
    },

    fillDestFromTemplate: function (combo, records) {
        if (records[0].data.dest != null) {
            var city = combo.up('ordform').down('combocity[name=dest]');
            city.store.load({
                params: {
                    query: records[0].data.dest,
                    se: window.location.hash.replace("#", "")
                }
            });
            city.select(records[0].data.destcode)
        }
        combo.up('ordform').down('*[name=dname]').setValue(records[0].data.dname);
        combo.up('ordform').down('*[name=dadr]').setValue(records[0].data.dadr);
        combo.up('ordform').down('*[name=dcontname]').setValue(records[0].data.dcontname);
        combo.up('ordform').down('*[name=dcontmail]').setValue(records[0].data.dcontmail);
        combo.up('ordform').down('*[name=dcontphone]').setValue(records[0].data.dcontphone);
        combo.up('ordform').down('*[name=destrems]').setValue(records[0].data.destrems);
    }
});
