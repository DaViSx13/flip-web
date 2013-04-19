USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwDelAgTemplates]    Script Date: 04/19/2013 12:41:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[wwwDelAgTemplates]
@id int
AS
BEGIN TRY
BEGIN TRAN
delete
  FROM AgOrdersTemplate
  where id=@id
  select @id as id
 COMMIT TRAN
END TRY
BEGIN CATCH
	ROLLBACK TRAN
	RAISERROR ('Error in wwwDelAgTemplates', -- Message text.
               16, -- Severity.
               1 -- State.
               );
END CATCH
GO
GRANT EXECUTE ON [dbo].[wwwDelAgTemplates] TO [pod] AS [dbo]
GO
