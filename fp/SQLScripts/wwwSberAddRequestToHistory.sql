CREATE PROCEDURE wwwSberAddRequestToHistory
    @content    varchar(max)
AS
    DECLARE @date datetime = GETDATE();
    INSERT INTO wwwSberRequestHistory(
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