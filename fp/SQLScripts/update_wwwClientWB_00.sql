update wwwClientWB
    set wbsource = 'webLK'
where wbsource = 'web' and User_IN in (
    select lk.aUser 
    from wwwLKUser lk
	   left join wwwClientUser cl on cl.aUser = lk.aUser
    where cl.aUser is null
    )

update wwwClientWB
    set wbsource = 'webClient'
where wbsource = 'web'


/*

    select lk.* 
    from wwwLKUser lk
	   left join wwwClientUser cl on cl.aUser = lk.aUser
    where cl.aUser is null
    order by lk.aUser

select max(ROrdNum) from RegOrders
select max(ROrdNum) from AgOrders

select distinct wbsource from wwwClientWB

*/



