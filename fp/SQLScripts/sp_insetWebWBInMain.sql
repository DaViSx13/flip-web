USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[sp_insetWebWBInMain]    Script Date: 09/14/2023 18:09:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_insetWebWBInMain]
	@wb_no varchar(50)
AS	

declare 
@waybillDate datetime,
@S_Name varchar(20),
@S_company varchar(40),
@S_phone varchar(50),
@S_l_country varchar(10),
@S_l_address varchar(200),
@S_l_zip varchar(9),
@S_Ref varchar(300),
	
@R_Name varchar(20),
@R_company varchar(40),
@R_phone varchar(50),
@R_l_country varchar(10),
@R_l_address varchar(200),
@R_l_zip varchar(9),

@packs int,
@weight float ,
@volumeWeight float = 0.1,
@payType varchar(3),
@payerType smallint,
@packType varchar(2),

@senderComment varchar(300) = NULL,
@description varchar(500) = NULL,

@userName varchar(50),
@ORG varchar(5),
@DEST varchar(5),
@SCode varchar(10),
@RCode varchar(10),
@ACC varchar(10),

@OrderNo int,
@Date_IN datetime,
@T_SRV varchar(3),
@T_DEL varchar(3),
@MT_SRV smallint,
@AgentOrder bit,
@T_PAK varchar(3),
@aCash money = NULL,
@SubCategoryWB varchar(15) = NULL,
@INSSUM money,
@MNFRefNo varchar(15),
@Cnt int = 0;

if not exists(select null from wwwClientWB c where c.astatus = 1 and wbsource = 'JSON_API' and c.Wb_No = @wb_no)
begin
	RAISERROR ('Нет такой накладной!', -- Message text.
               16, -- Severity.
               1 -- State.
               )
	return  
end

Select
@OrderNo=Ord_No,
@Date_IN= D_ACC,
@ORG=ORG,
	
@S_Name=S_Name,
@S_phone=S_Tel,
@S_company=S_Co,
@S_l_address=S_Adr,
@S_Ref=S_Ref,
@DEST=DEST,
	
@R_Name=R_Name,
@R_phone=R_Tel,
@R_company=R_Co,
@R_l_address=R_Adr,
@userName=User_IN,
@weight=WT,
@volumeWeight=VOL_WT,
@packs=PCS,
@payerType=Payr,
@payType=MetPaym,
	
@description=Descr,
	
@SCode=S_Code,
@S_l_country=S_Cnt,
@S_l_zip=S_zip,
@RCode=	R_Code,
@R_l_country=R_Cnt,
@R_l_zip=R_zip,
@ACC=ACC,
@waybillDate=D_Acc,
@T_PAK = case when T_PAC = 1 then 'LE' when T_PAC = 2 then 'PA' end,	
@T_SRV=T_SRV,
@T_DEL=T_DEL,
@MT_SRV=MT_SRV,
@AgentOrder=AgentOrder,
@INSSUM=INSSUM,
@aCash = aCash,
@subCategoryWB = subCategoryWB,
@MNFRefNo = MNFRefNo

from wwwClientWB where Wb_No = @Wb_No;

exec sp_InsertMain 
@Wb_No = @Wb_no,
@D_Acc = @waybillDate,
@T_Acc = @Date_IN,
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

@T_SRV = @T_SRV,
@T_PAK = @T_PAK,

@PCS = @packs,
@WT = @weight,
@Vol_WT = @volumeWeight,

@Descr = @description,
@User_IN = @userName,

@T_DEL = @T_DEL,
@MT_SRV = @MT_SRV,
@AgentOrder = @AgentOrder,
@inssum = @inssum,
@aCash = @aCash,
@SubCategoryWB = @SubCategoryWB;

if exists(select null from Main where Wb_No = @wb_no)
begin
update wwwClientWB set astatus = 0 where wb_no = @wb_no
insert TransactLog (TrTypeId, Wb_No, PcsNo, Wt, W, MnfRefNo)
			select   1, @wb_no, @packs, @weight, @volumeWeight, '0'

insert MnfBdy (Wb_no, MnfRefNo, ORG, DEST, TRACK, Instructions,
                             DTD,S_CO, R_CO, ShPcs, Pcs, ShWt, Wt, ShVol_Wt, Vol_Wt,
                             ShV_Car, V_Car, ShV_cust, V_cust, is_Auto, ComplPlace, Transit, Address, frm_in)
               select  @Wb_no, @MNFRefNo, @ORG, @DEST, TP.TRACK, 
                           ltrim(rtrim( isnull(@description, '') + ' ' + isnull(@S_Ref, '') )),  
                           @Date_IN,@S_company, @R_company, @packs, @packs,  @weight,  @weight, 
                           isnull(@volumeWeight,0),isnull( @volumeWeight,0),0,0,0,0,
                           0, -- Признак автозанесения,
                           5, -- Место комплектовки,
                           0,
                           @S_l_address,
                           4
               from TrackPlan TP where TP.DestCode=@DEST and TP.firmid=4
               
update MnfHdr set BWT = BWT+@weight, BVWt = BVWt +isnull(@volumeWeight,0), BPCS = BVWt+@packs where MNFRefNo = @MNFRefNo               
					
end;