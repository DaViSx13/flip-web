USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwAPIgetTarif]    Script Date: 13/09/18 19:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwAPIgetTarif]
	@org varchar(50) = '',
	@dest varchar(50) = '',
	@wt float = 0.1,
	@planno int = 1
as	

declare @procName varchar(100)
set @procName = OBJECT_NAME(@@PROCID)
exec wwwLogProcUse @procName = @procName

--set nocount on

DECLARE	@B money,
		@A money,
		@T money,
		@rem varchar(1000),
		@MT_SRV smallint
declare @cRate float
declare @t_srv varchar(50)		
declare @NDS float
declare @dt datetime
set @dt = GETDATE()

declare @planno_ int
set @planno_= @planno


if ISNULL(@org, '') = '' set @org = 'MOW'
if ISNULL(@dest, '') = '' set @dest = 'MOW'
if isnull(@wt, 0) <= 0 set @wt = 0.1
if @org = @dest set @t_srv = 'ICR' else set @t_srv = 'ST'

if @MT_SRV is null
	SELECT @MT_SRV = max(MT_SRV)
	FROM  RaidPlan
	WHERE RaidPlan.firmid = 4 and /*RaidPlan.PlanNo = 1 and*/  Dest in (@ORG, @DEST)


if GETDATE() < (select opValue from tSysOption where opName = 'newTarifDate')
begin
	set @NDS = 1.18

	select top 1 @cRate = C1 from RATES
	order by DateOfRate desc
end
else
begin
	set @NDS = 1.0
	set @cRate = 1.0
end	
		
EXEC	[dbo].[sp_getTarif]
		@ORG = @org,
		@DEST = @dest,
		@T_SRV = @t_srv,
		@WT = @wt,
		@VOL_WT = 0,
		@AGENTORDER = 0,
		@PLANNO = @planno_,
		@PCS = 1,
		@FIRM_ID = 4,
		@METPAYM = N'CSH',
		@PAYR = 1,
		@T_PAK = N'LE',
		@MT_SRV = @MT_SRV,
		@date = @dt,
    @acc = null,
		@B = @B OUTPUT,
		@A = @A OUTPUT,
		@T = @T OUTPUT,
		@rem = @rem OUTPUT,
		@needRS = 0

/*
SELECT	@B as N'@B',
		@A as N'@A',
		@T as N'@T',
		@rem as N'@rem'
*/

----- срок доставки
declare @bDate datetime, @dtd datetime, @del int, @mindel int
set @bDate = getDate()
set @dtd = null

create table #dtd
(
  bDate datetime
, mindel int
, del int
, dtd datetime
)
insert #dtd
exec sp_getDTD @org = 'MOW', @dest = @dest, @bDate = @bDate, @t_srv = @t_srv, @frmId = 4, @planNo = 1, @dtd = @dtd, @mindelivery = 0

select @del = del, @mindel = mindel from #dtd
drop table #dtd

---- итог
select tarif = dbo.RoundMoney(@T * @cRate * @NDS), @del as delivery, @org as org, @dest as dest, @wt as [weight], @mindel as deliverymin
--select tarif = @cRate*@T

