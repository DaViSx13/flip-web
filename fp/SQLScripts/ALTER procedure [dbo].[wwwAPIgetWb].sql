USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwAPIgetWb]    Script Date: 11/09/16 19:15:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwAPIgetWb]
	@wbno varchar(20)
as

declare @procName varchar(100)
set @procName = OBJECT_NAME(@@PROCID)
exec wwwLogProcUse @procName = @procName

select 
wbno = Wb_No
, shipper = S_Co
, cnee = R_Co
, dateacc = m.D_Acc
, dtd = DTD
, dod = DATEADD(MINUTE, DATEPART(MINUTE, tdd),  DATEADD(HOUR, DATEPART(HOUR, tdd), DOD) )
--, dod = DOD 
--, tdd = TDD
, rcpn = RCPN
, senddate = ( select top 1 Date_In from TransactLog  tl where tl.frm_in = 4 and tl.TrTypeId = 6 and tl.Wb_No = m.Wb_No order by Date_In desc )
, m.ORG
, m.DEST
, sk.C_CITY as Scity
, rk.C_CITY as RCity
from Main m
  join Klient sk on sk.CACC = m.SCode
  join Klient rk on rk.CACC = m.Rcode
where Wb_No = @wbno
