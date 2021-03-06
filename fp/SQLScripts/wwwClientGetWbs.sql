USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwClientGetWbs]    Script Date: 07/12/2020 13:11:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER Procedure [dbo].[wwwClientGetWbs]
	@period varchar(10)= null,
	@from varchar(8) = null,
	@to varchar(8) = null,
	@clientID int,
	@dir varchar(3) = 'all'
AS

--if ISNULL(ltrim(rtrim(@period)), '') = '' or @agentID is null return

if @clientID is null return
if ISNULL(ltrim(rtrim(@period)), '') = '' set @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'

declare @bDate date, @eDate date, @CACC varchar(50)

select @CACC = CACC from wwwClientUser where userID = @clientID -- 54

BEGIN
	IF @from IS NULL
		set @bDate = @period --'20100201'
	ELSE
		SET @bDate = CONVERT(DATE, @from, 112)
END

BEGIN
	IF @to IS NULL
		set @eDate = dateadd(d, -1, DATEADD(m,1,@bDate))
	ELSE
		SET @eDate = CONVERT(DATE, @to, 112)
END


select distinct m.wb_no
, d_acc_txt=CONVERT(varchar(20), d_acc,104), d_acc
, dod_txt=CONVERT(varchar(20), dod,104) + ' ' + CONVERT(varchar(5), tdd, 108)
, dod = CONVERT(datetime, CONVERT(varchar(20), dod,104) + ' ' + CONVERT(varchar(5), tdd, 108), 104)
, rcpn
--, tdd_txt = CONVERT(varchar(5), tdd, 108)
,p_d_in
, p_d_in_txt=CONVERT(varchar(20), p_d_in,104)--, p_d_in
, dtd_txt=CONVERT(varchar(20), m.dtd,104), m.dtd
, m.org, m.dest, m.s_co, m.r_co, m.wt, m.vol_wt, t_srv
--, dir = case when mh.DestTrk='mow' then 'in' else 'out' end

, is_ex = (select COUNT(1) from ExLog ex where ex.WbNo = m.Wb_No and ISNULL(ex.WND, 0) = 0 and (ex.ExCode <> 61 and ex.ExCode <> 62))

from Main m with(nolock) 
	
where m.D_Acc between @bDate and @eDate 
	and @CACC in (m.SCode, m.Rcode, m.ACC)	
order by m.D_Acc desc

