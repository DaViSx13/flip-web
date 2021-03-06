USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwGetWbsTotal]    Script Date: 03/07/16 13:25:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[wwwClientGetWbsTotal]
	@period varchar(10), @ClientID int--, @dir varchar(3) 
AS

--if ISNULL(ltrim(rtrim(@period)), '') = '' or @agentID is null return

if @ClientID is null return
if ISNULL(ltrim(rtrim(@period)), '') = '' set @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'

declare @bDate date, @eDate date, @CACC varchar(50)

select @CACC = CACC from wwwClientUser where userID = @clientID -- 54
set @bDate = @period --'20100201'
set @eDate = dateadd(d, -1, DATEADD(m,1,@bDate))

--select @bDate, @eDate


select s_wb = COUNT(m.Wb_No)
,s_wt = ISNULL(sum (m.wt),0)
,s_vol_wt = ISNULL(sum (m.vol_wt),0)

from Main m 
where  m.D_Acc between @bDate and @eDate 
	and @CACC in (m.SCode, m.Rcode, m.ACC)	

go

grant execute on [wwwClientGetWbsTotal] to [pod]
go