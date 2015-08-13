USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwGetWbEx]    Script Date: 13/08/15 13:42:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwAPIGetWbEx]
	@wbno varchar(20)
as

select --*, 
ex.wbno--, ExNo
, Rptd=CONVERT(varchar(20), Rptd, 104) + ' '+ CONVERT(varchar(5), Rptd, 114)--, Rptd
, Raised=CONVERT(varchar(20), Raised, 104) + ' ' + CONVERT(varchar(5), Raised, 114)--, Raised
, Loc, ex.ExCode
, e.ExDesc
--, Ofvers
from ExLog ex
	left join EXCEP e on ex.ExCode=e.ExCode
where WbNo = @wbno and ISNULL(ex.WND, 0) = 0 --'544-5757' 
go

grant execute on [dbo].[wwwAPIGetWbEx] to [public]
go
grant execute on [dbo].[wwwAPIGetWbEx] to [pod]
go