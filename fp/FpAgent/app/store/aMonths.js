Ext.define('FPAgent.store.aMonths', {
    extend: 'Ext.data.Store',
    model: 'FPAgent.model.aMonth',
    data: [
        { Name: FPAgent.lib.Translate.tr("aMonths.January")/*'Январь'*/,   lowName: '01' },
		{ Name: FPAgent.lib.Translate.tr("aMonths.February")/*'Февраль'*/, 	lowName: '02' },
		{ Name: FPAgent.lib.Translate.tr("aMonths.March")/*'Март'*/, 	lowName: '03' },
		{ Name: FPAgent.lib.Translate.tr("aMonths.April")/*'Апрель'*/,   lowName: '04' },
		{ Name: FPAgent.lib.Translate.tr("aMonths.May")/*'Май'*/, 		lowName: '05' },
		{ Name: FPAgent.lib.Translate.tr("aMonths.June")/*'Июнь'*/,    	lowName: '06' },
		{ Name: FPAgent.lib.Translate.tr("aMonths.July")/*'Июль'*/, 	lowName: '07' },
		{ Name: FPAgent.lib.Translate.tr("aMonths.August")/*'Август'*/,   lowName: '08' },
		{ Name: FPAgent.lib.Translate.tr("aMonths.September")/*'Сентябрь'*/, lowName: '09' },
		{ Name: FPAgent.lib.Translate.tr("aMonths.October")/*'Октябрь'*/, 	lowName: '10' },
		{ Name: FPAgent.lib.Translate.tr("aMonths.November")/*'Ноябрь'*/,   lowName: '11' },
		{ Name: FPAgent.lib.Translate.tr("aMonths.December")/*'Декабрь'*/, 	lowName: '12' }
    ]
});