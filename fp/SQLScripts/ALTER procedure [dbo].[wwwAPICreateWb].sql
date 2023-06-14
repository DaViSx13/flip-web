USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwAPICreateWb]    Script Date: 06/14/2023 10:51:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwAPICreateWb]
	@waybillNumber varchar(50),
	@waybillDate datetime,

	@S_Name varchar(20),
	@S_company varchar(40),
	@S_phone varchar(50),
	@S_l_country varchar(10),
	@s_l_state varchar(50),
	@s_l_city varchar(50),
	@S_l_address varchar(200),
	@S_l_zip varchar(9),
	
	@R_Name varchar(20),
	@R_company varchar(40),
	@R_phone varchar(50),
	@R_l_country varchar(10),
	@R_l_state varchar(50),
	@R_l_city varchar(50),
	@R_l_address varchar(200),
	@R_l_zip varchar(9),

	@P_Name varchar(20),
	@P_company varchar(40),
	@P_phone varchar(50),
	@P_l_country varchar(10),
	@P_l_state varchar(50),
	@P_l_city varchar(50),
	@P_l_address varchar(200),
	@P_l_zip varchar(9),

	@packs int,
	@weight float ,
	@volumeWeight float = 0.1,
	@payType varchar(3),
	@payerType smallint,
	@packType varchar(2),
	@aCash money = NULL,

	@senderComment varchar(300) = NULL,
	@description varchar(500) = NULL,

	@userName varchar(50)
as
begin

declare @ORG varchar(5)
declare @DEST varchar(5)
declare @ACC_LOC varchar(5)

declare @SCode varchar(10)
declare @RCode varchar(10)
declare @ACC varchar(10)

declare @errormsg varchar(1000)


if (
	   @waybillNumber like '%[^a-z0-9!-/]%' ESCAPE '!'
	or @waybillNumber not like '[a-z0-9]%[a-z0-9]'
	)
begin
	set @errormsg = 'Некорректный номер накладной'
	RAISERROR (@errormsg, -- Message text.
               16, -- Severity.
               1 -- State.
               )
	return               
end

if exists(select null from Main where Wb_No = @waybillNumber)
begin
	set @errormsg = 'Накладная [' + @waybillNumber + '] уже есть'
	RAISERROR (@errormsg, -- Message text.
               16, -- Severity.
               1 -- State.
               )
	return               
end

set @ORG = dbo.fn_findCityCodeExact(@s_l_country, @s_l_state, @s_l_city)
if @ORG is null 
begin
	set @errormsg = 'Город отправителя [' + @s_l_city + '] не найден'
	RAISERROR (@errormsg, -- Message text.
               16, -- Severity.
               1 -- State.
               )
	return               
end

set @DEST = dbo.fn_findCityCodeExact(@R_l_country, @R_l_state, @R_l_city)
if @DEST is null 
begin
	set @errormsg = 'Город получателя [' + @R_l_city + '] не найден'
	RAISERROR (@errormsg, -- Message text.
               16, -- Severity.
               1 -- State.
               )
	return               
end

set @ACC_LOC = dbo.fn_findCityCodeExact(@p_l_country, @p_l_state, @P_l_city)
if @ACC_LOC is null 
begin
	set @errormsg = 'Город плательщика [' + @P_l_city + '] не найден'
	RAISERROR (@errormsg, -- Message text.
               16, -- Severity.
               1 -- State.
               )
	return               
end

set @ACC = dbo.fn_findClientCACCExact(@ACC_LOC, @p_company, @P_l_city)
if @ACC is null 
	exec sp_insertClient @Loc=@ACC_LOC, @C_CO=@p_company, @C_CITY=@p_l_city, @C_Adr=@p_l_address, @CACC=@ACC OUT, @C_Name=@p_name, @C_Tel=@p_phone, @C_ZIP=@p_l_zip, @user_in=@userName
if @ACC is null 
begin
	set @errormsg = 'Клиент-плательщик не найден'
	RAISERROR (@errormsg, -- Message text.
               16, -- Severity.
               1 -- State.
               )
	return               
end

set @SCode = dbo.fn_findClientCACCExact(@ORG, @S_company, @s_l_city)
if @SCode is null
	and @ORG not like '%[0-9]'
	select @SCode = k.CACC from Klient k where k.Loc = @ORG and k.CACC = 'imp'+@ORG
if @SCode is null 
	exec sp_insertClient @Loc=@ORG, @C_CO=@S_company, @C_CITY=@s_l_city, @C_Adr=@s_l_address, @CACC=@SCode OUT, @C_Name=@s_name, @C_Tel=@s_phone, @C_ZIP=@s_l_zip, @user_in=@userName
if @SCode is null 
begin
	set @errormsg = 'Клиент-отправитель не найден'
	RAISERROR (@errormsg, -- Message text.
               16, -- Severity.
               1 -- State.
               )
	return               
end

set @RCode = dbo.fn_findClientCACCExact(@DEST, @R_company, @R_l_city)
if @RCode is null
	and @DEST not like '%[0-9]'
	select @RCode = k.CACC from Klient k where k.Loc = @DEST and k.CACC = 'imp'+@DEST
if @RCode is null 
	exec sp_insertClient @Loc=@DEST, @C_CO=@R_company, @C_CITY=@R_l_city, @C_Adr=@R_l_address, @CACC=@RCode OUT, @C_Name=@R_name, @C_Tel=@R_phone, @C_ZIP=@R_l_zip, @user_in=@userName
if @RCode is null 
begin
	set @errormsg = 'Клиент-получатель не найден'
	RAISERROR (@errormsg, -- Message text.
               16, -- Severity.
               1 -- State.
               )
	return               
end

set @packType=UPPER(@packType)
set @payType=UPPER(@payType)
set @waybillNumber=UPPER(@waybillNumber)

CREATE TABLE #TmpTable (str1 VARCHAR (30), str2 VARCHAR (30), str3 VARCHAR (30), str4 VARCHAR (30));

INSERT INTO #TmpTable
exec sp_InsertMain 
@Wb_No = @waybillNumber,
@D_Acc = @waybillDate,
@T_Acc = null,
@ORG = @ORG,
@DEST = @DEST,

@SCode = @SCode,
@S_Co = @S_company,
@S_Name = @S_Name,
@S_Adr = @S_l_address,
@S_Tel = @S_phone,
@S_Cnt = @S_l_country,
@S_zip = @S_l_zip,
@S_Ref = @senderComment,

@RCode = @RCode,
@R_Co = @R_company,
@R_Name = @R_Name,
@R_Adr = @R_l_address,
@R_Tel = @R_phone,
@R_Cnt = @R_l_country,
@R_zip = @R_l_zip,

@MetPaym = @payType,
@Payr = @payerType,

@ACC = @ACC,

@T_SRV = 'ST',
@T_PAK = @packType,

@PCS = @packs,
@WT = @weight,
@Vol_WT = @volumeWeight,

@Descr = @description,
@User_IN = @userName,

@T_DEL = NULL,
@MT_SRV = NULL,
@AgentOrder = 0,
@inssum = 0,
@aCash = @aCash

DROP TABLE #TmpTable
select @waybillNumber as waybillNumber               
end
