USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwGetWbForExportMnf]    Script Date: 05.12.2018 19:29:33 ******/
DROP PROCEDURE [dbo].[wwwGetWbForExportMnf]
GO

/****** Object:  StoredProcedure [dbo].[wwwGetWbForExportMnf]    Script Date: 05.12.2018 19:29:33 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[wwwGetWbForExportMnf]
@mnfRefNo varchar(15), @agentID int
as

if (@mnfRefNo ='') return
 
SELECT distinct 
			mb.wb_no, 
			mb.dtd,
           h.bpcs, 
			h.bwt,
			h.bvwt,
			r.carrname,
			h.orgtrk, 
			h.desttrk,
			h.darr,
			h.dtarr,
			h.shpd,
			  mb.s_co, 
			  mb.r_co,
			  mb.address, 
              mb.shwt, 
			  mb.shvol_wt,
			  mb.shpcs,
              mb.instructions,
			  c_city=isnull(k2.C_City, isnull(k.C_City,
              (select distinct full_name from city where code=mb.dest))),
              marshrut=(mb.ORG+'-'+mb.DEST), 
			  case m.Payr
			  when 1 then 'отправитель'
			  when 2 then 'получатель'
			  when 3 then '3-е лицо'
			  else '' end as payr,
			  m.r_tel			  
FROM mnfBdy mb 
           left join klient k on (mb.r_co=k.c_co and mb.dest=k.loc)
           left join Main m on m.wb_no = mb.wb_no
           left join klient k2 on (m.RCODE=k2.CACC)
		   left join MnfHdr h on h.MNFRefNo = mb.MnfRefNo
		   left join Carriers r on r.CarrCode = h.CarrCode
WHERE mb.mnfRefNo=@mnfRefNo


GO
GRANT EXECUTE ON [dbo].[wwwGetWbForExportMnf] TO [pod] AS [dbo]
GO
