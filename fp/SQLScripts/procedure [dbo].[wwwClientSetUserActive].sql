USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwSetActive]    Script Date: 11/07/16 12:50:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[wwwClientSetUserActive]
@id int,
@active int	
as
BEGIN TRY
BEGIN TRAN
if @active != 0
update wwwClientUser set active=0 where userID = @id
else
update wwwClientUser set active=1 where userID = @id

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

go

grant execute on [wwwClientSetUserActive] to [pod]
go
