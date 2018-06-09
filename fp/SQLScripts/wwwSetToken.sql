USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwCheckToken]    Script Date: 06/05/2018 14:38:44 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwCheckToken]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwCheckToken]
GO

USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwCheckToken]    Script Date: 06/05/2018 14:38:44 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[wwwCheckToken]
@token varchar(32)
as
select u.agentID, u.aUser from wwwUser u where u.aToken = @token

GO
GRANT EXECUTE ON [dbo].[wwwCheckToken] TO [pod] AS [dbo]
GO


