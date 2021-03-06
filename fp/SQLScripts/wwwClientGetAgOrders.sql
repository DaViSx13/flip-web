USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwClientGetAgOrders]    Script Date: 06/03/2021 23:21:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER procedure [dbo].[wwwClientGetAgOrders]
@period varchar(10) = null,
@from varchar(8) = null,
@to varchar(8) = null,
@clientID int
AS

--if ISNULL(ltrim(rtrim(@period)), '') = '' or @agentID is null return

if @clientID is null return
if ISNULL(ltrim(rtrim(@period)), '') = '' set @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'

declare @bDate date, @eDate date, @agID int
declare @CACC varchar(50), @aUser varchar(50)

select @CACC = CACC, @aUser = aUser from wwwClientUser where userID = @clientID

BEGIN
	IF @from IS NULL
	--set @agID = @agentID -- 54
		set @bDate = @period+'01'
	ELSE
		SET @bDate = CONVERT(DATE, @from, 112);
END	

BEGIN
	IF @to IS NULL
--set @eDate = dateadd(d, -1, DATEADD(m,1,@bDate))
		set @eDate = DATEADD(m,1,@bDate)
	ELSE
		SET @eDate = DATEADD(DAY,1, CONVERT(DATE, @to, 112));
END			
 
SELECT [ROrdNum]--
     ,ORGCity as org
      ,ORGCity=(select N_City.RusName from  N_City where N_City.id=ORGCity)--
      ,[CName]--
      ,[Address] as s_adr
      ,[ContName] as s_name
      ,[ContPhone] as s_tel
      ,Payr as fpayr
      ,metpaym = case
      when [PayType] = 0 then 'INV'
      else 'CSH'
      end
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
    
  FROM [AgOrders]
--  where [DateIn] between @bDate and @eDate
  where [DateIn] >= @bDate and [DateIn] < @eDate
  and (@agID = -1 or (UserIn=@aUser))
  order by ROrdNum desc

