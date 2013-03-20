USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwGetWbsTotal]    Script Date: 03/20/2013 12:01:56 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwGetWbsTotal]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwGetWbsTotal]
GO

USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwGetWbsTotal]    Script Date: 03/20/2013 12:01:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[wwwGetWbsTotal]
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


select s_wb = COUNT(m.Wb_No)
,s_wt = ISNULL(sum (m.wt),0)
,s_vol_wt = ISNULL(sum (m.vol_wt),0)

, s_flip_b = ISNULL(dbo.RoundMoney(sum(icIN.B_Chg)),0)
, s_flip_a = ISNULL(dbo.RoundMoney(sum(icIN.A_Chg)),0)
, s_flip_t = ISNULL(dbo.RoundMoney(sum(icIN.T_Chg)),0)


, s_ag_b = ISNULL(dbo.RoundMoney(sum(icOUT.B_Chg)),0)
, s_ag_a = ISNULL(dbo.RoundMoney(sum(icOUT.A_Chg)),0)
, s_ag_t = ISNULL(dbo.RoundMoney(sum(icOUT.T_Chg)),0)


from MnfHdr mh 
	left join MnfBdy mb on mh.MNFRefNo = mb.MnfRefNo
	left join Main m on m.Wb_No = mb.Wb_no
	
	left join InterCo icIN on mb.Wb_no = icIN.wb_no and icIN.AgD = @agID
	left join InterCo icOUT on mb.Wb_no = icOUT.wb_no and icOUT.AgC = @agID
	
	left join tAChgReq req on req.interId = icOUT.interId and req.aState = 0
	
	where  ( (mh.OrgAgentID = @agID) or (mh.DestAgentID= @agID) )
	and (	((@dir <> 'ove') and mh.Shpd between @bDate and @eDate) 
		or  ((@dir = 'ove') and (m.DOD is null and m.dtd < convert(date,GETDATE())))
		)
	and m.Wb_No is not null
	and ((@dir = 'in' and mh.DestTrk='mow') or ((@dir = 'out' or @dir = 'ove') and mh.DestTrk!='mow')  or (@dir = 'all' ) )
--group by m.wb_no

GO

grant execute on [dbo].[wwwGetWbsTotal] to pod
go

