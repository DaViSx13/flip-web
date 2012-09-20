USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwCourGetAll]    Script Date: 09/20/2012 10:44:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwCourGetAll]
	@courId int
as	
--declare @courId int
declare @actDate datetime
set @courId = 10231
set @actDate = '20120808'--CAST(getdate() as date)

CREATE TABLE #CourierAll(
	aNo [varchar](11),
	displayNo [varchar](10),
	aCash [float],
	aAddress [varchar](70),
	client [varchar](60),
	timeB [varchar](5),
	timeE [varchar](5),
	tdd [varchar](5),
	Cont [varchar](100),
	ContPhone [varchar](50),
	Packs [int],
	Wt [float],
	VolWt [float],
	Rems [varchar](300),
	ordStatus [tinyint],
	ordType [tinyint]
	)

INSERT INTO #CourierAll
select 
  aNo = OrderNo
, displayNo = 'ЗАКАЗ'
, aCash = Amt
, aAddress = [Address]
, client = ISNULL(o.NewCCO, k.c_co)
, timeB = CONVERT(varchar(5), ReadyTime, 108)
, timeE = CONVERT(varchar(5), ReadyTime1, 108)
, null
, [NewName]
, [ContPhone]
, [Packs]
, [RealWt]
, [VolWt]
, [OrdRems]
, [Status]
, [Type]
from OrdHdr o 
	left join Klient k on o.CACC = k.CACC
where (Ready = @actDate/* or Perenos = @actDate*/)and CourId = @courId
order by [Address], client

INSERT INTO #CourierAll
select 
  aNo = tl.Wb_No
, displayNo = case when TL.Wb_No = '0' then TL.Wb_No + '(' + cast(TL.PakNo as varchar(50)) + ')' else TL.Wb_No end
, aCash = m.aCash
, aAddress = m.R_Adr
, client = m.R_Co
, null
, null
, tdd = CONVERT(varchar(5), m.TDD, 108)
, [R_Name]
, [R_Tel]
, [PCS]
, m.Wt
, [Vol_WT]
, [Descr]
, null
, null
from TransactLog TL
	left join Main m on m.Wb_No = TL.Wb_No
where TrTypeId = 2 and DateTransact = @actDate and CourIdTo = @courId 
order by m.R_Adr, m.R_Co

select * from #CourierAll

drop table #CourierAll
/*
go
grant execute on wwwCourGetOrders to [pod]
go*/
