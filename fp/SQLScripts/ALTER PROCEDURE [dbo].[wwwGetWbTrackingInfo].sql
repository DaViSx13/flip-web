USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwGetWbTrackingInfo]    Script Date: 22/06/16 13:43:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[wwwGetWbTrackingInfo]
    @wbno varchar(50)
as

SET NOCOUNT ON

declare @wbno1 varchar(50)
declare @trackInfo varchar(500)
declare @selfAgentId int
set @selfAgentId = 256


set @wbno1 = @wbno

--set @wbno1 = '0001088'--'2765-0380'--'081451'--'000658'

--движения
--if OBJECT_ID('tempdb..#moves') is not null drop table #moves
create table #moves (id int IDENTITY(1,1), transID int, trType int, aTime datetime, loc varchar(50), locDest varchar(50), descr varchar(50))

declare @orgTrack varchar(50), @destTrack varchar(50), @shpd datetime, @dArr datetime
--входящий манифест
select @orgTrack = mh.OrgTrk, @destTrack = mh.DestTrk, @shpd = mh.Shpd, @dArr = mh.Darr 
from MnfHdr mh 
  join MnfBdy mb on mb.MnfRefNo = mh.MNFRefNo
where mb.Wb_no = @wbno1 and mh.DestAgentID = @selfAgentId

if @orgTrack is not null --есть манифест
  begin
  --1
  if @shpd is not null
  insert #moves(aTime, loc, locDest, descr)
  select convert(varchar(50), @shpd,112), @orgTrack, @destTrack, 
    'В пути ' + (select FUll_Name from city where code = @orgTrack) + ' - ' + (select FUll_Name from city where code = @destTrack)
  --2
  if @dArr is not null
  insert #moves(aTime, loc, locDest, descr)
  select convert(varchar(50), @dArr, 112), @destTrack, null,
    'Прибыло в г.' + (select FUll_Name from city where code = @destTrack)
  end

select @orgTrack = null
--исходящий манифест
select @orgTrack = mh.OrgTrk, @destTrack = mh.DestTrk, @shpd = mh.Shpd, @dArr = mh.Darr 
from MnfHdr mh 
  join MnfBdy mb on mb.MnfRefNo = mh.MNFRefNo
where mb.Wb_no = @wbno1 and mh.OrgAgentID = @selfAgentId

if @orgTrack is not null --есть манифест
  begin
  --1
  if @shpd is not null
  insert #moves(aTime, loc, locDest, descr)
  select convert(varchar(50), @shpd, 112), @orgTrack, @destTrack, 
    'В пути ' + (select FUll_Name from city where code = @orgTrack) + ' - ' + (select FUll_Name from city where code = @destTrack)
  --2
  if @dArr is not null
  insert #moves(aTime, loc, locDest, descr)
  select convert(varchar(50), @dArr, 112), @destTrack, null,
    'Прибыло в г.' + (select FUll_Name from city where code = @destTrack)
  end

--курьеры
insert #moves(transID, trType, aTime, loc, locDest, descr)
select 
TransID
, tl.TrTypeId
, Date_In--dt=CONVERT(varchar(20), Date_In,104) + ' ' + CONVERT(varchar(5), Date_In, 108)
, loc = (select loc from frm where Idx = frm_in)
, null as locDest
, descr = tt.Descr
from TransactLog TL
	left join dbo.TransactTypeId TT on TL.TrTypeId = TT.TrTypeId
where Wb_No = @wbno1 and tl.TrTypeId in (2, 4)

--доставлено
declare @dod datetime, @tdd datetime, @rcpn varchar(100), @dest varchar(50)
select @dod = m.DOD, @tdd = m.TDD, @rcpn = m.RCPN, @dest = m.DEST
from Main m 
where m.Wb_No = @wbno1

if @tdd is not null 
  begin
    set @trackInfo = 'Доставлено: ' + ' ' + @rcpn

    insert #moves(aTime, loc, descr)
    --select @dod + @tdd, @dest, @trackInfo
	select convert(varchar(50), @dod, 112) + ' ' + convert(varchar(5),@tdd,8), @dest, @trackInfo
  end


select 
id,
trackInfo = convert(varchar(50), aTime, 3) 
  + case when convert(varchar(5), aTime, 8) <> '00:00' then ' ' + convert(varchar(5), aTime, 8) else '' end
  + ': ' + descr
from #moves order by aTime


GO

grant execute on [dbo].[wwwGetWbTrackingInfo] to [public]
GO