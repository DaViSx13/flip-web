USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwGetAgClientOrders]    Script Date: 03/19/2020 10:35:17 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwGetAgClientOrders]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwGetAgClientOrders]
GO

USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwGetAgClientOrders]    Script Date: 03/19/2020 10:35:17 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[wwwGetAgClientOrders]
@period varchar(10), @agentID int
AS
BEGIN
if @agentID is null return
if ISNULL(ltrim(rtrim(@period)), '') = '' set @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'

declare @bDate date, @eDate date, @agID int

set @bDate = @period+'01'

set @eDate = DATEADD(m,1,@bDate)
 
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
    
  FROM AgOrders f
  where [DateIn] >= @bDate and [DateIn] < @eDate
  and (/*@agID = -1 or*/ PCACC = @agentID)
  order by ROrdNum desc

END

GO

grant execute on [dbo].[wwwGetAgClientOrders] to [pod]
go
