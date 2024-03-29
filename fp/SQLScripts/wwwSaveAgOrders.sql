USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwSaveAgOrders]    Script Date: 11/11/2022 00:28:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER procedure [dbo].[wwwSaveAgOrders]
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
@webwb int = 0,
@amt float = 0,
@fMetpaym varchar(3) = 'inv',
@fPayr int = 3,
@cat int = null,
@isAPI tinyint = 0,
@subcategory varchar(15) = null
AS
BEGIN TRY
BEGIN TRAN

if @isAPI = 1 
	and (@Payr = 1008 or @Payr = 943 or @Payr = 1013 or @Payr = 810 or @Payr = 1012) 
	and (
			(select v.cityCode from vCity v where v.cityId = @ORG) in ('MOW', 'MOW00', 'MOW01', 'MOW02')
		and (select v.cityCode from vCity v where v.cityId = @DEST) in ('MOW', 'MOW00', 'MOW01', 'MOW02')   
		)
begin
	
	RAISERROR ('Данный заказ можно создать только в личном кабинете!', -- Message text.
               16, -- Severity.
               1 -- State.
               );
end 

	if @ContMail='' set @ContMail=null
	if @DContMail='' set @DContMail=null
	if @CourDate='' set @CourDate=null
	if @CourTimeF='' set @CourTimeF=null
	if @CourTimeT='' set @CourTimeT=null
	
	declare @PayFlag bit
	IF LOWER(@fMetpaym) = 'inv'
		set @PayFlag = 0
	ELSE
		set	@PayFlag = 1
--работа с заказом из личного кабинета КЛИЕНТА
	declare @CACC varchar(50), @Ord_No int, @S_City_Code varchar(5), @R_City_Code varchar(5)
	declare @wbno TABLE (id int, wb_no varchar(50))
	declare @fPACC varchar(50)



	
  if @Type > 1
	set @Type = 0
		  
	
		
if @clientID is not null and @clientID <> '' 
  begin 
  
	select 
      @CACC = CACC
    , @UserIn = aUser
    , @Payr = agentID
	from wwwClientUser where userID = @clientID
  

  
	select 
      @CName = k.C_CO
    , @Address = k.C_Adr
    , @ContName = k.C_Name
    , @ContPhone = k.C_Tel
    , @ContMail = k.Email
    , @ORG = k.C_CityID
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
	
	Update AgOrders 
	set 
		ORGCity=@ORG,
		ORG=@S_City_Code,
		CName=@CName,
		[Address]=@Address,
		ContName=@ContName,
		ContPhone=@ContPhone,
		ContMail=@ContMail,
		OrgRems=@OrgRems,
		DESTCity=@DEST,
		DEST=@R_City_Code,
		DName=@DName,
		DAdr=@DAdr,
		DContName=@DContName,
		DContPhone=@DContPhone,
		DContMail=@DContMail,
		DESTRems=@DESTRems,
		[Type]=@Type,
		Packs=@Packs,
		Wt=@Wt,
		VolWt=@VolWt,
		CourDate=@CourDate,
		CourTimeF=@CourTimeF,
		CourTimeT=@CourTimeT,
		Payr = @fPayr,
		PayType = @PayFlag,
		PCACC = @Payr,
		SortType = @cat,
		SubCategory = @subcategory
	where ROrdNum=@RordNum 

	select @Ord_No=@RordNum
	INSERT INTO @wbno select null, null
end
else
begin

	INSERT INTO AgOrders (
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
	Amt,
	AgentORG,
	PayType,
	SortType,
	SubCategory
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
	@fPayr,
	@Payr,
	0,
	4,
	@UserIn,
	0,
	@CACC,
	@amt,
	@Payr,
	@PayFlag,
	@cat,
    @subcategory  )
      
	declare @StrBody varchar(max), @StrSub varchar(max)
	select @StrSub='Принят новый заказ №'+convert(varchar,ROrdNum), 
	@StrBody='Город отправления: ' +(select s.RusName from N_City s where s.id=ORGCity)+
	char(13)+ 'Город получения: ' +(select s.RusName from N_City s where s.id=DESTCity)+
	char(13)+ 'Внесено агентом: ' + (select p.PartName from Partinf p where p.PartCode=PCACC)
		+ ' (' + (select p.PartLoc from Partinf p where p.PartCode=PCACC)+ ')'
	from AgOrders
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
	INSERT INTO @wbno select null, null
end


if @webwb = 1
begin

declare @outtab table  (id int, wb_no varchar(50))

INSERT INTO @outtab 
	exec wwwClientSetWb
			 @ID = null
			,@Wb_No = ''
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
			,@wbsource = 'webClient'
	select ROrdNum = @Ord_No, wbno = wb_no from @outtab
end else
	select ROrdNum = @Ord_No, wbno = null 


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

