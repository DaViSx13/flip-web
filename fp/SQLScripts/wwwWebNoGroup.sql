USE [ALERT_F]
GO

/****** Object:  Table [dbo].[wwwWebNoGroup]    Script Date: 05/06/2020 22:55:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[wwwWebNoGroup](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[web_num] [varchar](50) NOT NULL,
	[order_num] [varchar](50) NOT NULL,
	[cost] [float] NOT NULL,
	[isDeleted] [int] NOT NULL,
	[isAgent] [int] NOT NULL,
	[creatingDate] [date] NULL
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


