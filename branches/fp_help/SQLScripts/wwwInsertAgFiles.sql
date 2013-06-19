USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwInsertAgFiles]    Script Date: 02/28/2013 09:15:37 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwInsertAgFiles]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwInsertAgFiles]
GO

USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwInsertAgFiles]    Script Date: 02/28/2013 09:15:37 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


create   PROCEDURE [dbo].[wwwInsertAgFiles]	 
	(@ROrdNum [int],
	@AutorFileName [varchar](100),
	@RealFileName [varchar](50),
	@FileType [char](10),
	@FileSize [nchar](10),
	@FilePlase [varchar](250),
	@InsUsr  [nchar](10) )


AS
SET dateformat dmy

INSERT INTO [dbo].[AgFiles]
( 	
	[ROrdNum],
	[UploadFileTime],
	[AutorFileName],
	[RealFileName] ,
	[FileType],
	[FileSize] ,
	[FilePlase],
	[InsUsr] )
	VALUES
	(
	@ROrdNum,
	getdate(),
	@AutorFileName,
	@RealFileName,
	@FileType,
	@FileSize,
	@FilePlase,
	@InsUsr
	)
	 return @@error

GO


