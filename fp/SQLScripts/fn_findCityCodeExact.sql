USE [ALERT_F]
GO
/****** Object:  UserDefinedFunction [dbo].[fn_findCityCodeExact]    Script Date: 03/05/2023 21:44:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--create procedure sp_findCityCode
CREATE function [dbo].[fn_findCityCodeExact](
	@country varchar(50)
	, @state varchar(50)
	, @city  varchar(50)
	)
returns varchar(50)	
as
begin
declare @code varchar(5)

select @code = vc.cityCode
from vCity vc
where vc.cityActive = 1
	and vc.country = @country
	and vc.state = @state
	and vc.city = @city

return @code
end	