alter procedure wwwCourGetOrders
	@courId int
as	
--declare @courId int
declare @actDate datetime
set @courId = 10231
set @actDate = '20120808'--CAST(getdate() as date)

select 
  aNo = OrderNo
, displayNo = '«¿ ¿«'
, aCash = Amt
, aAddress = [Address]
, client = ISNULL(o.NewCCO, k.c_co)
, timeB = CONVERT(varchar(5), ReadyTime, 108)
, timeE = CONVERT(varchar(5), ReadyTime1, 108)
from OrdHdr o 
	left join Klient k on o.CACC = k.CACC
where (Ready = @actDate/* or Perenos = @actDate*/)and CourId = @courId
order by [Address], client

go
grant execute on wwwCourGetOrders to [pod]
go
