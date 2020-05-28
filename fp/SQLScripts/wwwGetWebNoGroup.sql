USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwGetWebNoGroup]    Script Date: 05/06/2020 23:04:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		vd.zinovev
-- Create date: 01.05.2020
-- Description:	Получает список накладных 
-- =============================================
CREATE PROCEDURE [dbo].[wwwGetWebNoGroup](@orderNum int)
AS
BEGIN
	SELECT *
	FROM wwwWebNoGroup
	WHERE wwwWebNoGroup.order_num = @orderNum
END

GO

GRANT EXECUTE ON [dbo].[wwwGetWebNoGroup] TO [pod] AS [dbo]
GO
