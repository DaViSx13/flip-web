USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwGetAgOrders]    Script Date: 08/27/2012 10:50:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwGetAgOrders]
@period varchar(10), @agentID int
AS

--if ISNULL(ltrim(rtrim(@period)), '') = '' or @agentID is null return

if @agentID is null return
if ISNULL(ltrim(rtrim(@period)), '') = '' set @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'

declare @bDate date, @eDate date, @agID int

set @agID = @agentID -- 54
set @bDate = @period+'01'
set @eDate = dateadd(d, -1, DATEADD(m,1,@bDate))

 
SELECT [ROrdNum]--
     -- ,[ORG]
      ,ORGCity=(select N_City.RusName from  N_City where N_City.id=ORGCity)--
      ,[CName]--
      --,[Address]
      --,[ContName]
     -- ,[ContPhone]
     -- ,[ContFax]
      --,[ContMail]
     -- ,[OrgRems]
     -- ,[Type]
      ,[Packs]--
      ,[Wt]--
      ,[VolWt]--
     -- ,[Amt]
     -- ,[DEST]
      ,DESTCity=(select N_City.RusName from  N_City where N_City.id=DESTCity)--
      ,[DName]--
      --,[DAdr]
      --,[DContName]
      --,[DContPhone]
     -- ,[DContFax]
      --,[DContMail]
      --,[DESTRems]
      ,[datein]--
	  ,[status]= case--
        when AgOrders.NeedDel = 1 then 'отменен'
        when (select COUNT(1) from MnfBdy where Wb_no = AgOrders.Wb_no) <> 0 then 'на комплектовке'
        when AgOrders.Wb_no is NULL and (AgOrders.NeedDel is NULL or AgOrders.NeedDel=0) and DATEDIFF(dd, dbo.addWDays(courDate, 2), getDate())>0 then 'просрочено'
        when AgOrders.Status = 0  then 'заявлен'
        when AgOrders.Status = 1  then 'передан агенту'
        when AgOrders.Status = 2  then 'принят агентом'
        when AgOrders.Status = 4  then 'присвоен № нак.'
        when AgOrders.Status = 3  then 'отказ клиента'
        end
     ,[wb_no]
    
  FROM [ALERT_F].[dbo].[AgOrders]
  where [DateIn] between @bDate and @eDate
  and (@agID=-1 or (PCACC=@agID or (AgentORG = @agID or AgentDEST = @agID)))
  order by ROrdNum desc