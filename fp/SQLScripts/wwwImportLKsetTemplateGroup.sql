USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwLKsetTemplate]    Script Date: 01/17/2021 15:21:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
alter procedure [dbo].[wwwImportLKsetTemplateGroup]
@TmplName varchar(500),
@clID varchar(10),
@Name varchar(60),
@City varchar(100),
@Adr varchar(200),
@ContName varchar(50),
@ContPhone varchar(50),
@ContMail varchar(50) = '',
@result varchar(400) OUTPUT
AS
IF @result = 'last'
RETURN

declare @table as table(
	Code int,
	cityCode varchar(50),
	fname varchar(500)
);
insert into @table exec wwwGetCity @pName = @City
if @@rowcount = 0
begin 
	select @result = 'Не найден город отправления по запросу ' + @City
	return
end
if @@ROWCOUNT > 1
begin
	select @result = 'Найдено несколько кородов отправления по запросу ' + @City
	return
end
declare @cityCode int = (select Code from @table);
exec wwwLKsetTemplate
			@TemplateName=@TmplName,
			@clientID=@clID,
			@tplid=0,
			@ORG=0,
			@CName='',
			@Address='',
			@ContName='',
			@ContPhone='',
			@ContMail='',
			@OrgRems='',
			@DEST= @cityCode,
			@DName=@Name,
			@DAdr=@Adr,
			@DContName=@ContName,
			@DContPhone=@ContPhone,
			@DContMail=@ContMail,
			@DESTRems=''
						
grant execute on [wwwImportLKsetTemplateGroup] to pod