CREATE procedure [dbo].[wwwClientImportUsers]
    @auser varchar(50),
    @pass varchar(50),
    @cacc varchar(50),
    @agentID int,
    @result varchar(400) OUTPUT
as

/*------------------------Завершающий вызов процедуры с пустыми параметрами------------------------------------*/
    IF @result = 'last'
        RETURN
/*-------------------------------------------------------------------------------------------------------------*/

/*------------------------Проверки-----------------------------------------------------------------------------*/

DECLARE @len INT;
SELECT @len = LEN(@auser);
    IF @len = 0
        BEGIN
            SELECT @result = 'Поле "Пользователь" должно быть заполнено'
            RETURN
        END

SELECT @len = LEN(@pass);
    IF @len = 0
        BEGIN
            SELECT @result = 'Поле "Пароль" должно быть заполнено'
            RETURN
        END
/*-------------------------------------------------------------------------------------------------------------*/

/*------------------------Проверка наличия пользователя--------------------------------------------------------*/

declare @id int;
select @id = (SELECT users.userID FROM  wwwClientUser users where users.aUser = @auser);
IF @id IS NULL
    SELECT @id = 0;

/*-------------------------------------------------------------------------------------------------------------*/

/*------------------------Обновления юзера---------------------------------------------------------------------*/
BEGIN TRY
    BEGIN TRAN
        if @id != 0
            Update wwwClientUser
            set aUser     = @auser
              , aPassword = case when @pass = '' then aPassword else @pass end
              , active    = 1
              , CACC  = @cacc
              , agentID   = @agentID
            where userID = @id
        else
            insert wwwClientUser (aUser, aPassword, active, agentID, CACC)
            values (@auser, @pass, 1, @agentID, @cacc)

        select @result = 1
    COMMIT TRAN
END TRY
BEGIN CATCH
    ROLLBACK TRAN
    SELECT @result = ERROR_MESSAGE()
END CATCH
/*-------------------------------------------------------------------------------------------------------------*/

go

/*------------------------Обновления прав----------------------------------------------------------------------*/
grant execute on dbo.wwwClientImportUsers to pod
go
/*-------------------------------------------------------------------------------------------------------------*/
