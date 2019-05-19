USE [ALERT_F]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[wwwGetWbInfo_17track]
    @wbno varchar(50)
as

SET NOCOUNT ON

declare @wbno1 varchar(50)
declare @org varchar(50)
declare @dest varchar(50)
declare @orgCountryCode varchar(50)
declare @destCountryCode varchar(50)
declare @status varchar(50)
declare @tdd datetime

set @wbno1 = @wbno
set @status = 'Not found'

select @org = m.ORG, @dest = m.DEST, @tdd = m.TDD
from main m
where m.Wb_No = @wbno1

if @org is null
select @org = m.ORG, @dest = m.DEST
from MnfBdy m
where m.Wb_No = @wbno1

if @org is not null
	begin
		set @status = 'In transit'
		if @tdd is not null
			set @status = 'Delivered'

		set @orgCountryCode = (select top 1 countryCode from vCity where cityCode = @org)
		set @destCountryCode = (select top 1 countryCode from vCity where cityCode = @dest)

	end
		select @wbno1 as [number], @orgCountryCode as orgCountryCode, @destCountryCode as destCountryCode, @status as [status]


go

grant execute on [wwwGetWbInfo_17track] to [public]
go