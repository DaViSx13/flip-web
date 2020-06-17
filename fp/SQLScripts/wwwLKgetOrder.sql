USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwLKgetOrder]    Script Date: 06/17/2020 22:25:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER procedure [dbo].[wwwLKgetOrder]
@id int,
@agent varchar(10)
AS

if @id is null return

SELECT r.[rordnum]
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
      ,[ORGAdressIndex]
      ,[DESTAdressIndex]

      ,[dcontmail]=case ltrim([dcontmail]) when '' then null else [dcontmail] end
      ,[destrems]
      ,[datein]=convert(varchar,[DateIn],104)
	  ,courdate=convert(varchar,courdate,104)
	  ,courtimef=left(convert(varchar,courtimef,108),5)
	  ,courtimet=left(convert(varchar,courtimet,108),5)
	 -- , f.FilePlase
	 -- , f.RealFileName
	 -- , f.AutorFileName
	 -- , fileowner = case when pcacc = @agent then 1 else 0 end
	  , [status]= case--
        when r.NeedDel = 1 then 'отменен'
        when (select COUNT(1) from MnfBdy where Wb_no = r.Wb_no) <> 0 then 'на комплектовке'
        when r.Wb_no is NULL and (r.NeedDel is NULL or r.NeedDel=0) and DATEDIFF(dd, dbo.addWDays(courDate, 2), getDate())>0 then 'просрочено'
        when r.Status = 0  then 'заявлен'
        when r.Status = 1  then 'передан агенту'
        when r.Status = 2  then 'принят агентом'
        when r.Status = 4  then 'присвоен № нак.'
        when r.Status = 3  then 'отказ клиента'
        end
  FROM RegOrders r
  --left join AgFiles f on r.ROrdNum =f.ROrdNum
  where r.[ROrdNum]=@id

