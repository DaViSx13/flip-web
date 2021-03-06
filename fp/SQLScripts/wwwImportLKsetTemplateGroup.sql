USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwImportLKsetTemplateGroup]    Script Date: 03/30/2021 14:33:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER procedure [dbo].[wwwImportLKsetTemplateGroup]
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
declare @cityCode int;
if @City like '%,%'
	select @cityCode = c.cityId from vCity c where  REPLACE(c.city + ',' + c.state, ' ', '') = REPLACE(@City, ' ', '')
else
	select @cityCode = c.cityId from vCity c where c.city = @City
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
declare @clientCode varchar(50) = (select ClientID from wwwLKUser where aUser = @clID)
declare @tmplID int = 0;
select @tmplID = wwwLKTemplate.tplID FROM wwwLKTemplate where clientID=@clientCode and TemplateName = @TmplName
begin
declare @resTable as table(ROrdNum int)
insert into @resTable exec wwwLKsetTemplate
			@TemplateName=@TmplName,
			@clientID=@clientCode,
			@tplid=@tmplID,
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
