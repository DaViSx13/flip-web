USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwNewEx]    Script Date: 01/17/2018 08:01:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER procedure [dbo].[wwwNewEx]
	@wb_no varchar(50), @raised datetime, @rptd datetime, @loc varchar(5), @exCode varchar(5), @content varchar(4000), @user varchar(50)=null
as
declare @errmsg varchar(50)
BEGIN TRY
BEGIN TRAN
set @content = LTRIM( RTRIM(@content) )
set @errmsg =
case 
when ISDATE(@raised)=0									then 'Неверно заполнено поле - Дата события!'
when ISDATE(@rptd)=0									then 'Неверно заполнено поле - Дата отчета о событии!'
when @content=''										then 'Не заполнено поле - Содержание происшествия!'
when not exists (select * from City where Code = @loc)	then 'Не правильно выбран город!'
end

if (len(@errmsg) > 0)	
	begin
	RAISERROR (@errmsg, -- Message text.
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

--- уведомление


declare @StrBody varchar(max), @StrSub varchar(max)
set @StrSub = 'Проблемная ситуация по накладной №' + @wb_no

select @StrBody = 'Накладная ' + m.Wb_No + ' от ' + convert(varchar(50), m.D_Acc, 103) + ' ' + kacc.C_CO + char(13)
+ 'ORG: ' + corg.FUll_Name +' DEST: ' + cdest.FUll_Name + ' ' + isnull(m.R_Adr, '') + char(13)
+ ISNULL(m.R_Co, '') + char(13)
+ 'РДД: ' + convert(varchar(50), m.DTD, 103) + char(13)+ char(13)
--m.Wb_No, m.D_Acc, m.DTD, m.ORG, corg.FUll_Name, m.DEST, cdest.FUll_Name,* 
from Main m
	left join City corg on corg.Code = m.ORG
	left join City cdest on cdest.Code = m.DEST
	left join Klient kacc on m.ACC = kacc.CACC
where Wb_No = @wb_no

select @StrBody = @StrBody + ' LOC                          КОД     ДАТА                    ОПИСАНИЕ' + CHAR(13)
select @StrBody = @StrBody + '================================================================' + CHAR(13)
select @StrBody = @StrBody 
+ ' ' + (select FUll_Name from City where Code = @loc) 
+ '   ' + LTRIM(str(@exCode))
+ '   ' + CONVERT(varchar(50), @raised, 103)
+ '    ' + (select ExDesc from EXCEP where ExCode = @exCode)
+ CHAR(13)
select @StrBody = @StrBody + @content

EXEC msdb.dbo.sp_send_dbmail
    @profile_name = 'forReporting',
    @recipients = 'pod@flippost.com',
    @blind_copy_recipients = 'DaViSx13@gmail.com',    
    @body = @strBody,
    @exclude_query_output = 1,
    @subject = @StrSub;
    
select @wb_no as wb_no

COMMIT TRAN
END TRY
BEGIN CATCH
	ROLLBACK TRAN
	DECLARE @ErrorMessage NVARCHAR(4000);	
	SELECT @ErrorMessage = 'Error in wwwNewEx: '+ ERROR_MESSAGE()
	RAISERROR (@ErrorMessage, -- Message text.
               16, -- Severity.
               1 -- State.
               );
END CATCH
