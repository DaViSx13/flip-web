USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwAPIGetWbEx]    Script Date: 27/10/16 18:45:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwAPIGetWbEx]
	@wbno varchar(20)
as

declare @procName varchar(100)
set @procName = OBJECT_NAME(@@PROCID)
exec wwwLogProcUse @procName = @procName

select --*, 
ex.wbno--, ExNo
, Rptd=CONVERT(varchar(20), Rptd, 104) + ' '+ CONVERT(varchar(5), Rptd, 114)--, Rptd
, Raised=CONVERT(varchar(20), Raised, 104) + ' ' + CONVERT(varchar(5), Raised, 114)--, Raised
, Loc, ex.ExCode
, e.ExDesc
, DTDChg = CONVERT(varchar(20), ex.DTDChg, 104)
--, Ofvers
from ExLog ex
	left join EXCEP e on ex.ExCode=e.ExCode
where WbNo = @wbno and ISNULL(ex.WND, 0) = 0 --'544-5757' 
