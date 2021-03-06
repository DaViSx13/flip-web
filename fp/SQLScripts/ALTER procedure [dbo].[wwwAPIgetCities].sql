USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwAPIgetCities]    Script Date: 11/09/16 19:13:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwAPIgetCities]
	@city varchar(100) = '', @country varchar(50) = '', @state varchar(100) = ''
as

declare @procName varchar(100)
set @procName = OBJECT_NAME(@@PROCID)
exec wwwLogProcUse @procName = @procName

--declare @city varchar(100)
--declare @country varchar(50)
--declare @state varchar(100)

--set @city = 'че'
--set @country = ''
--set @state = 'во'

if isnull(@country, '') = '' set @country = '%' else set @country = @country
if isnull(@state, '') = '' set @state = '%' else set @state = @state + '%'
if isnull(@city, '') = '' set @city = '%' else set @city = @city + '%'

--cities
select ct.cityCode, city=ct.city, country = ct.country, [state]=ct.state
, fullname = ct.city + ', ' + ct.country + case when ct.state is null then '' else ', ' + ct.state end
from vCity ct
where
 (ct.city + ', ' + ct.country + case when ct.state is null then '' else ', ' + ct.state end) like @city
and isnull(ct.state, '') like @state
and ct.countryCode like @country
and ct.cityActive = 1
order by ct.city
