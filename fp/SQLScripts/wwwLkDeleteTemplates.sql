-- Кабинет Москвы. Удаление шаблонов. Множественное
CREATE procedure [dbo].[wwwLkDeleteTemplates]
@tplID varchar(max)
AS
BEGIN TRY
    BEGIN TRAN
        delete
        FROM wwwLKTemplate
        where tplID in (select [Value] from split(@tplID, ','))
        select @tplID as ids
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

grant execute on dbo.wwwLkDeleteTemplates to pod
go

