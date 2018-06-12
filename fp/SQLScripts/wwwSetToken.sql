USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwSetToken]    Script Date: 11.06.2018 7:55:21 ******/
DROP PROCEDURE [dbo].[wwwSetToken]
GO

/****** Object:  StoredProcedure [dbo].[wwwSetToken]    Script Date: 11.06.2018 7:55:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[wwwSetToken]
@token varchar(32),
@ag int	
as
Update wwwUser set aToken = @token
where agentID = @ag
exec wwwGetToken  @ag


GO
GRANT EXECUTE ON [dbo].[wwwSetToken] TO [pod] AS [dbo]
GO


