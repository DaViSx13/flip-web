USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwLKdelTemplate]    Script Date: 03/26/2020 23:50:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwLKdelTemplate]
@tplID int
AS
BEGIN TRY
BEGIN TRAN
delete
  FROM wwwLKTemplate
  where tplID=@tplID
  select @tplID as id
 COMMIT TRAN
END TRY
BEGIN CATCH
	ROLLBACK TRAN
	DECLARE @ErrorMessage NVARCHAR(4000);	
	SELECT @ErrorMessage = 'Error in wwwDelAgTemplates: '+ ERROR_MESSAGE() 
	RAISERROR (@ErrorMessage, -- Message text.
               16, -- Severity.
               1 -- State.
               );
END CATCH

