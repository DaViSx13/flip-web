USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwLKgetOrders]    Script Date: 19.07.2018 12:35:22 ******/
DROP PROCEDURE [dbo].[wwwLKgetOrders]
GO

/****** Object:  StoredProcedure [dbo].[wwwLKgetOrders]    Script Date: 19.07.2018 12:35:22 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE procedure [dbo].[wwwLKgetOrders]
@period varchar(10), @clientID int
AS

--if ISNULL(ltrim(rtrim(@period)), '') = '' or @agentID is null return

if @clientID is null return
if ISNULL(ltrim(rtrim(@period)), '') = '' set @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'

declare @bDate date, @eDate date, @agID int
declare @CACC varchar(50), @aUser varchar(50)

select @CACC = clientID, @aUser = aUser from wwwLKUser where clientID = @clientID

--set @agID = @agentID -- 54
set @bDate = @period+'01'
--set @eDate = dateadd(d, -1, DATEADD(m,1,@bDate))
set @eDate = DATEADD(m,1,@bDate)
 
SELECT [ROrdNum]
     ,ORGCity as org
      ,ORGCity=(select N_City.RusName from  N_City where N_City.id=ORGCity)--
      ,[CName]
      ,[Address] as s_adr
      ,[ContName] as s_name
      ,[ContPhone] as s_tel
   
      ,[ContMail] as s_mail
 
      ,[type]
      ,[Packs]
      ,[Wt]
      ,[VolWt]
  
      ,DESTCity=(select N_City.RusName from  N_City where N_City.id=DESTCity)
      ,[DName]
  
      ,[datein]
	  ,CourDate
	  ,[status]= 
	case
	when Wb_no is null then
		case
			when r.NeedDel = 1 then 'отменен'
			when r.Wb_no is NULL and (r.NeedDel is NULL or r.NeedDel=0) and DATEDIFF(dd, dbo.addWDays(courDate, 2), getDate())>0 then 'просрочено'
			when r.Status = 0  then 'заявлен'
			when r.Status = 1  then 'передан агенту'
			when r.Status = 2  then 'принят агентом'
			when r.Status = 4  then 'присвоен № нак.'
			when r.Status = 3  then 'отказ клиента'
		end
	else
		case --обратный порядок
			when (select tdd from Main m where m.Wb_No = r.Wb_no) is not null then 'доставлено'
			when exists(select 1 from MnfBdy mb where Wb_no = r.Wb_no and mb.MnfRefNo like 'MOW%') then 'отправлено'
			when exists(select 1 from MnfBdy mb where Wb_no = r.Wb_no and mb.MnfRefNo = '0') then 'на комплектовке'
		else 'присвоен № нак.'
		end
	end    
     ,wb_no
    
  FROM RegOrders r
  where [DateIn] >= @bDate and [DateIn] < @eDate
  and (@agID = -1 or (UserIn=@aUser))
  order by ROrdNum desc



GO


grant execute on [wwwLKgetOrders] to [pod]
go
