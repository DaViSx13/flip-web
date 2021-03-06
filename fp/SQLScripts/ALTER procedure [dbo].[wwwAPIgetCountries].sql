USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwAPIgetCountries]    Script Date: 11/09/16 19:14:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwAPIgetCountries]
as

declare @procName varchar(100)
set @procName = OBJECT_NAME(@@PROCID)
exec wwwLogProcUse @procName = @procName

--countries
select distinct code = cn.ccode, country = cn.RusName
from N_City ct
	left join N_Country cn on ct.CCode =cn.CCode
	left join N_State st on st.SCode = ct.SCode and ct.CCode = st.CCode
	left join RaidPlan rp on ct.Code = rp.DEST and rp.firmid = 4 and PlanNo=1 --and rp.PreST=1
where rp.id is not null
and ct.active = 1
order by cn.RusName
