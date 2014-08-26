USE [ALERT_F]
GO

/****** Object:  Table [dbo].[AgFiles]    Script Date: 02/28/2013 09:10:45 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[AgFiles]') AND type in (N'U'))
DROP TABLE [dbo].[AgFiles]
GO

USE [ALERT_F]
GO

/****** Object:  Table [dbo].[AgFiles]    Script Date: 02/28/2013 09:10:45 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[AgFiles](
	[FileID] [int] IDENTITY(1,1) NOT NULL,
	[ROrdNum] [int] NOT NULL,
	[UploadFileTime] [datetime] NOT NULL,
	[AutorFileName] [varchar](100) NULL,
	[RealFileName] [varchar](50) NOT NULL,
	[FileType] [char](10) NULL,
	[FileSize] [nchar](10) NULL,
	[FilePlase] [varchar](250) NOT NULL,
	[InsUsr] [varchar](20) NULL,
	[IsDelete] [tinyint] NULL,
 CONSTRAINT [PK_AgFiles] PRIMARY KEY CLUSTERED 
(
	[FileID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


