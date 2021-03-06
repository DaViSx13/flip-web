USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwSetAgTemplates]    Script Date: 04/07/16 16:16:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[wwwClientSetTemplate]
@TemplateName varchar(500),
@clientID int,
@tplID int,
@DEST int,
@DName varchar(60),
@DAdr varchar(70),
@DContName varchar(50),
@DContPhone varchar(50),
@DContMail varchar(50),
@DESTRems varchar(1000)
AS
BEGIN TRY
BEGIN TRAN
if @DContMail='' set @DContMail=null

if @tplID >0
begin 
Update wwwClientTemplate
set DESTCity=@DEST, DEST=(select c.Code from N_City c where c.id=@DEST)
	, DName=@DName, DAdr=@DAdr, DContName=@DContName, DContPhone=@DContPhone, DContMail=@DContMail
	, DESTRems=@DESTRems, clientID=@clientID, TemplateName=@TemplateName  
where tplID=@tplID

select id=@tplID
end
else
begin
INSERT INTO wwwClientTemplate(
TemplateName,
clientID,
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
	SELECT @ErrorMessage = 'Error in wwwSetAgTemplates: '+ ERROR_MESSAGE()  
    RAISERROR (@ErrorMessage, -- Message text.
           16, -- Severity,
           1);
END CATCH
go

grant execute on [dbo].[wwwClientSetTemplate] to [pod]
go