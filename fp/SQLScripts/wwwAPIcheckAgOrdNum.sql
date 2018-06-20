USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwAPIcheckAgOrdNum]    Script Date: 20.06.2018 14:29:55 ******/
DROP PROCEDURE [dbo].[wwwAPIcheckAgOrdNum]
GO

/****** Object:  StoredProcedure [dbo].[wwwAPIcheckAgOrdNum]    Script Date: 20.06.2018 14:29:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[wwwAPIcheckAgOrdNum] 
	@ID int
AS
BEGIN
   select isOrder = count(*) from AgOrders c where c.ROrdNum = @ID
END

GO
GRANT EXECUTE ON [dbo].[wwwAPIcheckAgOrdNum] TO [pod] AS [dbo]
GO