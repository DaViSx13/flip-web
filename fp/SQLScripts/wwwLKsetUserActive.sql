USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwLKsetUserActive]    Script Date: 03/26/2020 23:55:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwLKsetUserActive]
@id int,
@active int	
as
BEGIN TRY
BEGIN TRAN
if @active != 0
update wwwLKUser set active=0 where userID = @id
else
update wwwLKUser set active=1 where userID = @id

select @id as id
COMMIT TRAN
END TRY
BEGIN CATCH
	ROLLBACK TRAN
	DECLARE @ErrorMessage NVARCHAR(4000);	
	SELECT @ErrorMessage = 'Error in [wwwClientSetUserActive]: '+ ERROR_MESSAGE()
	RAISERROR (@ErrorMessage, -- Message text.
               16, -- Severity.
               1 -- State.
               );
END CATCH


