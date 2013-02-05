USE [ALERT_F]
GO

/****** Object:  Table [dbo].[wwwCourLog]    Script Date: 01/30/2013 13:09:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[wwwCourLog](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[courId] [int] NOT NULL,
	[ano] [varchar](50) NOT NULL,
	[event] [varchar](50) NOT NULL,
	[eventTime] [datetime] NOT NULL,
	[aTime] [datetime] NOT NULL,
	[rem] [varchar](50) NULL,
 CONSTRAINT [PK_wwwCourLog] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'pod, ready, go' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'wwwCourLog', @level2type=N'COLUMN',@level2name=N'event'
GO

GRANT SELECT ON [dbo].[wwwCourLog] TO [public]
GO

