USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwGetClients]    Script Date: 09/19/2019 11:17:00 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwGetClients]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwGetClients]
GO

USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwGetClients]    Script Date: 09/19/2019 11:17:00 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[wwwGetClients]
as

select k.C_CO +'('+p.partname+')' as displayname, u.userID as partcode/*, u.aUser*/ from Klient k
right join wwwClientUser u on k.CACC = u.CACC
left join Partinf p on p.partcode = u.agentID
where u.active = 1
and u.agentID >1
order by k.C_CO
GO
GRANT EXECUTE ON [dbo].[wwwGetClients] TO [pod]
GO

