USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwGetWbMnf]    Script Date: 08/19/2012 12:14:50 ******/
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

SELECT distinct mb.id,mb.mnfrefno,mb.wb_no, dtd=convert(varchar,mb.dtd,104),
              mb.org, mb.dest, --mb.track,
              --r_city= isnull(K2.C_City, isnull(k.C_City,
             -- (select distinct full_name from city where code=mb.dest))),
              mb.s_co, mb.r_co, mb.shpcs,
              mb.shwt, mb.shvol_wt--,
              --mb.instructions, mb.transit, mb.complplace,
              --checkis = case TL.TrTypeId when @TrTypeId then convert(varchar(5),max(TL.Date_In),8)/*'+'*/ end,
              --c_adr= isnull(m.R_Adr,isnull(k.C_Adr,k2.C_Adr)),C_Tel=isnull(m.R_Tel,isnull(k.C_Tel,k2.C_Tel)),
       	      --isexcep = (select top 1 1 from ExLog E where E.wbno=mb.wb_no)
              --, destscanned = (select count(1) from transactLog TRL where TRL.wb_no=mb.wb_no and TRL.TrTypeId=1 and TRL.frm_in = @agentID )
FROM mnfBdy mb 
           join City C on mb.dest=c.code
           left join klient k on (mb.r_co=k.c_co and mb.dest=k.loc)
           left join Main m on m.wb_no = mb.wb_no
           left join klient k2 on (m.RCODE=k2.CACC)
           left join TransactLog TL on
          mb.wb_no = TL.wb_no and tl.TrTypeId = @TrTypeId
WHERE mb.mnfRefNo=@mnfRefNo
group by mb.id,mb.MnfRefNo,mb.Wb_no,mb.DTD,mb.ORG,mb.DEST,mb.TRACK,k2.C_CITY,k.C_CITY,mb.S_CO,mb.R_CO,
         mb.ShPcs,mb.ShWt,mb.ShVol_Wt,mb.Instructions,mb.Transit,mb.ComplPlace,TL.TrTypeId,m.R_Adr,k.C_Adr,
         k2.C_Adr,m.R_Tel,k.C_Tel,k2.C_Tel
 
