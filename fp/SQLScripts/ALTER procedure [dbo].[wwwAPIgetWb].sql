USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwAPIgetWb]    Script Date: 13/08/15 13:31:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwAPIgetWb]
	@wbno varchar(20)
as
select 
wbno = Wb_No
, shipper = S_Co
, cnee = R_Co
, dateacc = D_Acc
, dtd = DTD
, dod = DATEADD(MINUTE, DATEPART(MINUTE, tdd),  DATEADD(HOUR, DATEPART(HOUR, tdd), DOD) )
--, dod = DOD 
--, tdd = TDD
, rcpn = RCPN
, senddate = ( select top 1 Date_In from TransactLog  tl where tl.frm_in = 4 and tl.TrTypeId = 6 and tl.Wb_No = m.Wb_No order by Date_In desc )

from Main m
where Wb_No = @wbno
go

grant execute on [dbo].[wwwAPIgetWb] to [public]
go
grant execute on [dbo].[wwwAPIgetWb] to [pod]
go
