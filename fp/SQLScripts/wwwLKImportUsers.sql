CREATE procedure [dbo].[wwwLKImportUsers]
    @auser varchar(50),
    @pass varchar(50),
    @cacc varchar(50),
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
select @id = (SELECT users.userID FROM wwwLKUser users where users.aUser = @auser);
IF @id IS NULL
    SELECT @id = 0;

/*-------------------------------------------------------------------------------------------------------------*/

/*------------------------Проверка клиента---------------------------------------------------------------------*/
declare @isKlient int
select @isKlient = COUNT(*)
from Klient k
where k.CACC = @cacc
    if @isKlient = 0
        begin

            SELECT @result = N'Клиента с таким кодом нет!'
            RETURN
        end

/*-------------------------------------------------------------------------------------------------------------*/

/*------------------------Обновления юзера---------------------------------------------------------------------*/
BEGIN TRY
    BEGIN TRAN
        if @id != 0
            Update wwwLKUser
            set aUser     = @auser
              , aPassword = case when @pass = '' then aPassword else @pass end
              , active    = 1
              , ClientID  = @cacc
            where userID = @id
        else
            insert wwwLKUser (aUser, aPassword, active, ClientID)
            values (@auser, @pass, 1, @cacc)

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
grant execute on dbo.wwwLKImportUsers to pod
go
/*-------------------------------------------------------------------------------------------------------------*/
