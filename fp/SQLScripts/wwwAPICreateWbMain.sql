USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwAPICreateWb]    Script Date: 09/14/2023 14:29:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[wwwAPICreateWbMain]
	@waybillNumber varchar(50),
	@waybillDate datetime,

	@S_Name varchar(20),
	@S_company varchar(40),
	@S_phone varchar(50),
	@S_l_country varchar(50),
	@s_l_state varchar(50),
	@s_l_city varchar(50),
	@S_l_address varchar(200),
	@S_l_zip varchar(9),
	
	@R_Name varchar(20),
	@R_company varchar(40),
	@R_phone varchar(50),
	@R_l_country varchar(50),
	@R_l_state varchar(50),
	@R_l_city varchar(50),
	@R_l_address varchar(200),
	@R_l_zip varchar(9),

	@P_Name varchar(20),
	@P_company varchar(40),
	@P_phone varchar(50),
	@P_l_country varchar(50),
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
	
	@SubCategoryWB varchar(15) = NULL,
	@mnfrefno varchar(15) = null,
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

if @SubCategoryWB not in ('Опасный груз', 'Авиа', 'ЖД')
set @SubCategoryWB = NULL

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

/*if exists(select null from wwwClientWB where Wb_No = @waybillNumber)
begin
	update wwwClientWB set wbsource = 'JSON_API', mnfrefno = @mnfrefno where Wb_No = @waybillNumber
	select @waybillNumber as waybillNumber
	return
end*/


set @ORG = dbo.fn_findCityCodeExact(@s_l_country, @s_l_state, @s_l_city)
if @ORG is null 
begin
	/*set @errormsg = 'Город отправителя [' + @s_l_city + '] не найден'
	RAISERROR (@errormsg, -- Message text.
               16, -- Severity.
               1 -- State.
               )
	return  */
	if (CHARINDEX(' ', @s_l_state) > 0) and (LEN(@s_l_state)>0)	
		select @ORG = vc.Code from City vc
		where isnull(vc.FUll_Name, '') like SUBSTRING (@s_l_state, 0, CHARINDEX(' ', @s_l_state))+'%Прочие'
		and active = 1
	if (CHARINDEX(' ', @s_l_state) = 0) and (LEN(@s_l_state)>0)	
		select @ORG = vc.Code from City vc
		where isnull(vc.FUll_Name, '') like @s_l_state + '%Прочие'
		and active = 1
		 	
	if @ORG is null
		select @ORG = 'XXX'	
	             
end

set @DEST = dbo.fn_findCityCodeExact(@R_l_country, @R_l_state, @R_l_city)
if @DEST is null 
begin
	/*set @errormsg = 'Город получателя [' + @R_l_city + '] не найден'
	RAISERROR (@errormsg, -- Message text.
               16, -- Severity.
               1 -- State.
               )
	return  */
	if (CHARINDEX(' ', @R_l_state) > 0) and (LEN(@R_l_state)>0)	
		select @DEST = vc.Code from City vc
		where isnull(vc.FUll_Name, '') like SUBSTRING (@R_l_state, 0, CHARINDEX(' ', @R_l_state))+'%Прочие'
		and active = 1
	if (CHARINDEX(' ', @R_l_state) = 0) and (LEN(@R_l_state)>0)	
		select @DEST = vc.Code from City vc
		where isnull(vc.FUll_Name, '') like @R_l_state + '%Прочие'
		and active = 1
		 	
	if @DEST is null
		select @DEST = 'XXX'	             
end

set @ACC_LOC = dbo.fn_findCityCodeExact(@p_l_country, @p_l_state, @P_l_city)
if @ACC_LOC is null 
begin
	/*set @errormsg = 'Город плательщика [' + @P_l_city + '] не найден'
	RAISERROR (@errormsg, -- Message text.
               16, -- Severity.
               1 -- State.
               )
	return  */
	if (CHARINDEX(' ', @p_l_state) > 0) and (LEN(@p_l_state)>0)	
		select @ACC_LOC = vc.Code from City vc
		where isnull(vc.FUll_Name, '') like SUBSTRING (@p_l_state, 0, CHARINDEX(' ', @p_l_state))+'%Прочие'
		and active = 1
	if (CHARINDEX(' ', @p_l_state) = 0) and (LEN(@p_l_state)>0)	
		select @ACC_LOC = vc.Code from City vc
		where isnull(vc.FUll_Name, '') like @p_l_state + '%Прочие'
		and active = 1 
			
	if @ACC_LOC is null
		select @ACC_LOC = 'XXX'             
end

if (len(@S_company) = 0) or (len(@S_l_address) = 0) or (len(@S_phone) = 0)
begin
	set @errormsg = 'Поля [company, address, phone] клиента-отправителя [sender] не заполнены'
	RAISERROR (@errormsg, -- Message text.
               16, -- Severity.
               1 -- State.
               )
	return               
end

if (len(@R_company) = 0) or (len(@R_l_address) = 0) or (len(@R_phone) = 0)
begin
	set @errormsg = 'Поля [company, address, phone] клиента-получателя  [receiver] не заполнены'
	RAISERROR (@errormsg, -- Message text.
               16, -- Severity.
               1 -- State.
               )
	return               
end

if (len(@P_company) = 0) or (len(@P_l_address) = 0) or (len(@P_phone) = 0)
begin
	set @errormsg = 'Поля [company, address, phone] клиента-плательщика [payer] не заполнены'
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
@aCash = @aCash,
@SubCategoryWB = @SubCategoryWB

DROP TABLE #TmpTable
/*
Insert into wwwClientWB 
(
Wb_No,
Ord_No,
Date_IN,
ORG,
S_City_ID,
R_City_ID,
S_City,
S_Name,
S_Tel,
S_Co,
S_Adr,
S_Ref,
DEST,
R_City,
R_Name,
R_Tel,
R_Co,
R_Adr,
User_IN,
WT,
VOL_WT,
PCS,
T_PAC,
Payr,
MetPaym,
INSSUM,
Descr,
wbsource,
S_Code,
S_Cnt,
S_zip,
R_Code,
R_Cnt,
R_zip,
ACC,
T_SRV,
T_DEL,
MT_SRV,
AgentOrder,
D_Acc,
aStatus,
aCash,
subCategoryWB,
mnfrefno
) 
values 
(
@waybillNumber,
0,
GETDATE(),
@ORG,
0,
0,
@s_l_city,
@S_Name,
@S_phone,
@S_company,
@S_l_address,
@senderComment,
@DEST,
@R_l_city,
@R_Name,
@R_phone,
@R_company,
@R_l_address,
@userName,
@weight,
@volumeWeight,
@packs,
case when @packType = 'LE' then 1 when @packType = 'PA' then 2 else 3 end,
@payerType,
@payType,
0,
@description,
'JSON_API',
@SCode,
@S_l_country,
@S_l_zip,
@RCode,
@R_l_country,
@R_l_zip,
@ACC,
'ST',
NULL,
NULL,
0,
@waybillDate,
1,
@aCash,
@subCategoryWB,
@mnfrefno
)           
*/

select @waybillNumber as waybillNumber               
end

GO
GRANT EXECUTE ON wwwAPICreateWbMain TO POD
GO