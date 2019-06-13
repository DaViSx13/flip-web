USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwGetAgentWbsAnyDates]    Script Date: 06/13/2019 15:42:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


Create Procedure [dbo].[wwwGetAgentWbsAnyDates]
	@bDate varchar(21), @eDate varchar(21), @agentID int, @dir varchar(3) = 'all'
AS

if @agentID is null return
declare @agID int

set @agID = @agentID -- 54

if OBJECT_ID('tempdb..#wbList') is not null drop table #wbList
--if OBJECT_ID('tempdb..#x') is not null drop table #x

create table #wbList(
 wb_no varchar(50) PRIMARY KEY CLUSTERED
,isIN varchar(50) NULL
,isOUT varchar(50) NULL
)

insert #wbList (wb_no)
select distinct ic.wb_no 
from InterCo ic
  join Main m on ic.wb_no = m.Wb_No
where m.D_Acc between @bDate and @eDate
  and @agID in (ic.AgC, ic.AgD)

--select * from #wbList

-- in, out с точки зрения агента
update #wbList
set isIN = (select top 1 mnfIn = mh.MNFRefNo from MnfHdr mh join MnfBdy mb on mh.MNFRefNo = mb.MnfRefNo and mb.Wb_no = #wbList.Wb_no and mh.DestAgentID = @agID)
  ,isOUT = (select top 1 mnfIn = mh.MNFRefNo from MnfHdr mh join MnfBdy mb on mh.MNFRefNo = mb.MnfRefNo and mb.Wb_no = #wbList.Wb_no and mh.OrgAgentID = @agID)
/*
select * from #wbList
where 
(isIn is null and isOut is NULL)
or 
(isIn is not null and isOut is not NULL)
*/
--return

select 
--wblist.isIN, wbList.isOUT,
m.wb_no
, d_acc_txt=CONVERT(varchar(20), d_acc,104), d_acc
, dod_txt=CONVERT(varchar(20), dod,104) + ' ' + CONVERT(varchar(5), tdd, 108)
, dod = CONVERT(datetime, CONVERT(varchar(20), dod,104) + ' ' + CONVERT(varchar(5), tdd, 108), 104)
, rcpn
--, tdd_txt = CONVERT(varchar(5), tdd, 108)
, p_d_in
, p_d_in_txt=CONVERT(varchar(20), p_d_in,104)--, p_d_in
, dtd_txt=CONVERT(varchar(20), m.dtd,104), m.dtd
, m.org, m.dest, m.s_co, m.r_co, m.wt, m.vol_wt, t_srv

-- dir с точки зрения флиппост
--, dir = case when mh.DestTrk='mow' then 'in' else 'out' end
, dir = case when @dir = 'ove' then 'ove'
			 when wbList.isOUT is not null then 'in' 
             when wbList.isIN  is not null then 'out'             
        else 'хз' end

, tar_flip_b = dbo.RoundMoney(icIN.B_Chg)
, tar_flip_a = dbo.RoundMoney(icIN.A_Chg)
, tar_flip_tr = dbo.RoundMoney(icIN.trCost)
, tar_flip_t = dbo.RoundMoney(icIN.T_Chg)
, flip_cash = dbo.RoundMoney(icIN.Cash)
, tar_flip_id = icIN.interId

, tar_ag_b = dbo.RoundMoney(icOUT.B_Chg)
, tar_ag_a = dbo.RoundMoney(icOUT.A_Chg)
, tar_ag_tr = dbo.RoundMoney(icOUT.trCost)
, tar_ag_t = dbo.RoundMoney(icOUT.T_Chg)
, ag_cash = dbo.RoundMoney(icOUT.Cash)
, tar_ag_id = icOUT.interId

, rem_flip = convert(varchar(500), icIN.Rems)
, rem_ag = convert(varchar(500), icOUT.Rems)
, is_ex = (select COUNT(1) from ExLog ex where ex.WbNo = m.Wb_No and ISNULL(ex.WND, 0) = 0 and (ex.ExCode <> 61 and ex.ExCode <> 62))

, req_tar_a = case when (icOUT.interId is not null and req.a_Chg is null) then 0 when req.a_Chg > 0 then req.a_Chg else null end
, req_rem = req.aRem
, m.s_ref
, m.descr


from #wblist wbList
	join Main m with(nolock) on m.Wb_No = wbList.Wb_no
	
	left join InterCo icIN with(nolock) on m.Wb_no = icIN.wb_no and icIN.AgD = @agID
	left join InterCo icOUT with(nolock) on m.Wb_no = icOUT.wb_no and icOUT.AgC = @agID
	
	left join tAChgReq req with(nolock) on req.interId = icOUT.interId and req.aState = 0
	
where 
    (@dir = 'all')
    or 
    (@dir = 'out' and wbList.isIN is not null)
    or 
    (@dir = 'in' and wbList.isOUT is not null)
    or  
    ((@dir = 'ove' and wbList.isIN  is not null) and (m.DOD is null and m.dtd < convert(date,GETDATE())))
order by m.D_Acc desc

GO
GRANT EXECUTE ON [dbo].[wwwGetAgentWbsAnyDates] TO [pod]
GO

