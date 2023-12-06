USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwGetAgOrders]    Script Date: 12/06/2023 09:19:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[wwwGetAgOrdersNew]
@period varchar(10) = NULL, @agentID int = NULL, @First varchar(8) = NULL, @Last varchar(8) = NULL
AS
BEGIN
declare @bDate date, @eDate date, @agID int
--if ISNULL(ltrim(rtrim(@period)), '') = '' or @agentID is null return
IF @First is not NULL and @Last is not NULL
BEGIN
select @bDate = CONVERT(date, @First, 112)
select @eDate = CONVERT(date, @Last, 112)
set @eDate = DATEADD(d,1,@eDate)
set @agID = @agentID
END ELSE
BEGIN
if @agentID is null return
if ISNULL(ltrim(rtrim(@period)), '') = '' set @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'
set @agID = @agentID -- 54
set @bDate = @period+'01'
--set @eDate = dateadd(d, -1, DATEADD(m,1,@bDate))
set @eDate = DATEADD(m,1,@bDate)
END

 
SELECT [ROrdNum]--
     -- ,[ORG]
		,ORGCity=(select N_City.RusName from  N_City where N_City.id=ORGCity)--
		,[CName]--
		, [SortType] as cat
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
	  ,[status]= 
	case
	when Wb_no is null then
		case
			when AgOrders.NeedDel = 1 then 'отменен'
			when AgOrders.Wb_no is NULL and (AgOrders.NeedDel is NULL or AgOrders.NeedDel=0) and DATEDIFF(dd, dbo.addWDays(courDate, 2), getDate())>0 then 'просрочено'
			when AgOrders.Status = 0  then 'заявлен'
			when AgOrders.Status = 1  then 'передан агенту'
			when AgOrders.Status = 2  then 'принят агентом'
			when AgOrders.Status = 4  then 'присвоен № нак.'
			when AgOrders.Status = 3  then 'отказ клиента'
		end
	else
		case --обратный порядок
			when (select tdd from Main m where m.Wb_No = AgOrders.Wb_no) is not null then 'доставлено'
			when exists(select 1 from MnfBdy mb where Wb_no = AgOrders.Wb_no and mb.MnfRefNo like 'MOW%') then 'отправлено'
			when exists(select 1 from MnfBdy mb where Wb_no = AgOrders.Wb_no and mb.MnfRefNo = '0') then 'на комплектовке'
		else 'присвоен № нак.'
		end
	end    
     ,[wb_no]
     ,[SubCategory] as subtype
    , is_ex = (select COUNT(1) from ExLog ex where ex.AgOrdNo = ROrdNum and ISNULL(ex.WND, 0) = 0 and (ex.ExCode <> 61 and ex.ExCode <> 62))
  FROM [AgOrders] WITH (NOLOCK)
  where [DateIn] between @bDate and @eDate
  --where [DateIn] >= @bDate and [DateIn] < @eDate
  and (@agID=-1 or (AgentORG = @agID or AgentDEST = @agID))
  order by ROrdNum desc
END

GRANT EXECUTE ON [wwwGetAgOrdersNew] TO pod
