-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		vd.zinovev
-- Create date: 17.07.2020
-- Description:	Процедура для получения города
--				после запроса из КЛАДР
-- =============================================
CREATE PROCEDURE wwwGetCityByKLADR
	@city varchar(100),
	@region varchar(100) = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	declare @queryCount int;
	SELECT @queryCount = COUNT(1) FROM vCity WHERE city = @city;
	IF @queryCount > 1 AND @region IS NOT NULL
	BEGIN
		SELECT Code=cityId,
			   cityCode,
			   city
				 + ', '
				 + country
				 + CASE WHEN [state] IS NULL THEN '' ELSE ', '
				 + [state] END AS fname
		FROM vCity
		WHERE
			cityActive = 1
			AND city = @city
			AND [state] = @region
		ORDER BY city
		RETURN
	END
	
	BEGIN
		SELECT Code=cityId,
			   cityCode,
			   city
				 + ', '
				 + country
				 + CASE WHEN [state] IS NULL THEN '' ELSE ', '
				 + [state] END AS fname
		FROM vCity
		WHERE
			cityActive = 1
			AND city = @city
		ORDER BY city	
	END	
END
GO

GRANT EXECUTE ON wwwGetCityByKLADR TO pod
