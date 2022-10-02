-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE wwwClientSetTemplatesGroup
@TmplName		varchar(500),
@clID			varchar(100),
@Name			varchar(60),
@City			varchar(100),
@Adr			varchar(200),
@ContName		varchar(50),
@ContPhone		varchar(50),
@ContMail		varchar(50)		= '',

@SenderName		varchar(50)		= '',
@SenderAdress	varchar(200)	= '',
@SenderCity		varchar(100)	= '',
@SenderContact	varchar(50)		= '',
@SenderPhone	varchar(50)		= '',
@SenderMail		varchar(50)		= '',

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
	select @result = 'Не найден город получения по запросу (' + @City + ')'
	return
end
if @cnt > 1
begin
	select @result = 'Найдено несколько городов получения по запросу (' + @City + ')'
	return
end

declare @citySenderCode int;
if @SenderCity like '%,%'
	select @citySenderCode = c.cityId from vCity c where  REPLACE(c.city + ',' + c.state, ' ', '') = REPLACE(@SenderCity, ' ', '')
else
	select @citySenderCode = c.cityId from vCity c where c.city = @SenderCity
set @cnt = @@rowcount
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

declare @clientCode varchar(50) = (select userID from dbo.wwwClientUser where aUser = @clID)
declare @tmplID int = 0;
select @tmplID = t.tplID FROM wwwClientTemplate t where t.clientID=@clientCode and t.TemplateName = @TmplName
begin
declare @resTable as table(ROrdNum int)
insert into @resTable exec wwwClientSetTemplate
			@TemplateName	=	@TmplName,
			@clientID		=	@clientCode,
			@tplid			=	@tmplID,
			
			@ORG			=	@citySenderCode,
			@CName			=	@SenderName,
			@Address		=	@SenderAdress,
			@ContName		=	@SenderContact,
			@ContPhone		=	@SenderPhone,
			@ContMail		=	@SenderMail,
			@OrgRems		=	'',
			
			@DEST			=	@cityCode,
			@DName			=	@Name,
			@DAdr			=	@Adr,
			@DContName		=	@ContName,
			@DContPhone		=	@ContPhone,
			@DContMail		=	@ContMail,
			@DESTRems		=	''
select @result = 1
end
GO
GRANT EXECUTE on wwwClientSetTemplatesGroup to pod