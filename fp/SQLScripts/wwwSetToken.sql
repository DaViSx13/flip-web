USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwSetToken]    Script Date: 06/05/2018 14:38:44 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwSetToken]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwSetToken]
GO

USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwSetToken]    Script Date: 06/05/2018 14:38:44 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[wwwSetToken]
@token varchar(16),
@ag int	
as
Update wwwUser set aToken = @token
where agentID = @ag
exec wwwGetToken  @ag

GO
GRANT EXECUTE ON [dbo].[wwwSetToken] TO [pod] AS [dbo]
GO


