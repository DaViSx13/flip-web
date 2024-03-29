USE [ALERT_F]
GO
/****** Object:  Trigger [dbo].[tr_InsertMnfBdy]    Script Date: 03/12/2023 19:08:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER TRIGGER [dbo].[tr_InsertMnfBdy] ON [dbo].[Main] 
FOR INSERT 
AS
set nocount on

declare @frmID tinyint, @frmLOC varchar(50)

if system_user = 'pod'
	select @frmID = 4, @frmLOC = 'MOW'
if (select count(*) from inserted) =1
	and (select user_in from inserted) = 'api_lg'
	select @frmID = 4, @frmLOC = 'MOW'
if (select count(*) from inserted) =1
	and (select user_in from inserted) = 'api_integration_user'
	select @frmID = 4, @frmLOC = 'MOW'
	
if @frmID is null
	select @frmID = dbo.FrmID(), @frmLOC = dbo.frmLOC()

---------------------------------------------
 declare @CACC varchar(15)
 select @CACC = SCode from inserted
 if exists (select 1 from klientinfo where CACC=@CACC)
    update klientinfo set needRecalc=1 where CACC=@CACC
 else
    insert klientinfo (CACC,NeedRecalc) values(@CACC,1)
 select @CACC = RCode from inserted
 if exists (select 1 from klientinfo where CACC=@CACC)
    update klientinfo set needRecalc=1 where CACC=@CACC
 else
    insert klientinfo (CACC,NeedRecalc) values(@CACC,1)
 select @CACC = ACC from inserted
 if exists (select 1 from klientinfo where CACC=@CACC)
    update klientinfo set needRecalc=1 where CACC=@CACC
 else
    insert klientinfo (CACC,NeedRecalc) values(@CACC,1)

---------------------------------------------
-- Занесение в MnfBdy всех накладных, где ORG=frmLOC
 if (select count(*) from inserted) =1
/* ---dvs 20120130
if(select COUNT(*) from inserted join TrackPlan c on c.DestCode=dest and firmid=@frmID ---=4
    where ( wb_no not in(select wb_no from mnfbdy where ComplPlace <> 4)) -- Еще нет в MnfBdy
    and
     (
      (org = @frmLoc
       and t_srv not like 'IC%' -- Не внутригород
       and dest not like @frmLoc+'%' and  track not like @frmLoc+'%' 
      ) -- Не Киев и область
      OR
      TRANSIT=1
     )
   ) = 1  
*/
if (select count(1) from inserted where (org like @frmLoc + '%' and dest not like @frmLoc + '%') or (transit = 1) ) = 1 --- из москвы, не в москву или область, или транзитная 
if not exists ( select * from mnfBdy where frm_in = @frmID and Wb_no = (select wb_no from inserted) and (mnfRefNo = '0' or mnfRefNo like @frmLoc + '%') ) --- нет на комплектовке или в исходящем манифесте
 -- ВСТАВЛЯЕМ  В MNFBDY
     insert MnfBdy (Wb_no, MnfRefNo, ORG, DEST, TRACK, Instructions,
                             DTD,S_CO, R_CO, ShPcs, Pcs, ShWt, Wt, ShVol_Wt, Vol_Wt,
                             ShV_Car, V_Car, ShV_cust, V_cust, is_Auto, ComplPlace, Transit, Address, frm_in)
               select  Wb_no, '0', ORG, DEST, TP.TRACK, 
                           ltrim(rtrim( isnull(descr, '') + ' ' + isnull(s_ref, '') )),  
                           DTD,S_CO, R_CO, Pcs, Pcs,  Wt,  Wt, 
                           isnull(Vol_Wt,0),isnull( Vol_Wt,0), isnull(V_Car,0), isnull(V_Car,0),isnull(V_cust,0), isnull(V_cust,0) ,
                           0, -- Признак автозанесения,
                           5, -- Место комплектовки,
                           Transit,
                           S_Adr,
                           @frmID
               from inserted i join TrackPlan TP on TP.DestCode=i.dest and TP.firmid=4 ---@frmID and TP.Stantion='MOW'   
---------------------------------------------
-- Размещение на комлектовке накладных xxx->frmLoc --dvs 20100818
declare @trTypeID int
select top 1 @trTypeID = TrTypeId from TransactLog 
	where frm_in = @frmID and TrTypeId in (2, 3, 4) and Wb_No = (select wb_no from inserted) 
	order by Date_In desc

-- dvs условия правлены 20110224
if (select count(*) from inserted) = 1 -- одна 
if (select dest from inserted) like @frmLoc+'%' --= @frmLoc -- dest=@frmLoc
if (select tdd from inserted) is null -- нет инфо о доставке
if ( @trTypeId is null or @trTypeID = 4 )-- нужных движений нет или последнее прием возвратов
if not exists ( select 1 from mnfBdy mb where mb.wb_no = (select wb_no from inserted) and mb.frm_in = @frmId ) -- нет на комплектовке
	begin
     insert MnfBdy (Wb_no, MnfRefNo, ORG, DEST, TRACK, Instructions,
                             DTD, S_CO, R_CO, ShPcs, Pcs, ShWt, Wt, ShVol_Wt, Vol_Wt,
                             ShV_Car, V_Car, ShV_cust, V_cust, is_Auto, ComplPlace, Transit, Address, frm_in)
               select  Wb_no, '0', ORG, DEST, TP.TRACK, 
                           ltrim(rtrim( isnull(descr, '') + ' ' + isnull(s_ref, '') )),
                           DTD,S_CO, R_CO, Pcs, Pcs,  Wt,  Wt, 
                           isnull(Vol_Wt,0),isnull( Vol_Wt,0), isnull(V_Car,0), isnull(V_Car,0),isnull(V_cust,0), isnull(V_cust,0) ,
                           0, -- Признак автозанесения,
                           5, -- Место комплектовки,
                           Transit,
                           S_Adr,
                           @frmID
               from inserted i join TrackPlan TP on TP.DestCode=i.dest and TP.firmid=4 ---@frmID and TP.Stantion='MOW'   
               
    insert dbo.TransactLog (TrTypeId, Wb_No, PcsNo, Wt, W, MnfRefNo, User_In)
					select   1, wb_no, Pcs, wt, vol_Wt, '0', 'AUTODB' from inserted 
	end
---------------------------------------------
 -- Check up the delivery info in the trace table  when the wb  is  inserted
  if (select count(*) from inserted) =1
  if ( select T_SRV from Inserted ) not like 'IC%' begin
    declare @wb_no varchar(50)
    select @wb_no= ( select wb_no from inserted )
    exec al_CheckTrace 1, @wb_no
  end
---------------------------------------------
