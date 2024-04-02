CREATE PROCEDURE wwwSberAddRequestToHistory
    @content    varchar(8000)
AS
    DECLARE @date datetime = GETDATE();
    INSERT INTO SberRequestHistory(
        date_in,
        content
    )
    VALUES (
        @date,
        @content
    )

    SELECT SCOPE_IDENTITY() as id
GO

GRANT EXECUTE ON wwwSberAddRequestToHistory TO pod