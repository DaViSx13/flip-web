USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwGetWbsTotal]    Script Date: 11/09/2017 09:19:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER Procedure [dbo].[wwwGetWbsTotal]
	@dir varchar(3), @period varchar(10), @agentID int 
AS

--if ISNULL(ltrim(rtrim(@period)), '') = '' or @agentID is null return

if @agentID is null return
if ISNULL(ltrim(rtrim(@period)), '') = '' set @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'

declare @bDate date, @eDate date, @agID int

set @agID = @agentID -- 54
set @bDate = @period --'20100201'
set @eDate = dateadd(d, -1, DATEADD(m,1,@bDate))

--select @bDate, @eDate



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

select s_wb = COUNT(m.Wb_No)
,s_wt = ISNULL(sum (m.wt),0)
,s_vol_wt = ISNULL(sum (m.vol_wt),0)

, s_flip_b = ISNULL(dbo.RoundMoney(sum(icIN.B_Chg)),0)
, s_flip_a = ISNULL(dbo.RoundMoney(sum(icIN.A_Chg)),0)
, s_flip_tr = ISNULL(dbo.RoundMoney(sum(icIN.trCost)),0)
, s_flip_t = ISNULL(dbo.RoundMoney(sum(icIN.T_Chg)),0)
, s_flip_cash = ISNULL(dbo.RoundMoney(sum(icIN.Cash)),0)

, s_ag_b = ISNULL(dbo.RoundMoney(sum(icOUT.B_Chg)),0)
, s_ag_a = ISNULL(dbo.RoundMoney(sum(icOUT.A_Chg)),0)
, s_ag_tr = ISNULL(dbo.RoundMoney(sum(icOUT.trCost)),0)
, s_ag_t = ISNULL(dbo.RoundMoney(sum(icOUT.T_Chg)),0)
, s_ag_cash = ISNULL(dbo.RoundMoney(sum(icOUT.Cash)),0)

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
--order by m.D_Acc desc