USE [ALERT_F]
GO

/****** Object:  UserDefinedFunction [dbo].[split]    Script Date: 09/19/2020 23:57:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[split]
(
        @string nvarchar(4000),
        @delimiter char(1)
)
RETURNS
@splitted TABLE
(
        Value nvarchar(4000)
)
AS
BEGIN
        DECLARE @a SMALLINT
        DECLARE @b SMALLINT
        SET @a = charindex(@delimiter, @string)
        INSERT @splitted VALUES (substring(@string, 1, @a-1))
        WHILE @a <> 0
        BEGIN
                SET @b = charindex(@delimiter, @string, @a+1)
                IF @b <> 0
                        INSERT @splitted VALUES (substring(@string, @a+1, @b-@a-1))
                ELSE
                        INSERT @splitted VALUES (substring(@string, @a+1, len(@string)-@a))
                SET @a = @b
        END
        RETURN
END
GO


