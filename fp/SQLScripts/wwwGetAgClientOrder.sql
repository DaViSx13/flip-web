USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwEditAgOrders]    Script Date: 12/13/2023 09:49:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE procedure [dbo].[wwwGetAgClientOrder]
@id int,
@agent int
AS

if @id is null return

SELECT reg.[rordnum]
      ,orgcode=ORGCity
      ,org=(select N_City.RusName from  N_City where N_City.id=ORGCity)
	  , SortType as cat
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
      ,Payr as fpayr
      ,metpaym = case
      when [PayType] = 0 then 'INV'
      else 'CSH'
      end
      ,[dcontmail]=case ltrim([dcontmail]) when '' then null else [dcontmail] end
      ,[destrems]
      ,[datein]=convert(varchar,[DateIn],104)
	  ,courdate=convert(varchar,courdate,104)
	  ,courtimef=left(convert(varchar,courtimef,108),5)
	  ,courtimet=left(convert(varchar,courtimet,108),5)
	  , fileowner = case when pcacc = @agent then 1 else 0 end
	  , [status]= case--
        when reg.NeedDel = 1 then 'отменен'
        when (select COUNT(1) from MnfBdy where Wb_no = reg.Wb_no) <> 0 then 'на комплектовке'
        when reg.Wb_no is NULL and (reg.NeedDel is NULL or reg.NeedDel=0) and DATEDIFF(dd, dbo.addWDays(courDate, 2), getDate())>0 then 'просрочено'
        when reg.Status = 0  then 'заявлен'
        when reg.Status = 1  then 'передан агенту'
        when reg.Status = 2  then 'принят агентом'
        when reg.Status = 4  then 'присвоен № нак.'
        when reg.Status = 3  then 'отказ клиента'
        end
      , [SubCategory]  as subtype
  FROM RegOrders reg
  --left join AgFiles f on [AgOrders].ROrdNum =f.ROrdNum
  where reg.[ROrdNum]=@id
  go
  grant execute on [wwwGetAgClientOrder] to pod
go
