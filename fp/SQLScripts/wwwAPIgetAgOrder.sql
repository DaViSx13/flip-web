USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwEditAgOrders]    Script Date: 18.06.2018 8:08:08 ******/
DROP PROCEDURE [dbo].[wwwAPIgetAgOrder]
GO

/****** Object:  StoredProcedure [dbo].[wwwEditAgOrders]    Script Date: 18.06.2018 8:08:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE procedure [dbo].[wwwAPIgetAgOrder]
@id int,
@agent int
AS

if @id is null return

SELECT [AgOrders].[rordnum] as 'OrderNumber'
      ,ORGCity as 'ORGCityCode'
      ,ORGCity=(select N_City.RusName from  N_City where N_City.id=ORGCity)
  
      ,[cname] as 'SenderName'
      ,[address] as 'SenderAddress'
      ,[contname] as 'SenderContactName'
      ,[contphone] as 'SenderContactPhone'

      ,SenderContacEMail= case ltrim([contmail]) when '' then null else [contmail] end
      ,[orgrems] as 'SenderDescription'

   --   ,[paytype]
      ,[type]  as 'CargoType'
      ,[packs] as 'NumberOfPackages'
      ,[wt] as 'Weight'
      ,[volwt] as 'VolumeWeight'
   --   ,[amt]
    --  ,[curid]

      ,DESTCity  as 'DESTCityCode'
      ,DESTCity=(select N_City.RusName from  N_City where N_City.id=DESTCity)
 
      ,[dname] as 'DestinationName'
      ,[dadr] as 'DestinationAddress'
      ,[dcontname] as 'DestinationContactName'
      ,[dcontphone] as 'DestinationContactPhone'

      ,DestinationContacEMail=case ltrim([dcontmail]) when '' then null else [dcontmail] end
      ,[destrems] as 'DestinationDescription'
    --  ,[datein]=convert(varchar,[DateIn],104)
	  ,CourierArrivalDate=convert(varchar,courdate,104)
	  ,CourierArrivalTimeFirst=left(convert(varchar,courtimef,108),5)
	  ,CourierArrivalTimeLast=left(convert(varchar,courtimet,108),5)
	--  , f.FilePlase
	--  , f.RealFileName
	 -- , f.AutorFileName
	 -- , fileowner = case when pcacc = @agent then 1 else 0 end
	  , [status]= case--
        when AgOrders.NeedDel = 1 then 'отменен'
        when (select COUNT(1) from MnfBdy where Wb_no = AgOrders.Wb_no) <> 0 then 'на комплектовке'
        when AgOrders.Wb_no is NULL and (AgOrders.NeedDel is NULL or AgOrders.NeedDel=0) and DATEDIFF(dd, dbo.addWDays(courDate, 2), getDate())>0 then 'просрочено'
        when AgOrders.Status = 0  then 'заявлен'
        when AgOrders.Status = 1  then 'передан агенту'
        when AgOrders.Status = 2  then 'принят агентом'
        when AgOrders.Status = 4  then 'присвоен № нак.'
        when AgOrders.Status = 3  then 'отказ клиента'
        end
  FROM [AgOrders]
  left join AgFiles f on [AgOrders].ROrdNum =f.ROrdNum
  where [AgOrders].[ROrdNum]=@id


GO
GRANT EXECUTE ON [dbo].[wwwAPIgetAgOrder] TO [pod] AS [dbo]
GO


