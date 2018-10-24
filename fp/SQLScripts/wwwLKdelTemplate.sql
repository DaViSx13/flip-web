USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwLKdelTemplate]    Script Date: 06/27/2018 13:40:24 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwLKdelTemplate]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwLKdelTemplate]
GO

USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwLKdelTemplate]    Script Date: 06/27/2018 13:40:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[wwwLKdelTemplate]
@tplID int
AS
BEGIN TRY
BEGIN TRAN
delete
  FROM wwwLKTemplate
  where tplID=@tplID
  select @tplID as id
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

GO

grant execute on [wwwLKdelTemplate] to [pod]
go

