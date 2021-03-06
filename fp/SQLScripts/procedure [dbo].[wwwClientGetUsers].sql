USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwGetUsers]    Script Date: 11/07/16 12:21:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[wwwClientGetUsers]
as
select u.userID as id
, u.aUser
, u.active
, p.PartCode as agents
, p.PartName
, p.PartLoc
, c.RusName
, DateShtdn=convert(varchar(30),p.DateShtdn, 104)  
, k.C_CO
, k.C_CITY
, k.Loc
, u.CACC
from wwwClientUser u
left join Partinf p on p.PartCode = u.agentID
left join N_City c on c.Code = p.PartLoc
left join Klient k on u.CACC = k.CACC
where u.aUser != 'webadmin'
order by u.aUser
go

grant execute on [dbo].[wwwClientGetUsers] to [pod]
go
