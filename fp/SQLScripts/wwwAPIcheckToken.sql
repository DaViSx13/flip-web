USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwAPIcheckToken]    Script Date: 20.06.2018 14:27:53 ******/
DROP PROCEDURE [dbo].[wwwAPIcheckToken]
GO

/****** Object:  StoredProcedure [dbo].[wwwAPIcheckToken]    Script Date: 20.06.2018 14:27:53 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[wwwAPIcheckToken]
@token varchar(32)
as
select u.agentID, u.aUser from wwwUser u where u.aToken = @token


GO
GRANT EXECUTE ON [dbo].[wwwAPIcheckToken] TO [pod] AS [dbo]
GO