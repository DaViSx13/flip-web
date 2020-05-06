USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwChangeWebNumGroupStatus]    Script Date: 05/06/2020 23:06:16 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[wwwChangeWebNumGroupStatus](@webNum varchar(50),
											@isDeleted int)
AS
BEGIN
	DECLARE @foundingRow TABLE(isDeleted int);
	DECLARE @count int;
	DECLARE @isDel int;
	DECLARE @message varchar(MAX);
	INSERT INTO @foundingRow
							SELECT isDeleted
							FROM wwwWebNoGroup
							WHERE web_num = @webNum;
	SET @count = (SELECT COUNT(1) FROM @foundingRow);
	IF(@count = 0)
	BEGIN
		SET @message = 'Не найдена накладная с номером "'
						+ @webNum
						+ '"';
		RAISERROR(@message, 1, 28);
	END
	SET @isDel = (SELECT TOP(1) isDeleted
				  FROM @foundingRow);
	IF(@isDel > 0)
	BEGIN
		UPDATE wwwWebNoGroup
		SET isDeleted = 0
		WHERE wwwWebNoGroup.web_num = @webNum;
	END
	ELSE
	BEGIN
		UPDATE wwwWebNoGroup
		SET isDeleted = 1
		WHERE wwwWebNoGroup.web_num = @webNum;
	END	
END							

GO

GRANT EXECUTE ON [dbo].[wwwChangeWebNumGroupStatus] TO [pod] AS [dbo]
GO
