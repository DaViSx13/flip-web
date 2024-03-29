USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertMain]    Script Date: 06/14/2023 11:19:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[sp_InsertMain]
	@Wb_No varchar(50),
	@D_Acc datetime ,
	@T_Acc datetime ,
	@User_IN varchar(50) = NULL,
	@User_Edit varchar(50) = NULL,
	@ORG varchar(5) ,
	@DEST varchar(5) ,
	@SCode varchar(10),
	@S_Name varchar(20) ,
	@S_Tel varchar(50) ,
	@S_Co varchar(40) ,
	@S_Adr varchar(200) ,
	@S_Cnt varchar(10) ,
	@S_Zip varchar(9) ,
	@S_Ref varchar(300) = NULL,
	@Rcode varchar(10) ,
	@R_Name varchar(20) ,
	@R_Tel varchar(50) ,
	@R_Co varchar(40) ,
	@R_Adr varchar(200) ,
	@R_Cnt varchar(10) ,
	@R_Zip varchar(9) ,
	@MetPaym varchar(3) ,
	@Payr smallint ,
	@ACC varchar(10) ,
	@T_SRV varchar(3) ,
	@T_PAK varchar(3) ,
	@T_DEL varchar(3) ,
	@MT_SRV smallint ,
	@Pers bit = 0,
	@PCS int,
	@WT float ,
	@Vol_WT float = 0,
	@V_Car float = 0,
	@V_Cust float = 0,
	@B_Chg money = NULL,
	@V_Chg money = NULL,
	@A_Chg money = NULL,
	@T_Chg money = NULL,
	@COD money = NULL,
	@Rcvb bit = NULL,
	@Id tinyint = NULL,
	@PartId int = NULL,
	@Descr varchar(500) = NULL,
	@Inv_no int = NULL,
	@Timing datetime = NULL,
	@DTD datetime = NULL,
	@P_D_IN datetime = NULL,
	@P_D_IN_HOW bit = NULL,
	@DOD datetime = NULL,
	@RCPN varchar(50) = NULL,
	@RCPC tinyint = NULL,
	@DEX varchar(2) = NULL,
	@TDD datetime = NULL,
	@User_TDD varchar(50) = NULL,
	@POD datetime = NULL,
	@Stat varchar(2) = NULL,
	@Srate bit = 0,
	@DEnter datetime = NULL,
	@Transit bit = NULL,
	@EmpIdR int = NULL,
	@EmpIdTR char(1) = NULL,
	@CourRId int = NULL,
	@EmpIdD int = NULL,
	@EmpIdTD char(1) = NULL,
	@CourDId int = NULL,
	@OrderNo int = NULL,
	@AgentOrder bit,
	@Freeze bit = 0,
	@deltaTime float = NULL,
	@NeedSorting bit = 0,
	@CODCurr tinyint = NULL,
	@PayHimself bit = NULL,
	@uvedomlenie bit = NULL,
	@NeedCall bit = NULL,
	@HolidayDel bit = NULL,
	@aCash money = NULL,
	@aCashCurr tinyint = NULL,
	@frm_in tinyint = NULL,
	@dangerCargo bit = NULL,
	@aCashAutoCalc bit = 1,
  @ins money = 0,
  @inssum money = 0,
  @innerMail bit = 0,
  @SpecInstr varchar(500) = NULL,
  @FlipRems varchar(500) = NULL
as
set nocount on

/*
set User_in
set DEnter
set Transit
set frm_in
set B_Chg
set V_Chg
set A_Chg
set T_Chg

*/
set @Wb_No = UPPER(@Wb_No)
set @ORG = UPPER(@ORG)
set @DEST = UPPER(@DEST)

---дефолты 
if @User_IN is null set @User_IN = SYSTEM_USER
set @DEnter = GETDATE()

if @frm_in is null set @frm_in = isnull(dbo.FrmID(), 4)

if @Transit is null
	if @ORG not like 'MOW%' and @DEST not like 'MOW%' set @Transit = 1 else set @Transit = 0

---дефолты для делфей
set	@Pers = ISNULL(@Pers, 0)
set @Vol_WT = isnull(@Vol_WT, 0)
set @V_Car = ISNULL(@V_Car, 0)
set @V_Cust =ISNULL(@V_Cust, 0)
set @Srate = ISNULL(@Srate, 0)
set @Freeze =ISNULL(@Freeze, 0)
set @NeedSorting = ISNULL(@NeedSorting, 0)
set @aCashAutoCalc = ISNULL(@aCashAutoCalc, 1)
set @innerMail = ISNULL(@innerMail, 0)

---MT_SRV
if @MT_SRV is null
	SELECT @MT_SRV = max(MT_SRV)
	FROM  City
	WHERE Code in (@ORG, @DEST)


---РДД 
declare @bDate datetime, @frmLoc varchar(5), @planNo int, @frmId int, @minDelivery bit
select @frmLoc = 'MOW', @frmId = 4

