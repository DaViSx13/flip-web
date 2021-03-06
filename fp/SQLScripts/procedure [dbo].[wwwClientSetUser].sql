USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwSetUsers]    Script Date: 11/07/16 13:25:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[wwwClientSetUser]
@id int,
@auser varchar(50),
@pass varchar(50),
@agentID int,
@cacc varchar(50)
as
BEGIN TRY
BEGIN TRAN
if @id != 0
	Update wwwClientUser 
	set aUser = @auser
		, aPassword = case when @pass = '' then aPassword else @pass end 
		, active = 1, agentID = @agentID, CACC = @cacc
	where userID = @id
else
	insert wwwClientUser (aUser, aPassword, active, agentID, CACC) 
	values (@auser, @pass, 1, @agentID, @cacc)

select @id as id

COMMIT TRAN
END TRY
BEGIN CATCH
	ROLLBACK TRAN
	DECLARE @ErrorMessage NVARCHAR(4000);	
	SELECT @ErrorMessage = 'Error in [wwwClientSetUser]: '+ ERROR_MESSAGE()
	RAISERROR (@ErrorMessage, -- Message text.
               16, -- Severity.
               1 -- State.
               );
END CATCH

go

grant execute on [dbo].[wwwClientSetUser] to [pod]
go