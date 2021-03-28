USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwCourSetWB]    Script Date: 03/28/2021 18:58:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[wwwCourSetWB]
@wb_no varchar(50)
as
begin
declare @cnt1 int, @cnt2 int, 
		@D_Acc datetime,	
		@T_Acc datetime, 
		@ORG varchar(5), 
		@DEST varchar(5),		
		@S_Name varchar(20),
		@S_Tel varchar(50),
		@S_Co varchar(40),
		@S_Adr varchar(200),		
		@S_Ref varchar(300),		
		@R_Name varchar(20),
		@R_Tel varchar(50),
		@R_Co varchar(40),
		@R_Adr varchar(200),
		@PCS int,
		@WT float ,
		@Vol_WT float,
		@MetPaym varchar(3),
		@Payr smallint,
		@T_PAK varchar(3),
		@return_value int
set @cnt1 = 0
set @cnt2 = 0

select @cnt1 = 1
from wwwClientWB
where Wb_No = @wb_no

select @cnt2 = 1
from Main
where Wb_No = @wb_no

if @cnt1=1 and @cnt2 = 0
begin

select	@D_Acc = CAST(c.Date_IN AS DATE), 
		@T_Acc = CAST(c.Date_IN AS TIME),
		@ORG = c.ORG,
		@DEST = c.DEST,
		@S_Name = c.S_Name,
		@S_Tel = c.S_Tel,
		@S_Co = c.S_Co,
		@S_Adr = c.S_Adr,
		@S_Ref = c.S_Ref,
		@R_Name = c.R_Name,
		@R_Tel = c.R_Tel,
		@R_Co = c.R_Co,
		@R_Adr = c.R_Adr,
		@PCS = c.PCS,
		@WT = c.WT,
		@Vol_WT = c.VOL_WT,
		@MetPaym = c.MetPaym,
		@Payr = c.Payr,
		@T_PAK = case when c.T_PAC = 1 then 'LE' else 'PL' end
from wwwClientWB c
where c.Wb_No = @wb_no
--select '77-000-998', @D_Acc, @T_Acc, @ORG, @DEST, @S_Name, @S_Tel, @S_Co, @S_Adr, @S_Ref, @R_Name, @R_Tel, @R_Co, @R_Adr    

exec @return_value = sp_InsertMain 
@Wb_No = @wb_no,
@D_Acc = @D_Acc,
@T_Acc = @T_Acc,
@ORG = @ORG,
@DEST = @DEST,
@S_Name = @S_Name,
@S_Tel = @S_Tel,
@S_Co = @S_Co,
@S_Adr = @S_Adr,
@S_Ref = @S_Ref,
@R_Name = @R_Name,
@R_Tel = @R_Tel,
@R_Co = @R_Co,
@R_Adr = @R_Adr,
@SCode = 'impMOW',
@S_Cnt = '–Œ——»ﬂ',
@S_zip = NULL,
@RCode = 'impLED',
@R_Cnt = '–Œ——»ﬂ',
@R_zip = NULL,
@MetPaym = @MetPaym,
@Payr = @Payr,
@ACC = 'impMOW',
@T_SRV = 'ST',
@T_PAK = @T_PAK,
@T_DEL = NULL,
@MT_SRV = 3,
@PCS = @PCS,
@WT = @WT,
@AgentOrder = 0

select InsRes = 1, ErrStr = ''

end else
begin
select InsRes = 0, ErrStr = 'Œ¯Ë·Í‡!'
end 
 
end



GO


