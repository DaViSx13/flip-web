USE [ALERT_F]
GO



alter procedure [dbo].[wwwEditAgOrders]
@id int,
@agent int
AS

if @id is null return

SELECT [AgOrders].[rordnum]
      ,orgcode=ORGCity
      ,org=(select N_City.RusName from  N_City where N_City.id=ORGCity)
  
      ,[cname]
      ,[address]
      ,[contname]
      ,[contphone]

      ,[contmail]= case ltrim([contmail]) when '' then null else [contmail] end
      ,[orgrems]

      ,[paytype]
      ,[type]
      ,[packs]
      ,[wt]
      ,[volwt]
      ,[amt]
      ,[curid]

      ,destcode=DESTCity
      ,dest=(select N_City.RusName from  N_City where N_City.id=DESTCity)
 
      ,[dname]
      ,[dadr]
      ,[dcontname]
      ,[dcontphone]

      ,[dcontmail]=case ltrim([dcontmail]) when '' then null else [dcontmail] end
      ,[destrems]
      ,[datein]=convert(varchar,[DateIn],104)
	  ,courdate=convert(varchar,courdate,104)
	  ,courtimef=left(convert(varchar,courtimef,108),5)
	  ,courtimet=left(convert(varchar,courtimet,108),5)
	  , f.FilePlase
	  , f.RealFileName
	  , f.AutorFileName
	  , fileowner = case when pcacc = @agent then 1 else 0 end
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


