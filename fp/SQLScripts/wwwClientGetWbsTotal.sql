USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwClientGetWbsTotal]    Script Date: 07/12/2020 13:24:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER Procedure [dbo].[wwwClientGetWbsTotal]
	@period varchar(10) = null,
	@from varchar(8) = null,
	@to varchar(8) = null,
	@ClientID int--, @dir varchar(3) 
AS

--if ISNULL(ltrim(rtrim(@period)), '') = '' or @agentID is null return

if @ClientID is null return
if ISNULL(ltrim(rtrim(@period)), '') = '' set @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'

declare @bDate date, @eDate date, @CACC varchar(50)

select @CACC = CACC from wwwClientUser where userID = @clientID -- 54

BEGIN
	IF @from IS NULL
		set @bDate = @period --'20100201'
	ELSE
		set @bDate = CONVERT(DATE, @from, 112)
END

BEGIN
	IF @to IS NULL
		set @eDate = dateadd(d, -1, DATEADD(m,1,@bDate))
	ELSE
		SET @eDate = CONVERT(DATE, @to, 112)	
END

select s_wb = COUNT(m.Wb_No)
,s_wt = ISNULL(sum (m.wt),0)
,s_vol_wt = ISNULL(sum (m.vol_wt),0)

from Main m 
where  m.D_Acc between @bDate and @eDate 
	and @CACC in (m.SCode, m.Rcode, m.ACC)	

