USE [ALERT_F]
GO

drop TABLE [dbo].wwwClientTemplate
go

/****** Object:  Table [dbo].[AgOrdersTemplate]    Script Date: 05/12/16 15:01:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].wwwClientTemplate(
	[tplID] [int] IDENTITY(1,1) NOT NULL,
	[TemplateName] [varchar](500) NOT NULL,
	[clientID] [int] NOT NULL,
	[ORG] [varchar](10) NULL,
	[ORGCity] [int] NULL,
	[CACC] [varchar](10) NULL,
	[CName] [varchar](60) NULL,
	[Address] [varchar](70) NULL,
	[ContName] [varchar](50) NULL,
	[ContPhone] [varchar](50) NULL,
	[ContFax] [varchar](50) NULL,
	[ContMail] [varchar](50) NULL,
	[OrgRems] [varchar](1000) NULL,
	[DEST] [varchar](10) NULL,
	[DESTCity] [int] NULL,
	[DCACC] [varchar](10) NULL,
	[DName] [varchar](60) NULL,
	[DAdr] [varchar](70) NULL,
	[DContName] [varchar](50) NULL,
	[DContPhone] [varchar](50) NULL,
	[DContFax] [varchar](50) NULL,
	[DContMail] [varchar](50) NULL,
	[DESTRems] [varchar](1000) NULL,
 CONSTRAINT [PK_wwwClientTemplate] PRIMARY KEY CLUSTERED 
(
	[tplID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


