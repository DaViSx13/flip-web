alter procedure wwwCourGetWbs
	@courId int
as	
--declare @courId int
declare @actDate datetime
set @courId = 10231
set @actDate = '20120808'--CAST(getdate() as date)

select 
  aNo = tl.Wb_No
, displayNo = case when TL.Wb_No = '0' then TL.Wb_No + '(' + cast(TL.PakNo as varchar(50)) + ')' else TL.Wb_No end
, aCash = m.aCash
, aAddress = m.R_Adr
, client = m.R_Co
, tdd = CONVERT(varchar(5), m.TDD, 108)
from TransactLog TL
	left join Main m on m.Wb_No = TL.Wb_No
where TrTypeId = 2 and DateTransact = @actDate and CourIdTo = @courId 
order by m.R_Adr, m.R_Co

go
grant execute on wwwCourGetWbs to [pod]
go
