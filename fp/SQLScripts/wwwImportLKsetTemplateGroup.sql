USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwImportLKsetTemplateGroup]    Script Date: 01/18/2021 22:29:16 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[wwwImportLKsetTemplateGroup]
@TmplName varchar(500),
@clID varchar(100),
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
declare @cnt int = @@rowcount
if @cnt = 0
begin 
	select @result = 'Не найден город отправления по запросу (' + @City + ')'
	return
end
if @cnt > 1
begin
	select @result = 'Найдено несколько городов отправления по запросу (' + @City + ')'
	return
end
declare @cityCode int = (select Code from @table);
declare @clientCode int = (select ClientID from wwwLKUser where aUser = @clID)
set @cnt = (select count(1) FROM wwwLKTemplate where clientID=convert(varchar(50), @clientCode) and TemplateName = @TmplName)
if @cnt > 0 
begin
	select @result = 'Шаблон с уканым именем (' + @TmplName + ') уже существует '
	return
end
begin
declare @resTable as table(ROrdNum int)
insert into @resTable exec wwwLKsetTemplate
			@TemplateName=@TmplName,
			@clientID=@clientCode,
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
select @result = 1	
end
GO					
grant execute on [wwwImportLKsetTemplateGroup] to pod
GO


