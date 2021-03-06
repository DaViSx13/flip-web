USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwLKgetClientslist]    Script Date: 07/13/2018 12:46:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[wwwLKgetClientslist]
as
select k.CACC as partcode, k.Loc as partloc, k.C_Name as partname, displayname = k.C_Name +' ('+k.Loc+')'  from Klient k
where k.C_Name is not null and k.C_Name != '' and LEN(k.C_Name)>5
and k.Loc = 'MOW'
order by k.C_Name
GO
/****** Object:  StoredProcedure [dbo].[wwwLKgetClients]    Script Date: 07/13/2018 12:46:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[wwwLKgetClients]
as
select k.CACC as partcode, k.Loc as partloc, k.C_Name as partname from Klient k
--where DateShtdn is null
order by k.C_Name
GO
/****** Object:  Table [dbo].[wwwLKUser]    Script Date: 07/13/2018 12:46:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[wwwLKUser](
	[userID] [int] IDENTITY(1,1) NOT NULL,
	[aUser] [varchar](50) NOT NULL,
	[aPassword] [varchar](50) NOT NULL,
	[ClientID] [varchar](50) NOT NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_wwwLKUser] PRIMARY KEY CLUSTERED 
(
	[userID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  StoredProcedure [dbo].[wwwLKgetWbs]    Script Date: 07/13/2018 12:46:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Procedure [dbo].[wwwLKgetWbs]
	@period varchar(10), @clientID int, @dir varchar(3) = 'all'
AS

--if ISNULL(ltrim(rtrim(@period)), '') = '' or @agentID is null return

if @clientID is null return
if ISNULL(ltrim(rtrim(@period)), '') = '' set @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'

declare @bDate date, @eDate date, @CACC varchar(50)

select @CACC = CACC from wwwLKUser where userID = @clientID -- 54
set @bDate = @period --'20100201'
set @eDate = dateadd(d, -1, DATEADD(m,1,@bDate))

--select @bDate, @eDate


select distinct m.wb_no
, d_acc_txt=CONVERT(varchar(20), d_acc,104), d_acc
, dod_txt=CONVERT(varchar(20), dod,104) + ' ' + CONVERT(varchar(5), tdd, 108)
, dod = CONVERT(datetime, CONVERT(varchar(20), dod,104) + ' ' + CONVERT(varchar(5), tdd, 108), 104)
, rcpn
--, tdd_txt = CONVERT(varchar(5), tdd, 108)
,p_d_in
, p_d_in_txt=CONVERT(varchar(20), p_d_in,104)--, p_d_in
, dtd_txt=CONVERT(varchar(20), m.dtd,104), m.dtd
, m.org, m.dest, m.s_co, m.r_co, m.wt, m.vol_wt, t_srv
--, dir = case when mh.DestTrk='mow' then 'in' else 'out' end

, is_ex = (select COUNT(1) from ExLog ex where ex.WbNo = m.Wb_No and ISNULL(ex.WND, 0) = 0 and (ex.ExCode <> 61 and ex.ExCode <> 62))

from Main m with(nolock) 
	
where m.D_Acc between @bDate and @eDate 
	and @CACC in (m.SCode, m.Rcode, m.ACC)	
order by m.D_Acc desc
GO
/****** Object:  StoredProcedure [dbo].[wwwLKcheckUser]    Script Date: 07/13/2018 12:46:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[wwwLKcheckUser] 
	@user varchar(50), @password varchar(50), @ip varchar(50)=null
as

declare @user_ varchar(50), @password_ varchar(50)
set @user_=@user
set @password_=@password
select	u.auser, 
		u.active,
		u.clientID,
		case u.clientID
		when -1 then 'adm'
		else k.C_CO
		end as clientName, 
		k.Loc as clientLOC
from wwwLKUser u
left join Klient k on k.CACC=u.clientID
where u.aUser=@user_ and u.aPassword COLLATE Cyrillic_General_CS_AS = @password_ COLLATE Cyrillic_General_CS_AS
and u.active = 1
if @@ROWCOUNT=1 insert [Log] ([user], [PKName]) values (@user_, @ip)
GO
/****** Object:  Table [dbo].[wwwLKTemplate]    Script Date: 07/13/2018 12:46:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[wwwLKTemplate](
	[tplID] [int] IDENTITY(1,1) NOT NULL,
	[TemplateName] [varchar](500) NOT NULL,
	[clientID] [int] NOT NULL,
	[ORG] [varchar](10) NULL,
	[ORGCity] [int] NULL,
	[CACC] [varchar](10) NULL,
	[CName] [varchar](60) NULL,
	[Address] [varchar](200) NULL,
	[ContName] [varchar](50) NULL,
	[ContPhone] [varchar](50) NULL,
	[ContFax] [varchar](50) NULL,
	[ContMail] [varchar](50) NULL,
	[OrgRems] [varchar](1000) NULL,
	[DEST] [varchar](10) NULL,
	[DESTCity] [int] NULL,
	[DCACC] [varchar](10) NULL,
	[DName] [varchar](60) NULL,
	[DAdr] [varchar](200) NULL,
	[DContName] [varchar](50) NULL,
	[DContPhone] [varchar](50) NULL,
	[DContFax] [varchar](50) NULL,
	[DContMail] [varchar](50) NULL,
	[DESTRems] [varchar](1000) NULL,
 CONSTRAINT [PK_wwwLKTemplate] PRIMARY KEY CLUSTERED 
(
	[tplID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  StoredProcedure [dbo].[wwwLKsetOrder]    Script Date: 07/13/2018 12:46:08 ******/
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
      @CACC = CACC
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

