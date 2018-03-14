USE [ALERT_F]
GO

/****** Object:  Trigger [tr_ins_wwwClientWB]    Script Date: 03/14/2018 13:03:06 ******/
IF  EXISTS (SELECT * FROM sys.triggers WHERE object_id = OBJECT_ID(N'[dbo].[tr_ins_wwwClientWB]'))
DROP TRIGGER [dbo].[tr_ins_wwwClientWB]
GO

USE [ALERT_F]
GO

/****** Object:  Trigger [dbo].[tr_ins_wwwClientWB]    Script Date: 03/14/2018 13:03:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE TRIGGER [dbo].[tr_ins_wwwClientWB]
   ON  [dbo].[wwwClientWB] 
   FOR INSERT
AS 
BEGIN
	SET NOCOUNT ON;
   
    declare @str varchar(10), @id int    
	select @id = ID from inserted 
	if @id > 1
	Begin
	select @str = MAX(REPLACE ( w.Wb_No , '-' , '' ))+1 from dbo.wwwClientWB w
	select @str = LEFT ( @str , 2 ) +'-'+ SUBSTRING ( @str, 3, 3) +'-'+ RIGHT ( @str, 3)
	end
	else
	select @str = '77-000-001'
	Update wwwClientWB set Wb_No = @str where ID = @id

END

GO


