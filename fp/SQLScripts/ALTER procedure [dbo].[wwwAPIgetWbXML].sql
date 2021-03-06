USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwGetWbXML]    Script Date: 10/08/15 13:19:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[wwwAPIgetWbXML] 
	@wbno varchar(50)
as	
declare @xml xml
declare @x varchar(max)

set @xml = (
select 
--wb
wbno = Wb_No
, shipper = S_Co
, cnee = R_Co
, dateacc = D_Acc
, dtd = DTD
, dod = DATEADD(MINUTE, DATEPART(MINUTE, tdd),  DATEADD(HOUR, DATEPART(HOUR, tdd), DOD) )
--, dod = DOD 
--, tdd = TDD
, rcpn = RCPN
, senddate = ( select top 1 Date_In from TransactLog  tl where tl.frm_in = 4 and tl.TrTypeId = 6 and tl.Wb_No = waybill.Wb_No order by Date_In desc )

--ex
, raised = exception.Raised
, loc = exception.Loc
, excode = exception.ExCode
, exdesc = ex.ExDesc + ''
from Main waybill
	left join ExLog exception on exception.WbNo = waybill.Wb_No
	left join EXCEP ex on ex.ExCode = exception.ExCode
where Wb_No = @wbno --'590-8395'
for xml auto, elements
)
select @x = convert(varchar(max),@xml)

select @x = replace(@x, '<exception exdesc=""/>', '') --костыль
select @x = replace(@x, '<exception/>', '') --костыль
select @x as x
go

grant execute on wwwAPIgetWbXML to [public]
go