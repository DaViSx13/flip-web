USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwGetWbMnf]    Script Date: 10/18/2020 18:33:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwGetWbMnf]
@agentID int, @mnfRefNo varchar(15)
as
--declare @mnfRefNo varchar(15)
--select @mnfRefNo='MOW260712-17'--:MnfRefNo -- 'CKC211204-1'

--declare @frmId int
--select @frmID = 256--dbo.frmID()
if (@mnfRefNo ='') set @mnfRefNo=null
 
declare @TrTypeId tinyint;

select @TrTypeId = case  when OrgAgentID = @agentID  then 1
                         when is_Ready = 1   then 6
                         when is_Ready = 2   then 6
                   end
from MnfHdr where MnfRefNo = @MnfRefNo

SELECT --distinct 
			  mb.id,mb.mnfrefno,mb.wb_no, mb.dtd,
              mb.org, mb.dest, mb.[Address],  --mb.track,
              r_city= 
             (select distinct full_name from city where code=mb.dest),
              mb.s_co, mb.r_co, mb.shpcs,
              mb.shwt, mb.shvol_wt--,
              --mb.instructions, mb.transit, mb.complplace,
              --checkis = case TL.TrTypeId when @TrTypeId then convert(varchar(5),max(TL.Date_In),8)/*'+'*/ end,
              --c_adr= isnull(m.R_Adr,isnull(k.C_Adr,k2.C_Adr)),C_Tel=isnull(m.R_Tel,isnull(k.C_Tel,k2.C_Tel)),
       	      --isexcep = (select top 1 1 from ExLog E where E.wbno=mb.wb_no)
              --, destscanned = (select count(1) from transactLog TRL where TRL.wb_no=mb.wb_no and TRL.TrTypeId=1 and TRL.frm_in = @agentID )
FROM mnfBdy mb 
WHERE mb.mnfRefNo=@mnfRefNo
order by mb.Wb_no
