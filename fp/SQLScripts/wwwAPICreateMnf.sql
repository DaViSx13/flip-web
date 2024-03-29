USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwAPICreateMnf]    Script Date: 09/14/2023 14:58:47 ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO
ALTER PROCEDURE [dbo].[wwwAPICreateMnf]
@AgentID int,
@CarrCode int = 41, 
@Descr varchar(50) = ''	   
                            
AS

declare  @OrgTrk varchar(5), @MNFRefNo varchar(15)

if not exists(select null from Partinf where PartCode = @AgentID)
begin
	
	RAISERROR ('Нет такого агента!',
               16, -- Severity.
               1 -- State.
               )
	return               
end

--set @AgentID = 180
select  @OrgTrk = partLoc from Partinf where PartCode = @AgentID 
set @MNFRefNo = @OrgTrk+REPLACE(CONVERT(varchar(8), GETDATE()+1, 3), '/', '')
exec al_SetMnfRefNo @S = @MNFRefNo OUTPUT
--set @CarrCode = 41
--set @Descr = 'описание'


insert MnfHdr
(
MNFRefNo, -- OrgTrk + ddmmyy (getDate() + 1 Day)
OrgTrk,-- select partLoc from Partinf where PartCode = OrgAgentID
OrgAgentID, -- @AgentID (PartCode)
DestTrk, -- MOW
DestAgentID, -- 256
BPCS,	-- 0
BWT,	-- 0
BVWt,	-- 0
Shpd,  -- getDate() + 1 Day
DTarr, -- getDate() + 1 Day
CarrCode,-- select isNull(CarrName, '') from Carriers where CarrCode = 44
is_Ready, -- -1
EarlyDlv_IS, --0
tmArrSet, -- 0
InfRems --@Descr varchar(50)
)
values
(
@MNFRefNo,
@OrgTrk,
@AgentID,
'MOW',
256,
0,
0,
0,
Convert(varchar(10),GETDATE()+1, 112),
GETDATE()+1,
@CarrCode,
2,
0,
0,
@Descr
)
select @MNFRefNo as MNFRefNo
