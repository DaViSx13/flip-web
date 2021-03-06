USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwLKsetUser]    Script Date: 03/26/2020 23:55:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER procedure [dbo].[wwwLKsetUser]
@id int,
@auser varchar(50),
@pass varchar(50),
@cacc varchar(50)
as
declare @isKlient int
select @isKlient =COUNT(*) from Klient k where k.CACC = @cacc
if @isKlient = 0 
begin

RAISERROR ('Клиента с таким кодом нет!', -- Message text.
               16, -- Severity.
               1 -- State.
               );
               return;
end
BEGIN TRY
BEGIN TRAN
if @id != 0
	Update wwwLKUser 
	set aUser = @auser
		, aPassword = case when @pass = '' then aPassword else @pass end 
		, active = 1, ClientID = @cacc
	where userID = @id
else
	insert wwwLKUser (aUser, aPassword, active, ClientID) 
	values (@auser, @pass, 1, @cacc)

select @id as id

COMMIT TRAN
END TRY
BEGIN CATCH
	ROLLBACK TRAN
	DECLARE @ErrorMessage NVARCHAR(4000);	
	SELECT @ErrorMessage = 'Error in wwwLKsetUser: '+ ERROR_MESSAGE()
	RAISERROR (@ErrorMessage, -- Message text.
               16, -- Severity.
               1 -- State.
               );
END CATCH



