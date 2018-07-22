USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwLKsetOrder]    Script Date: 06/27/2018 09:45:15 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwLKsetOrder]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwLKsetOrder]
GO

USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwLKsetOrder]    Script Date: 06/27/2018 09:45:15 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE procedure [dbo].[wwwLKsetOrder]
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
@DESTRems varchar(1000),
@Type smallint,
@Packs int,
@Wt decimal(18,2),
@VolWt decimal(18,2),
@Payr int,
@UserIn varchar (50),
@RordNum int,
@CourDate datetime,
@CourTimeF time,
@CourTimeT time,
@clientID int = null,
@webwb int = 0
AS
BEGIN TRY
BEGIN TRAN
if @ContMail='' set @ContMail=null
if @DContMail='' set @DContMail=null
if @CourDate='' set @CourDate=null
if @CourTimeF='' set @CourTimeF=null
if @CourTimeT='' set @CourTimeT=null

--работа с заказом из личного кабинета КЛИЕНТА
declare @CACC varchar(50), @Ord_No int, @S_City_Code varchar(5), @R_City_Code varchar(5)
if @clientID is not null and @clientID <> '' 
  begin
  select 
      @CACC = clientID
    , @UserIn = aUser
    --, @Payr = agentID
  from wwwLKUser where userID = @clientID
  
  select 
      @CName = k.C_CO
    , @Address = k.C_Adr
    , @ContName = k.C_Name
    , @ContPhone = k.C_Tel
    , @ContMail = k.Email
    --, @ORG = k.C_CityID
  from Klient k
  where k.CACC = @CACC
  end

select @S_City_Code = c.Code from N_City c where c.id=@ORG
select @R_City_Code = c.Code from N_City c where c.id=@DEST
if @RordNum >0
begin 

if exists(select 1 from AgOrders where ROrdNum = @RordNum and Status > 0) 
	  RAISERROR ('Заказ в работе. Редактирование запрещено.', -- Message text.
               16, -- Severity.
               1 -- State.
               );

Update RegOrders 
set ORGCity=@ORG, ORG=@S_City_Code, CName=@CName, [Address]=@Address, ContName=@ContName,
ContPhone=@ContPhone, ContMail=@ContMail, OrgRems=@OrgRems, DESTCity=@DEST, DEST=@R_City_Code,
DName=@DName, DAdr=@DAdr, DContName=@DContName, DContPhone=@DContPhone, DContMail=@DContMail, DESTRems=@DESTRems, [Type]=@Type,
Packs=@Packs, Wt=@Wt, VolWt=@VolWt, CourDate=@CourDate, CourTimeF=@CourTimeF, CourTimeT=@CourTimeT  
where ROrdNum=@RordNum 

select ROrdNum=@RordNum
end
else
begin
INSERT INTO RegOrders (
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
DESTRems,
[Type],
Packs,
Wt,
VolWt,
CourDate,
CourTimeF,
CourTimeT,
Payr,
PCACC,
[Status],
FrmID,
UserIn,
CurId,
CACC,
ContentDescr

 )VALUES (
@ORG, 
@S_City_Code,
@CName,
@Address,
@ContName,
@ContPhone,
@ContMail,
@OrgRems,
@DEST,
@R_City_Code,
@DName,
@DAdr,
@DContName,
@DContPhone,
@DContMail,
@DESTRems,
@Type,
@Packs,
@Wt,
@VolWt,
@CourDate,
@CourTimeF,
@CourTimeT,
1,
@Payr,
0,
4,
@UserIn,
0,
@CACC,
''
       )
      
declare @StrBody varchar(max), @StrSub varchar(max)
select @StrSub='Принят новый заказ №'+convert(varchar,ROrdNum), 
@StrBody='Город отправления: ' +(select s.RusName from N_City s where s.id=ORGCity)+
char(13)+ 'Город получения: ' +(select s.RusName from N_City s where s.id=DESTCity)+
char(13)+ 'Внесено агентом: ' + (select p.PartName from Partinf p where p.PartCode=PCACC)
		+ ' (' + (select p.PartLoc from Partinf p where p.PartCode=PCACC)+ ')'

from RegOrders
where ROrdNum=SCOPE_IDENTITY()
/*
EXEC msdb.dbo.sp_send_dbmail
    @profile_name = 'forReporting',
    @recipients = 'lovite@flippost.com',
    @blind_copy_recipients = 'DaViSx13@gmail.com',    
    @body = @strBody,
    @exclude_query_output = 1,
    @subject = @StrSub;
*/
select @Ord_No=SCOPE_IDENTITY()

if @webwb = 1
begin
exec wwwClientSetWb
			 @ID = null
			,@Wb_No = null
			,@Ord_No = @Ord_No		
			,@S_City_ID = @ORG
			,@S_Name = @ContName
			,@S_Tel = @ContPhone
			,@S_Co = @CName
			,@S_Adr = @Address
			,@S_Ref = @OrgRems
			,@S_Mail = @ContMail			
			,@R_City_ID = @DEST
			,@R_Name = @DContName
			,@R_Tel = @DContPhone
			,@R_Co = @DName
			,@R_Adr = @DAdr
			,@R_Ref = @DESTRems
			,@R_Mail = @DContMail
			,@User_IN = @UserIn			
			,@WT = @Wt
			,@VOL_WT = @VolWt
			,@PCS = @Packs
			,@T_PAC = @Type
end
select @Ord_No
end

COMMIT TRAN
END TRY
BEGIN CATCH
	ROLLBACK TRAN 
	DECLARE @ErrorMessage NVARCHAR(4000);	
	SELECT @ErrorMessage = 'Error in wwwSaveAgOrders: '+ ERROR_MESSAGE()  
    RAISERROR (@ErrorMessage, -- Message text.
           16, -- Severity,
           1);
            
END CATCH


GO

grant execute on [wwwLKsetOrder] to [pod]
go


