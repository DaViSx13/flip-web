USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwAPIcheckCity]    Script Date: 20.06.2018 14:29:24 ******/
DROP PROCEDURE [dbo].[wwwAPIcheckCity]
GO

/****** Object:  StoredProcedure [dbo].[wwwAPIcheckCity]    Script Date: 20.06.2018 14:29:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[wwwAPIcheckCity] 
	@ID int
AS
BEGIN
   select isCity = count(*) from N_City c where c.id=@ID
END

GO
GRANT EXECUTE ON [dbo].[wwwAPIcheckCity] TO [pod] AS [dbo]
GO