USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwCourGetAll]    Script Date: 12/15/2021 08:52:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwCourGetAll]
	@courId int
	,@date varchar(50) = NULL
as	

declare @actDate datetime
--set @courId = 10231
if @date is null
	set @actDate = CAST(GETDATE() as date)
else set @actDate = CAST(@date as date)

if object_id('tempdb..#CourierAll') is not null
drop table #CourierAll

CREATE TABLE #CourierAll(
	aNo [varchar](50) NULL,
	displayNo [varchar](50) NULL,
	aCash [float] NULL,
	aAddress [varchar](200) NULL,
	client [varchar](60) NULL,
	timeB [varchar](5) NULL,
	timeE [varchar](50) NULL,
	tdd [varchar](5) NULL,
	Cont [varchar](100) NULL,
	ContPhone [varchar](50) NULL,
	Packs [int] NULL,
	Wt [float] NULL,
	VolWt [float] NULL,
	Rems [varchar](2000) NULL,
	ordStatus [varchar](10) NULL,
	ordType [tinyint] NULL,
	recType [tinyint] NULL, -- 0 - заказ, 1 - накладная, 2 - счет
	ord [varchar] (50) NULL,
	isExpired [tinyint] NULL,
	)


--заказы
INSERT INTO #CourierAll
select 
  aNo = o.OrderNo
, displayNo = 'ЗАКАЗ'
, aCash = o.Amt
, aAddress = o.[Address]
, client = ISNULL(o.NewCCO, k.c_co)
, timeB = CONVERT(varchar(5), ReadyTime, 108)
, timeE = CONVERT(varchar(5), ReadyTime1, 108)+
   CASE  isnull(k.SLunch, 0)
      WHEN 0 THEN ''  
      ELSE  ' (Обед: '+  left(CONVERT(varchar(12), DATEADD(minute, isnull(k.SLunch, 0), 0), 114), 5) +' - '+ left(CONVERT(varchar(12), DATEADD(minute, isnull(k.ELunch,0), 0), 114), 5)+')'  
   END 
, null
, [NewName]
, o.[ContPhone]
, [AppPcs]
, [AppWt]
, o.[VolWt]
, [OrdRems]
, case o.[Status] when 6 then 'Не готов'
		        else null
                end
, o.[Type]
, 0
, case when g.ROrdNum>0 then 'аг '+ CONVERT(varchar(10), g.ROrdNum) 
			 when r.ROrdNum>0 then 'кл '+ CONVERT(varchar(10), r.ROrdNum)
			 else '' end
, null
from OrdHdr o WITH (NOLOCK) 
	left join Klient k WITH (NOLOCK) on o.CACC = k.CACC
	left join AgOrders g WITH (NOLOCK) on o.OrderNo = g.OrderNo
	left join RegOrders r WITH (NOLOCK) on o.OrderNo = r.OrderNo
where (Ready = @actDate/* or Perenos = @actDate*/)and CourId = @courId
order by o.[Address], client


--накладные
INSERT INTO #CourierAll 
select
aNo = TL.Wb_No
, displayNo = TL.Wb_No
, aCash = m.aCash
, aAddress = m.R_Adr
, client = m.R_Co
, null
, null
, tdd = CONVERT(varchar(5), isnull(m.TDD, p.TDD), 108)
, [R_Name]
, [R_Tel]
, [PCS]
, m.Wt
, [Vol_WT]
, [Descr]
, null
, null
, recType = 1
, null
, case when m.DTD < CAST(GETDATE() as DATE)
	then 1
	else 0
	end	
from TransactLog TL WITH (NOLOCK)
	left join Main m WITH (NOLOCK) on  m.Wb_No = TL.Wb_No
	left join tPOD p WITH (NOLOCK) on p.wb_no = TL.Wb_No
where TrTypeId = 2 and DateTransact = @actDate and CourIdTo = @courId  and TL.Wb_No <> '0'
order by m.R_Adr, m.R_Co

--счета
INSERT INTO #CourierAll 
select
aNo = TL.PakNo
, displayNo = '0(' + inv.INV_NO + ')'
, null
, aAddress = k.C_Adr
, client = k.C_CO
, null
, null
, null
, k.C_Name
, k.C_Tel
, null
, null
, null
, null
, null
, null
, recType = 2
, null
, null
from TransactLog TL WITH (NOLOCK)
left join Inv_hdr inv WITH (NOLOCK) on inv.invID = TL.PakNo
left join Klient k WITH (NOLOCK) on k.CACC = inv.CACC
where TrTypeId = 2 and DateTransact = @actDate and CourIdTo = @courId and TL.Wb_No = '0'



update #CourierAll set aAddress = UPPER(aAddress), client = UPPER(client)

select *, isredy=0, inway=0, isview=0, rcpn=null 
from #CourierAll
order by aAddress, client

--drop table #CourierAll

