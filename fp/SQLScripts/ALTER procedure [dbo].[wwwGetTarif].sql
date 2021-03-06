USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwGetTarif]    Script Date: 03/03/16 14:47:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER procedure [dbo].[wwwGetTarif] 
	@code varchar(5), @wt float, @frmid int = 4
as
--select @code = 'CEE', @wt = 10.5
declare @cRate float
	, @price float
	, @NDS float
	, @planNo int
	, @del int
	, @tcID int
	
set @planNo = 1
set @NDS = 0.18

if GETDATE() < (select opValue from tSysOption where opName = 'newTarifDate')
begin
	select top 1 @cRate = C1 from RATES
	order by DateOfRate desc
end
else
begin
	set @cRate = 1.0
end

declare @frmLoc varchar(50)
select @frmLoc = LOC from frm where Idx = @frmid

--if @code <> @frmLoc --'MOW'
	begin
	if GETDATE() < (select opValue from tSysOption where opName = 'newTarifDate')
	begin
		set @price = dbo.RoundMoney(@cRate*dbo.Tarif('MOW', @code, @wt, 'ST', @PlanNo, @frmid, null))

		select @del=ISNULL(delST, delEX)
		from RaidPlan
		where firmid = @frmid and PlanNo = @planNo and DEST = @code

	end
	else
	begin
		set @price = dbo.RoundMoney(@cRate*dbo.Tarif('MOW', @code, @wt, 'ST', @PlanNo, @frmid, null))
		--set @price = dbo.RoundMoney(@price /(1 + @NDS))


		--актуальная конфигурация
		select top 1 @tcID = tcID 
		from tTarifCfg
		where active = 1 and bDate <= GETDATE()
		order by bDate desc

		select 
		  @del    = tr.del
		from tTarif tr
		where tr.tcID = @tcID and planNo = @planNo and DEST = @code
	  	
	end	
	
	select code=@code, wt=@wt, del=@del, price = @price
	--, @cRate, dbo.Tarif(@code, @wt, 'ST', PlanNo, firmid) 
	--from RaidPlan 	where firmid = @frmid and PlanNo = 1 and DEST = @code
	end
/*
else
	begin
	Select code=@code, wt=@wt, del='1', price= dbo.RoundMoney( @cRate* (Rate + (CEILING(( @wt - Before_KG )/ For_Kg) ) * Add_Rate)  )
	 from incity
	 where loc = @frmLoc AND SRV='ICR'
	end
	*/
