USE [ALERT_F]
GO

IF  EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_wwwLKUser_active]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[wwwLKUser] DROP CONSTRAINT [DF_wwwLKUser_active]
END

GO

USE [ALERT_F]
GO

/****** Object:  Table [dbo].[wwwLKUser]    Script Date: 06/25/2018 12:12:01 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwLKUser]') AND type in (N'U'))
DROP TABLE [dbo].[wwwLKUser]
GO

USE [ALERT_F]
GO

/****** Object:  Table [dbo].[wwwLKUser]    Script Date: 06/25/2018 12:12:01 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[wwwLKUser](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[aUser] [varchar](50) NOT NULL,
	[aPassword] [varchar](50) NOT NULL,	
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_wwwLKUser] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[wwwLKUser] ADD  CONSTRAINT [DF_wwwLKUser_active]  DEFAULT ((1)) FOR [active]
GO


