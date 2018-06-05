USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwGetToken]    Script Date: 06/05/2018 14:38:21 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwGetToken]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwGetToken]
GO

USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwGetToken]    Script Date: 06/05/2018 14:38:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[wwwGetToken]
@ag int	
as
select aToken from wwwUser where agentID = @ag
GO
GRANT EXECUTE ON [dbo].[wwwGetToken] TO [pod] AS [dbo]
GO


