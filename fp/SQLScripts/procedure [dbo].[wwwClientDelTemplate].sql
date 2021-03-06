USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwDelAgTemplates]    Script Date: 04/07/16 16:14:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[wwwClientDelTemplate]
@tplID int
AS
BEGIN TRY
BEGIN TRAN
delete
  FROM wwwClientTemplate
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
go
grant execute on [dbo].[wwwClientDelTemplate] to [pod]