--тарифный план
select @planNo = planNo, @minDelivery = minDelivery from Klient where CACC = @ACC
if @planNo is null
	select @planNo = case @AgentOrder when 0 then 1 else 2 end

if @DTD is null
	begin
	select top 1 @bDate = date_in from transactlog where trtypeid = 1 and frm_in = @frmId and wb_no= @Wb_No order by DateTransact desc

	if @bDate is null
		select top 1 @bDate = date_in from transactlog where trtypeid = 5 and frm_in = @frmId and wb_no= @Wb_No order by DateTransact desc
	
	if @bDate is null
		begin
		if (left(@DEST, 3) = @frmLoc)
			select @bDate = GETDATE()
		else 
			select @bDate = @D_Acc		
		end
	
	exec sp_getDTD @ORG, @DEST, @bDate, @T_SRV, @frmId, @planNo, @DTD out, @minDelivery
	end


---тариф
declare /*@PLANNO int,*/ @rem varchar(500)

--set @PLANNO = case when @AgentOrder = 0 then 1 else 2 end
if @innerMail = 0 
begin
exec sp_getTarif
	  @ORG = @ORG
	, @DEST = @DEST
	, @T_SRV = @T_SRV
	, @WT = @WT
	, @VOL_WT = @VOL_WT
	, @AGENTORDER = @AGENTORDER
	, @PLANNO = @PLANNO
	, @PCS = @PCS
	, @FIRM_ID = @frmId
	, @METPAYM = @METPAYM
	, @PAYR = @PAYR
	, @T_PAK = @T_PAK
	, @MT_SRV = @MT_SRV
	, @date = @D_ACC
	, @acc = @ACC
	, @B = @B_Chg OUT
	, @A = @A_Chg OUT 
	, @T = @T_Chg OUT
	, @rem = @rem OUT

  set @V_Chg = ISNULL(@V_Chg, 0)
end
else
begin
  set @B_Chg = 0
  set @A_Chg = 0
  set @V_Chg = 0
  set @T_Chg = 0
end

--наличные с получателя
if @Payr = 2 and @MetPaym = 'CSH'
	begin
	set @aCashCurr = 3 --RUR
	if @aCash is null
		set @aCash = @T_Chg
	else if @aCash <> @T_Chg
		set @aCashAutoCalc = 0
	end	
else
	begin
	set @aCashCurr = null
	set @aCash = null
	end	

---insert 
insert Main
(Wb_No, D_Acc, T_Acc, User_IN, User_Edit, ORG, DEST, SCode, S_Name, S_Tel, S_Co, S_Adr, S_Cnt, S_Zip, S_Ref, Rcode, R_Name, R_Tel, R_Co, R_Adr, R_Cnt, R_Zip, MetPaym, Payr, ACC, T_SRV, T_PAK, T_DEL, MT_SRV, Pers, PCS, WT, Vol_WT, V_Car, V_Cust, B_Chg, V_Chg, A_Chg, T_Chg, COD, Rcvb, Id, PartId, Descr, InvId, Timing, DTD, P_D_IN, P_D_IN_HOW, DOD, RCPN, RCPC, DEX, TDD, User_TDD, POD, Stat, Srate, DEnter, Transit, EmpIdR, EmpIdTR, CourRId, EmpIdD, EmpIdTD, CourDId, OrderNo, AgentOrder, Freeze, deltaTime, NeedSorting, CODCurr, PayHimself, uvedomlenie, NeedCall, HolidayDel, aCash, aCashCurr, frm_in, dangerCargo, aCashAutoCalc, ins, inssum, innerMail, SpecInstr, FlipRems)
values (
@Wb_No, @D_Acc, @T_Acc, @User_IN, @User_Edit, @ORG, @DEST, @SCode, @S_Name, @S_Tel, @S_Co, @S_Adr, @S_Cnt, @S_Zip, @S_Ref, @Rcode, @R_Name, @R_Tel, @R_Co, @R_Adr, @R_Cnt, @R_Zip, @MetPaym, @Payr, @ACC, @T_SRV, @T_PAK, @T_DEL, @MT_SRV, @Pers, @PCS, @WT, @Vol_WT, @V_Car, @V_Cust, @B_Chg, @V_Chg, @A_Chg, @T_Chg, @COD, @Rcvb, @Id, @PartId, @Descr, @Inv_no, @Timing, @DTD, @P_D_IN, @P_D_IN_HOW, @DOD, @RCPN, @RCPC, @DEX, @TDD, @User_TDD, @POD, @Stat, @Srate, @DEnter, @Transit, @EmpIdR, @EmpIdTR, @CourRId, @EmpIdD, @EmpIdTD, @CourDId, @OrderNo, @AgentOrder, @Freeze, @deltaTime, @NeedSorting, @CODCurr, @PayHimself, @uvedomlenie, @NeedCall, @HolidayDel, @aCash, @aCashCurr, @frm_in, @dangerCargo, @aCashAutoCalc, @ins, @inssum, @innerMail, @SpecInstr, @FlipRems)
