SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE wwwLogProcUse 
	@procName varchar(100),
	@aUser varchar(100) = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

  insert wwwProcUseLog(procName, aUser)
  values(@procName, @aUser)

  delete wwwProcUseLog where aTime < DATEADD(MONTH, -2, getDate())
END
GO
