USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwSetAgTemplates]    Script Date: 04/23/2013 14:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[wwwSetAgTemplates]
@TemplateName varchar(500),
@agentID int,
@id int,
@ORG int, 
@CName varchar(60),
@Address varchar(70),
@ContName varchar(50),
@ContPhone varchar(50),
@ContMail varchar(50),
@OrgRems varchar(1000),
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
if @ContMail='' set @ContMail=null
if @DContMail='' set @DContMail=null

if @id >0
begin 
Update AgOrdersTemplate 
set ORGCity=@ORG, ORG=(select c.Code from N_City c where c.id=@ORG), CName=@CName, [Address]=@Address, ContName=@ContName,
ContPhone=@ContPhone, ContMail=@ContMail, OrgRems=@OrgRems, DESTCity=@DEST, DEST=(select c.Code from N_City c where c.id=@DEST),
DName=@DName, DAdr=@DAdr, DContName=@DContName, DContPhone=@DContPhone, DContMail=@DContMail, DESTRems=@DESTRems, agentID=@agentID, TemplateName=@TemplateName  
where id=@id

select id=@id
end
else
begin
INSERT INTO AgOrdersTemplate (
TemplateName,
agentID,
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
@agentID,
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
	SELECT @ErrorMessage = 'Error in wwwSetAgTemplates: '+ ERROR_MESSAGE()  
    RAISERROR (@ErrorMessage, -- Message text.
           16, -- Severity,
           1);
END CATCH
GO
GRANT EXECUTE ON [dbo].[wwwSetAgTemplates] TO [pod] AS [dbo]
GO