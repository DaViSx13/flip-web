USE [ALERT_F]
GO

/****** Object:  Table [dbo].[wwwLKTemplate]    Script Date: 06/25/2018 12:17:57 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwLKTemplate]') AND type in (N'U'))
DROP TABLE [dbo].[wwwLKTemplate]
GO

USE [ALERT_F]
GO

/****** Object:  Table [dbo].[wwwLKTemplate]    Script Date: 06/25/2018 12:17:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[wwwLKTemplate](
	[tplID] [int] IDENTITY(1,1) NOT NULL,
	[TemplateName] [varchar](500) NOT NULL,
	[clientID] [int] NOT NULL,
	[ORG] [varchar](10) NULL,
	[ORGCity] [int] NULL,
	[CACC] [varchar](10) NULL,
	[CName] [varchar](60) NULL,
	[Address] [varchar](200) NULL,
	[ContName] [varchar](50) NULL,
	[ContPhone] [varchar](50) NULL,
	[ContFax] [varchar](50) NULL,
	[ContMail] [varchar](50) NULL,
	[OrgRems] [varchar](1000) NULL,
	[DEST] [varchar](10) NULL,
	[DESTCity] [int] NULL,
	[DCACC] [varchar](10) NULL,
	[DName] [varchar](60) NULL,
	[DAdr] [varchar](200) NULL,
	[DContName] [varchar](50) NULL,
	[DContPhone] [varchar](50) NULL,
	[DContFax] [varchar](50) NULL,
	[DContMail] [varchar](50) NULL,
	[DESTRems] [varchar](1000) NULL,
 CONSTRAINT [PK_wwwLKTemplate] PRIMARY KEY CLUSTERED 
(
	[tplID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