if exists(select 1 from RegOrders where ROrdNum = @RordNum and Status > 0) 
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
exec wwwLKSetWb
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
/****** Object:  StoredProcedure [dbo].[wwwLKgetUsers]    Script Date: 07/13/2018 12:46:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[wwwLKgetUsers]
as
select u.userID as id
, u.aUser
, u.active
, u.ClientID
, k.C_Name
, c.RusName as c_city
, k.Loc
from wwwLKUser u
left join Klient k on u.ClientID = k.CACC
left join N_City c on c.Code = k.Loc
where u.aUser != 'webadmin'
order by u.aUser
GO
/****** Object:  StoredProcedure [dbo].[wwwLKsetTemplate]    Script Date: 07/13/2018 12:46:08 ******/
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
/****** Object:  StoredProcedure [dbo].[wwwLKgetTemplates]    Script Date: 07/13/2018 12:46:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[wwwLKgetTemplates]
@clientID int
AS
if @clientID is null return 
SELECT t.[tplID] as id
      ,t.[TemplateName]
      ,t.[clientID]

      ,orgcode=t.ORGCity
      ,ORG=(select N_City.RusName from  N_City where N_City.id=t.ORGCity)
      ,t.[CACC]
      ,t.[CName]
      ,t.[Address]
      ,t.[ContName]
      ,t.[ContPhone]
      ,t.[ContFax]
      ,t.[ContMail]
      ,t.[OrgRems]

      ,destcode=t.DESTCity
      ,DEST=(select N_City.RusName from  N_City where N_City.id=t.DESTCity)
      ,t.[DCACC]
      ,t.[DName]
      ,t.[DAdr]
      ,t.[DContName]
      ,t.[DContPhone]
      ,t.[DContFax]
      ,t.[DContMail]
      ,t.[DESTRems]        
    
  FROM wwwLKTemplate t
  where t.clientID=@clientID
GO
/****** Object:  StoredProcedure [dbo].[wwwLKdelTemplate]    Script Date: 07/13/2018 12:46:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[wwwLKdelTemplate]
@tplID int
AS
BEGIN TRY
BEGIN TRAN
delete
  FROM wwwLKTemplate
  where tplID=@tplID
  select @tplID as id
 COMMIT TRAN
END TRY
BEGIN CATCH
	ROLLBACK TRAN
	DECLARE @ErrorMessage NVARCHAR(4000);	
	SELECT @ErrorMessage = 'Error in wwwDelAgTemplates: '+ ERROR_MESSAGE() 
	RAISERROR (@ErrorMessage, -- Message text.
               16, -- Severity.
               1 -- State.
               );
END CATCH
GO
/****** Object:  StoredProcedure [dbo].[wwwLKgetOrders]    Script Date: 07/13/2018 12:46:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[wwwLKgetOrders]
@period varchar(10), @clientID int
AS

--if ISNULL(ltrim(rtrim(@period)), '') = '' or @agentID is null return

if @clientID is null return
if ISNULL(ltrim(rtrim(@period)), '') = '' set @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'

declare @bDate date, @eDate date, @agID int
declare @CACC varchar(50), @aUser varchar(50)

select @CACC = CACC, @aUser = aUser from wwwLKUser where userID = @clientID

--set @agID = @agentID -- 54
set @bDate = @period+'01'
--set @eDate = dateadd(d, -1, DATEADD(m,1,@bDate))
set @eDate = DATEADD(m,1,@bDate)
 
SELECT [ROrdNum]
     ,ORGCity as org
      ,ORGCity=(select N_City.RusName from  N_City where N_City.id=ORGCity)--
      ,[CName]
      ,[Address] as s_adr
      ,[ContName] as s_name
      ,[ContPhone] as s_tel
   
      ,[ContMail] as s_mail
 
      ,[type]
      ,[Packs]
      ,[Wt]
      ,[VolWt]
  
      ,DESTCity=(select N_City.RusName from  N_City where N_City.id=DESTCity)
      ,[DName]
  
      ,[datein]
	  ,[status]= 
	case
	when Wb_no is null then
		case
			when r.NeedDel = 1 then 'отменен'
			when r.Wb_no is NULL and (r.NeedDel is NULL or r.NeedDel=0) and DATEDIFF(dd, dbo.addWDays(courDate, 2), getDate())>0 then 'просрочено'
			when r.Status = 0  then 'заявлен'
			when r.Status = 1  then 'передан агенту'
			when r.Status = 2  then 'принят агентом'
			when r.Status = 4  then 'присвоен № нак.'
			when r.Status = 3  then 'отказ клиента'
		end
	else
		case --обратный порядок
			when (select tdd from Main m where m.Wb_No = r.Wb_no) is not null then 'доставлено'
			when exists(select 1 from MnfBdy mb where Wb_no = r.Wb_no and mb.MnfRefNo like 'MOW%') then 'отправлено'
			when exists(select 1 from MnfBdy mb where Wb_no = r.Wb_no and mb.MnfRefNo = '0') then 'на комплектовке'
		else 'присвоен № нак.'
		end
	end    
     ,wb_no
    
  FROM RegOrders r
  where [DateIn] >= @bDate and [DateIn] < @eDate
  and (@agID = -1 or (UserIn=@aUser))
  order by ROrdNum desc
GO
/****** Object:  StoredProcedure [dbo].[wwwLKgetOrder]    Script Date: 07/13/2018 12:46:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[wwwLKgetOrder]
@id int,
@agent int
AS

if @id is null return

SELECT r.[rordnum]
      ,orgcode=ORGCity
      ,org=(select N_City.RusName from  N_City where N_City.id=ORGCity)
  
      ,[cname]
      ,[address]
      ,[contname]
      ,[contphone]

      ,[contmail]= case ltrim([contmail]) when '' then null else [contmail] end
      ,[orgrems]

      ,[paytype]
      ,[type]
      ,[packs]
      ,[wt]
      ,[volwt]
      ,[amt]
      ,[curid]

      ,destcode=DESTCity
      ,dest=(select N_City.RusName from  N_City where N_City.id=DESTCity)
 
      ,[dname]
      ,[dadr]
      ,[dcontname]
      ,[dcontphone]

      ,[dcontmail]=case ltrim([dcontmail]) when '' then null else [dcontmail] end
      ,[destrems]
      ,[datein]=convert(varchar,[DateIn],104)
	  ,courdate=convert(varchar,courdate,104)
	  ,courtimef=left(convert(varchar,courtimef,108),5)
	  ,courtimet=left(convert(varchar,courtimet,108),5)
	  , f.FilePlase
	  , f.RealFileName
	  , f.AutorFileName
	  , fileowner = case when pcacc = @agent then 1 else 0 end
	  , [status]= case--
        when r.NeedDel = 1 then 'отменен'
        when (select COUNT(1) from MnfBdy where Wb_no = r.Wb_no) <> 0 then 'на комплектовке'
        when r.Wb_no is NULL and (r.NeedDel is NULL or r.NeedDel=0) and DATEDIFF(dd, dbo.addWDays(courDate, 2), getDate())>0 then 'просрочено'
        when r.Status = 0  then 'заявлен'
        when r.Status = 1  then 'передан агенту'
        when r.Status = 2  then 'принят агентом'
        when r.Status = 4  then 'присвоен № нак.'
        when r.Status = 3  then 'отказ клиента'
        end
  FROM RegOrders r
  left join AgFiles f on r.ROrdNum =f.ROrdNum
  where r.[ROrdNum]=@id
GO
/****** Object:  Default [DF_wwwLKUser_active]    Script Date: 07/13/2018 12:46:09 ******/
ALTER TABLE [dbo].[wwwLKUser] ADD  CONSTRAINT [DF_wwwLKUser_active]  DEFAULT ((1)) FOR [active]
GO
