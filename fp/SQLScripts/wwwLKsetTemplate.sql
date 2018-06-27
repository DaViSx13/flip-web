USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwLKsetTemplate]    Script Date: 06/27/2018 13:36:51 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwLKsetTemplate]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwLKsetTemplate]
GO

USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwLKsetTemplate]    Script Date: 06/27/2018 13:36:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[wwwLKsetTemplate]
@TemplateName varchar(500),
@clientID int,
@tplid int,
@ORG int, 
@CName varchar(60),
@Address varchar(200),
@ContName varchar(50),
@ContPhone varchar(50),
@ContMail varchar(50),
@OrgRems varchar(1000),
@DEST int,
@DName varchar(60),
@DAdr varchar(200),
@DContName varchar(50),
@DContPhone varchar(50),
@DContMail varchar(50),
@DESTRems varchar(1000)
AS
BEGIN TRY
BEGIN TRAN
if @ContMail='' set @ContMail=null
if @DContMail='' set @DContMail=null

if @tplid >0
begin 
Update wwwLKTemplate 
set ORGCity=@ORG, ORG=(select c.Code from N_City c where c.id=@ORG), CName=@CName, [Address]=@Address, ContName=@ContName,
ContPhone=@ContPhone, ContMail=@ContMail, OrgRems=@OrgRems, DESTCity=@DEST, DEST=(select c.Code from N_City c where c.id=@DEST),
DName=@DName, DAdr=@DAdr, DContName=@DContName, DContPhone=@DContPhone, DContMail=@DContMail, DESTRems=@DESTRems, clientID=@clientID, TemplateName=@TemplateName  
where tplid=@tplid

select tplid=@tplid
end
else
begin
INSERT INTO wwwLKTemplate (
TemplateName,
clientID,
ORGCity,
ORG, 
CName,
[Address],
ContName,
ContPhone,
ContMail,
OrgRems,
DESTCity,
DEST,
DName,
DAdr,
DContName,
DContPhone,
DContMail,
DESTRems

 )VALUES (
@TemplateName, 
@clientID,
@ORG, 
(select c.Code from N_City c where c.id=@ORG),
@CName,
@Address,
@ContName,
@ContPhone,
@ContMail,
@OrgRems,
@DEST,
(select c.Code from N_City c where c.id=@DEST),
@DName,
@DAdr,
@DContName,
@DContPhone,
@DContMail,
@DESTRems
       )


select ROrdNum=SCOPE_IDENTITY()
end

COMMIT TRAN
END TRY
BEGIN CATCH
	ROLLBACK TRAN
	DECLARE @ErrorMessage NVARCHAR(4000);	
	SELECT @ErrorMessage = 'Error in wwwClientSetTemplate: '+ ERROR_MESSAGE()  
    RAISERROR (@ErrorMessage, -- Message text.
           16, -- Severity,
           1);
END CATCH

GO

grant execute on [wwwLKsetTemplate] to [pod]
go
