USE [ALERT_F]
GO

/****** Object:  Table [dbo].[wwwClientUser]    Script Date: 03/07/16 9:49:19 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[wwwClientUser](
	[userID] [int] IDENTITY(1,1) NOT NULL,
	[aUser] [varchar](50) NOT NULL,
	[aPassword] [varchar](50) NOT NULL,
	[CACC] [varchar](50) NOT NULL,
	[agentID] [int] NOT NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_wwwClientUser] PRIMARY KEY CLUSTERED 
(
	[userID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[wwwClientUser] ADD  CONSTRAINT [DF_wwwClientUser_active]  DEFAULT ((1)) FOR [active]
GO

/****** Object:  Index [IX_wwwClientUser]    Script Date: 03/07/16 9:49:56 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_wwwClientUser] ON [dbo].[wwwClientUser]
(
	[aUser] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
GO

