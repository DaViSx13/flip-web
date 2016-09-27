USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwImportPOD]    Script Date: 09/11/2015 10:30:48 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwImportPOD]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwImportPOD]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwSetPOD_import]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwSetPOD_import]
GO
USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwImportPOD]    Script Date: 09/11/2015 10:30:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/*
Используется для импорта накладных из Excel файла.
@result:
если len() = 1 то все хорошо.
если != 1 то возвращаем сообщение об ошибке.
*/
CREATE PROCEDURE [dbo].[wwwImportPOD]
	@wb_no varchar(50), @p_d_in datetime, @tdd datetime, @rcpn varchar(15), @auser varchar(50)=null, @result varchar(400) OUTPUT
as
declare @exist int
,@goodDate int=0
,@wbIn int
/*------------------------Завершающий вызов процедуры с пустыми параметрами------------------------------------*/
IF @result = 'last'
RETURN
/*-------------------------------------------------------------------------------------------------------------*/
select @exist = COUNT(*) 
from Main where Wb_No = ltrim(rtrim(@wb_no))
if @exist = 0
begin
select @result = 'Накладная с таким номером не существует.'
return
end

select @goodDate = case when (DATEDIFF (hour,D_Acc,@p_d_in)<1)then 0 else 1 end
from Main where Wb_No = ltrim(rtrim(@wb_no))
if @goodDate = 0
begin
select @result = 'Не верная дата накладной.'
return
end
if @p_d_in > GETDATE()
BEGIN
select @result = 'Дата '+convert(varchar(15), @p_d_in, 104)+' больше текущей '+convert(varchar(15), GETDATE(), 104)
return
END
select @wbIn = dbo.fn_CountMnfBdyForUserById(ltrim(rtrim(@wb_no)),@auser)
if @wbIn = 0
begin
select @result = 'Накладная не является для вас входящей.'
return
end

update Main
set DOD = @p_d_in,
	P_D_IN = CONVERT(varchar(20), GETDATE(), 112),
	P_D_IN_HOW=1,
	TDD = @tdd,
	User_TDD = ISNULL(@auser, User_TDD),
	RCPN = @rcpn
where Wb_No = ltrim(rtrim(@wb_no))
INSERT INTO #import
(
wb_no,
p_d_in,
tdd,
rcpn,
auser,
result
)
values
(
@wb_no,
@p_d_in,
@tdd,
@rcpn,
@auser,
1
)
select @result = 1

GO
GRANT EXECUTE ON [dbo].[wwwImportPOD] TO [pod] AS [dbo]
GO

GRANT UPDATE ON [dbo].Main TO [pod] AS [dbo]
GO
