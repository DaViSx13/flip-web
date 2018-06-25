USE [ALERT_F]
GO

/****** Object:  Trigger [tr_ins_wwwLKWB]    Script Date: 06/25/2018 12:31:34 ******/
IF  EXISTS (SELECT * FROM sys.triggers WHERE object_id = OBJECT_ID(N'[dbo].[tr_ins_wwwLKWB]'))
DROP TRIGGER [dbo].[tr_ins_wwwLKWB]
GO

USE [ALERT_F]
GO

/****** Object:  Trigger [dbo].[tr_ins_wwwLKWB]    Script Date: 06/25/2018 12:31:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE TRIGGER [dbo].[tr_ins_wwwLKWB]
   ON  [dbo].[wwwLKWB] 
   FOR INSERT
AS 
BEGIN
	SET NOCOUNT ON;
   
    declare @str varchar(10), @id int    
	select @id = ID from inserted 
	if @id > 1
	Begin
	select @str = MAX(REPLACE ( w.Wb_No , '-' , '' ))+1 from dbo.wwwLKWB w
	select @str = LEFT ( @str , 2 ) +'-'+ SUBSTRING ( @str, 3, 3) +'-'+ RIGHT ( @str, 3)
	end
	else
	select @str = '77-000-001'
	Update wwwLKWB set Wb_No = @str where ID = @id

END


GO


