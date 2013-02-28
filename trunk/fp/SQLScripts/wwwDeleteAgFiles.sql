USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwDeleteAgFiles]    Script Date: 02/28/2013 09:14:54 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwDeleteAgFiles]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwDeleteAgFiles]
GO

USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwDeleteAgFiles]    Script Date: 02/28/2013 09:14:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create PROCEDURE [dbo].[wwwDeleteAgFiles]
(
@ROrdNum [int],
@InsUsr  [nchar](10),
@RealFileName [varchar](50)
 )
as
declare 
@id int,
 @RealDelName [varchar](50) ,
 @AutorDelName [varchar](100),
 @FilePlase [varchar](250)

select top 1 @id =[FileID],@RealDelName=[RealFileName],@AutorDelName=[AutorFileName],@FilePlase = [FilePlase]
from [dbo].[AgFiles]
where
([ROrdNum] like '%'+LTRIM(RTRIM(@ROrdNum))+'%'
and
[InsUsr] like '%'+LTRIM(RTRIM(@InsUsr))+'%') 
or
[RealFileName] like '%'+LTRIM(RTRIM(@RealFileName))+'%'	
order by [UploadFileTime]

delete from [dbo].[AgFiles]
where
@id =[FileID]
	
select 
 @RealDelName as RealDelName,
 @AutorDelName as AutorDelName,
 @FilePlase as FilePlase

	 

GO


