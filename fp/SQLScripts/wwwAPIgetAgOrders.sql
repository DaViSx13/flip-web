USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwGetAgOrders]    Script Date: 18.06.2018 7:36:16 ******/
DROP PROCEDURE [dbo].[wwwAPIgetAgOrders]
GO

/****** Object:  StoredProcedure [dbo].[wwwGetAgOrders]    Script Date: 18.06.2018 7:36:16 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[wwwAPIgetAgOrders]
@agentID int = NULL, @First varchar(8) = NULL, @Last varchar(8) = NULL
AS
declare @bDate date, @eDate date, @agID int
--if ISNULL(ltrim(rtrim(@period)), '') = '' or @agentID is null return
IF @First is not NULL and @Last is not NULL
BEGIN
select @bDate = CONVERT(date, @First, 112)
select @eDate = CONVERT(date, @Last, 112)
set @agID = @agentID
END

 
SELECT [ROrdNum] as 'OrderNumber'
      ,ORGCity as 'ORGCityCode'
      ,ORGCity=(select N_City.RusName from  N_City where N_City.id=ORGCity)--
      ,[CName] as 'SenderName'
      ,[Address] as 'SenderAddress'
      ,[ContName] as 'SenderContactName'
      ,[ContPhone] as 'SenderContactPhone'
      ,[ContMail] as 'SenderContacEMail'
      ,[Type] as 'CargoType'
      ,[Packs] as 'NumberOfPackages'
      ,[Wt] as 'Weight'
      ,[VolWt] as 'VolumeWeight'   
      ,DESTCity  as 'DESTCityCode'
      ,DESTCity=(select N_City.RusName from  N_City where N_City.id=DESTCity)--
      ,[DName] as 'DestinationName'
      ,[DAdr] as 'DestinationAddress'
      ,[DContName] as 'DestinationContactName'
      ,[DContPhone] as 'DestinationContactPhone'      
      ,[DContMail] as 'DestinationContacEMail'
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
    
  FROM [AgOrders]
  where [DateIn] >= @bDate and [DateIn] < @eDate
  and (@agID=-1 or (PCACC=@agID or (AgentORG = @agID or AgentDEST = @agID)))
  order by ROrdNum desc
GO
GRANT EXECUTE ON [dbo].[wwwAPIgetAgOrders] TO [pod] AS [dbo]
GO


