USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwGetAgOrdEx]    Script Date: 09/12/2019 16:06:14 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwGetAgOrdEx]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwGetAgOrdEx]
GO

USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwGetAgOrdEx]    Script Date: 09/12/2019 16:06:14 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[wwwGetAgOrdEx]
	@ROrdNum int
as

select 
ex.AgOrdNo, ExNo
, Rptd_txt=CONVERT(varchar(20), Rptd, 104) + ' '+ CONVERT(varchar(5), Rptd, 114)--, Rptd
, Raised_txt=CONVERT(varchar(20), Raised, 104) + ' ' + CONVERT(varchar(5), Raised, 114)--, Raised
, Loc
, ex.ExCode
, e.ExDesc
, Ofvers
, user_in
, date_in=CONVERT(varchar(20), date_in, 104) + ' ' + CONVERT(varchar(5), date_in, 114) --, date_in
from ExLog ex
	left join EXCEP e on ex.ExCode=e.ExCode
where ex.AgOrdNo = @ROrdNum 
and ISNULL(ex.WND, 0) = 0
and (ex.ExCode <> 61 and ex.ExCode <> 62)
GO

GRANT EXECUTE ON [dbo].[wwwGetAgOrdEx] TO [pod]
GO

