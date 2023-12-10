USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwGetAgClientOrders]    Script Date: 12/11/2023 00:49:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROCEDURE [dbo].[wwwGetAgClientOrders]
@period varchar(10) = null,
@First varchar(8) = null,
@Last varchar(8) = null,
@agentID int
AS
BEGIN
if @agentID is null return
if ISNULL(ltrim(rtrim(@period)), '') = '' set @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'

declare @bDate date, @eDate date, @agID int


IF @First IS NULL
set @bDate = @period+'01'
ELSE
set @bDate = CONVERT(DATE, @First, 112)



IF @Last IS NULL
set @eDate = DATEADD(m,1,@bDate)

ELSE
BEGIN
set @eDate = CONVERT(DATE, @Last, 112)
set @eDate = DATEADD(d,1,@eDate)
END

SELECT [ROrdNum]--
     ,ORGCity as org
      ,ORGCity=(select N_City.RusName from  N_City where N_City.id=ORGCity)--
      ,[CName]--
      ,[Address] as s_adr
      ,[ContName] as s_name
      ,[ContPhone] as s_tel
     -- ,[ContFax]
      ,[ContMail] as s_mail
     -- ,[OrgRems]
      ,[type]
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
			when f.NeedDel = 1 then 'отменен'
			when f.Wb_no is NULL and (f.NeedDel is NULL or f.NeedDel=0) and DATEDIFF(dd, dbo.addWDays(courDate, 2), getDate())>0 then 'просрочено'
			when f.Status = 0  then 'заявлен'
			when f.Status = 1  then 'передан агенту'
			when f.Status = 2  then 'принят агентом'
			when f.Status = 4  then 'присвоен № нак.'
			when f.Status = 3  then 'отказ клиента'
		end
	else
		case --обратный порядок
			when (select tdd from Main m where m.Wb_No = f.Wb_no) is not null then 'доставлено'
			when exists(select 1 from MnfBdy mb where Wb_no = f.Wb_no and mb.MnfRefNo like 'MOW%') then 'отправлено'
			when exists(select 1 from MnfBdy mb where Wb_no = f.Wb_no and mb.MnfRefNo = '0') then 'на комплектовке'
		else 'присвоен № нак.'
		end
	end    
     ,[wb_no]
    
  FROM [AgOrders] f WITH (NOLOCK)
  where [DateIn] between @bDate and @eDate
  --where [DateIn] >= @bDate and [DateIn] < @eDate
  and @agID=-1 or (PCACC=@agID or (AgentORG = @agID or AgentDEST = @agID))
  UNION ALL
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
			when reg.NeedDel = 1 then 'отменен'
			when reg.Wb_no is NULL and (reg.NeedDel is NULL or reg.NeedDel=0) and DATEDIFF(dd, dbo.addWDays(courDate, 2), getDate())>0 then 'просрочено'
			when reg.Status = 0  then 'заявлен'
			when reg.Status = 1  then 'передан агенту'
			when reg.Status = 2  then 'принят агентом'
			when reg.Status = 4  then 'присвоен № нак.'
			when reg.Status = 3  then 'отказ клиента'
		end
	else
		case --обратный порядок
			when (select tdd from Main m where m.Wb_No = reg.Wb_no) is not null then 'доставлено'
			when exists(select 1 from MnfBdy mb where Wb_no = reg.Wb_no and mb.MnfRefNo like 'MOW%') then 'отправлено'
			when exists(select 1 from MnfBdy mb where Wb_no = reg.Wb_no and mb.MnfRefNo = '0') then 'на комплектовке'
		else 'присвоен № нак.'
		end
	end    
     ,[wb_no]
     ,[SubCategory] as subtype
    , is_ex = (select COUNT(1) from ExLog ex where ex.AgOrdNo = ROrdNum and ISNULL(ex.WND, 0) = 0 and (ex.ExCode <> 61 and ex.ExCode <> 62))
  FROM RegOrders reg
  where [DateIn] >= @bDate and [DateIn] < @eDate
  and  reg.agentID = @agentID 
  order by ROrdNum desc

END

grant execute on [wwwGetAgClientOrders] to pod
