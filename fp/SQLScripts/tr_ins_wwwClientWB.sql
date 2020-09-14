USE [ALERT_F]
GO
/****** Object:  Trigger [dbo].[tr_ins_wwwClientWB]    Script Date: 14/09/2020 21:24:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER TRIGGER [dbo].[tr_ins_wwwClientWB]
   ON  [dbo].[wwwClientWB] 
   FOR INSERT
AS 
BEGIN
	SET NOCOUNT ON;
   
  declare @str varchar(10), @id int, @wbsource varchar(50)
	select @id = ID, @wbsource = wbsource from inserted 

    if @wbsource like 'web%'
  	if @id > 1
	  Begin
	    select @str = MAX(REPLACE ( w.Wb_No , '-' , '' ))+1 from dbo.wwwClientWB w where w.wbsource = @wbsource
	    select @str = LEFT ( @str , 2 ) +'-'+ SUBSTRING ( @str, 3, 3) +'-'+ RIGHT ( @str, 3)
	  end
	  else
  	  select @str = '77-000-001'

    if @wbsource = 'dic_agent'
	  Begin
	    select @str = isnull(MAX( REPLACE ( w.Wb_No , 'A-' , '' ) ), 0) + 1 from dbo.wwwClientWB w where w.wbsource = @wbsource
	    select @str = REPLICATE('0', 7 - LEN(@str)) + @str
	    select @str = 'A-'+ @str
	  end
	
  Update wwwClientWB set Wb_No = @str where ID = @id

END

