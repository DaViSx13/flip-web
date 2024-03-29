USE [ALERT_F]
GO
/****** Object:  UserDefinedFunction [dbo].[fn_findClientCACCExact]    Script Date: 03/05/2023 21:45:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE function [dbo].[fn_findClientCACCExact](
	@loc varchar(5)
	, @company varchar(40)
	, @city varchar(40)
	)
returns varchar(10)	
as
begin
	declare @CACC varchar(10)

	select @CACC = k.CACC
	from Klient k
	where k.loc = @loc
		and k.C_CO = @company
		and k.C_CITY = @city

	return @CACC
end