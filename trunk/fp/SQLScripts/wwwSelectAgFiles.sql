USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwSelectAgFiles]    Script Date: 02/28/2013 09:16:11 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwSelectAgFiles]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwSelectAgFiles]
GO

USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwSelectAgFiles]    Script Date: 02/28/2013 09:16:11 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




create   PROCEDURE [dbo].[wwwSelectAgFiles]	 
	@ROrdNum [int]
AS
SET dateformat dmy
select top 1	[ROrdNum],
	[UploadFileTime]= CONVERT(varchar(20),[UploadFileTime],104)+' '+CONVERT(varchar(20),[UploadFileTime],108),
	[AutorFileName],
	[RealFileName] ,
	[FileType] as FType,
	[FileSize] as FSize ,
	[FilePlase],
	[InsUsr] 
	from [dbo].[AgFiles]
	where ([ROrdNum] like ROrdNum )
order by [UploadFileTime]desc

return @@error


GO


