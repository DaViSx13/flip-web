USE [ALERT_F]
GO

/****** Object:  Table [dbo].[wwwClientWB]    Script Date: 02/19/2018 14:16:37 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[wwwClientWB](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Wb_No] [varchar](50) NOT NULL,
	[Ord_No] [int] NOT NULL,
	[ORG] [varchar](5) NOT NULL,
	[S_City] [varchar](200) NOT NULL,
	[S_Name] [varchar](20) NOT NULL,
	[S_Tel] [varchar](50) NOT NULL,
	[S_Co] [varchar](40) NOT NULL,
	[S_Adr] [varchar](200) NOT NULL,
	[S_Ref] [varchar](300) NULL,
	[S_Mail] [varchar](200) NULL,
	[DEST] [varchar](5) NOT NULL,
	[R_City] [varchar](200) NOT NULL,
	[R_Name] [varchar](20) NOT NULL,
	[R_Tel] [varchar](50) NOT NULL,
	[R_Co] [varchar](40) NOT NULL,
	[R_Adr] [varchar](200) NOT NULL,
	[R_Ref] [varchar](300) NULL,
	[R_Mail] [varchar](200) NULL,
	[User_IN] [varchar](50) NOT NULL,
	[Date_IN] [datetime] NOT NULL,
	[WT] [float] NOT NULL,
	[VOL_WT] [float] NULL,
	[PCS] [int] NULL,
	[T_PAC] [varchar](3) NULL,
 CONSTRAINT [PK_wwwClientWB] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


