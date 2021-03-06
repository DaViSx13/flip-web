USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwAPIgetStates]    Script Date: 11/09/16 19:14:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwAPIgetStates]
	@country varchar(50) = 'RUS'
as

declare @procName varchar(100)
set @procName = OBJECT_NAME(@@PROCID)
exec wwwLogProcUse @procName = @procName

if ISNULL(@country, '') = '' set @country = 'RUS'

--states
select distinct ccode=st.CCode, [state] = st.RusName
from N_City ct
	left join N_Country cn on ct.CCode =cn.CCode
	left join N_State st on st.SCode = ct.SCode and ct.CCode = st.CCode
	left join RaidPlan rp on ct.Code = rp.DEST and rp.firmid = 4 and PlanNo=1 --and rp.PreST=1
where rp.id is not null
and st.id is not null
and ct.active = 1
and cn.CCode = @country
order by st.RusName
