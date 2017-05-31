/* To prevent any potential data loss issues, you should review this script in detail before running it outside the context of the database designer.*/
BEGIN TRANSACTION
SET QUOTED_IDENTIFIER ON
SET ARITHABORT ON
SET NUMERIC_ROUNDABORT OFF
SET CONCAT_NULL_YIELDS_NULL ON
SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
CREATE TABLE dbo.wwwProcUseLog
	(
	puID int NOT NULL IDENTITY (1, 1),
	procName varchar(100) NOT NULL,
	aTime datetime NOT NULL,
	aUser varchar(100) NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.wwwProcUseLog ADD CONSTRAINT
	DF_wwwProcUseLog_aTime DEFAULT getDate() FOR aTime
GO
CREATE NONCLUSTERED INDEX IX_wwwProcUseLog ON dbo.wwwProcUseLog
	(
	procName, aTime
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE dbo.wwwProcUseLog SET (LOCK_ESCALATION = TABLE)
GO
COMMIT