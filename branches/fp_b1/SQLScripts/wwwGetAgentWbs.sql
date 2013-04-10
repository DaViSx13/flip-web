USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwGetAgentWbs]    Script Date: 03/20/2013 12:01:47 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwGetAgentWbs]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwGetAgentWbs]
GO

USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwGetAgentWbs]    Script Date: 03/20/2013 12:01:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[wwwGetAgentWbs]
	@period varchar(10), @agentID int, @dir varchar(3) = 'all'
AS

--if ISNULL(ltrim(rtrim(@period)), '') = '' or @agentID is null return

if @agentID is null return
if ISNULL(ltrim(rtrim(@period)), '') = '' set @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'

declare @bDate date, @eDate date, @agID int

set @agID = @agentID -- 54
set @bDate = @period --'20100201'
set @eDate = dateadd(d, -1, DATEADD(m,1,@bDate))

--select @bDate, @eDate


select distinct m.wb_no
, d_acc_txt=CONVERT(varchar(20), d_acc,104), d_acc
, dod_txt=CONVERT(varchar(20), dod,104) + ' ' + CONVERT(varchar(5), tdd, 108)--, dod
, rcpn
--, tdd_txt = CONVERT(varchar(5), tdd, 108)
,p_d_in
, p_d_in_txt=CONVERT(varchar(20), p_d_in,104)--, p_d_in
, dtd_txt=CONVERT(varchar(20), m.dtd,104)--, dtd
, m.org, m.dest, m.s_co, m.r_co, m.wt, m.vol_wt, t_srv
, dir = case when mh.DestTrk='mow' then 'in' else 'out' end

, tar_flip_b = dbo.RoundMoney(icIN.B_Chg)
, tar_flip_a = dbo.RoundMoney(icIN.A_Chg)
, tar_flip_t = dbo.RoundMoney(icIN.T_Chg)
, tar_flip_id = icIN.interId

, tar_ag_b = dbo.RoundMoney(icOUT.B_Chg)
, tar_ag_a = dbo.RoundMoney(icOUT.A_Chg)
, tar_ag_t = dbo.RoundMoney(icOUT.T_Chg)
, tar_ag_id = icOUT.interId

, rem_flip = convert(varchar(500), icIN.Rems)
, rem_ag = convert(varchar(500), icOUT.Rems)
, is_ex = (select COUNT(1) from ExLog ex where ex.WbNo = m.Wb_No and ISNULL(ex.WND, 0) = 0)

, req_tar_a = case when (icOUT.interId is not null and req.a_Chg is null) then 0 when req.a_Chg > 0 then req.a_Chg else null end
,req_rem = req.aRem
from MnfHdr mh 
	left join MnfBdy mb on mh.MNFRefNo = mb.MnfRefNo
	left join Main m on m.Wb_No = mb.Wb_no
	
	left join InterCo icIN on mb.Wb_no = icIN.wb_no and icIN.AgD = @agID
	left join InterCo icOUT on mb.Wb_no = icOUT.wb_no and icOUT.AgC = @agID
	
	left join tAChgReq req on req.interId = icOUT.interId and req.aState = 0
	
	where  ( (mh.OrgAgentID = @agID) or (mh.DestAgentID= @agID) )
	and ((mh.Shpd between @bDate and @eDate and (@dir = 'in' or @dir = 'out' or @dir = 'all')) or @dir = 'ove')
	and m.Wb_No is not null
	and ((@dir = 'in' and mh.DestTrk='mow') or (@dir = 'out' and mh.DestTrk!='mow') or (@dir = 'all' ) or (@dir = 'ove' and m.DOD is null and m.dtd <= GETDATE()))
order by m.D_Acc desc


GO


