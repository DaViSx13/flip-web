USE [ALERT_F]
GO

/****** Object:  Table [dbo].[AgOrdersTemplate]    Script Date: 04/07/16 15:55:14 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[wwwClientTemplate](
	[tplID] [int] IDENTITY(1,1) NOT NULL,
	[TemplateName] [varchar](500) NOT NULL,
	[clientID] [int] NOT NULL,

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


