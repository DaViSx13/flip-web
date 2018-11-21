USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwLKGetWbsTotal]    Script Date: 21.11.2018 10:45:52 ******/
DROP PROCEDURE [dbo].[wwwLKGetWbsTotal]
GO

/****** Object:  StoredProcedure [dbo].[wwwLKGetWbsTotal]    Script Date: 21.11.2018 10:45:52 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


create Procedure [dbo].[wwwLKGetWbsTotal]
	@period varchar(10), @ClientID int
AS

if @ClientID is null return
if ISNULL(ltrim(rtrim(@period)), '') = '' set @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'

declare @bDate date, @eDate date, @CACC varchar(50)

select @CACC = l.ClientID from wwwLKUser l where userID = @clientID -- 54
set @bDate = @period --'20100201'
set @eDate = dateadd(d, -1, DATEADD(m,1,@bDate))

select s_wb = COUNT(m.Wb_No)
,s_wt = ISNULL(sum (m.wt),0)
,s_vol_wt = ISNULL(sum (m.vol_wt),0)

from Main m 
where  m.D_Acc between @bDate and @eDate 
	and @CACC in (m.SCode, m.Rcode, m.ACC)	


GO

GRANT EXECUTE ON [dbo].[wwwLKGetWbsTotal] TO [pod]

GO