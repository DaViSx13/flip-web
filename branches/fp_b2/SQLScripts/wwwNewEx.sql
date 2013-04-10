USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwNewEx]    Script Date: 09/10/2012 21:17:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER procedure [dbo].[wwwNewEx]
	@wb_no varchar(50), @raised datetime, @rptd datetime, @loc varchar(5), @exCode varchar(5), @content varchar(4000), @user varchar(50)=null
as

set @content = LTRIM( RTRIM(@content) )
if (ISDATE(@raised)=0) 
	or (ISDATE(@rptd)=0) 
	or (@content='')
	or not exists (select * from City where Code = @loc)
	begin
	RAISERROR ('Неверный формат данных', -- Message text.
               16, -- Severity.
               1 -- State.
               );
  
	return
	end

set @content = '[' + @user + ': ' + CONVERT(varchar(50), getdate(), 104) + ' ' + left(CONVERT(varchar(50), GETDATE(), 114), 5) + '] ' + @content
declare @ofvers varchar(1000)
select @ofvers = ExDesc from EXCEP where ExCode = @exCode

insert ExLog (WbNo, Rptd, Raised, Loc, ExCode, user_in, Content, Ofvers, Wnd)
	values(@wb_no, @rptd, @raised, UPPER(@loc), @exCode, @user, @content, @ofvers, 0)

--print 'Operation completed successfully' --as msg

